import { render, screen, fireEvent, act } from "@testing-library/react";
import ReviewForm from "../fragments/ReviewForm";
import ReviewEditForm from "../fragments/ReviewEditForm";
import { createReview, updateReview } from "../data/repository";
import UserContext from "../contexts/UserContext";

// Mock the createReview function from the repository
jest.mock("../data/repository");

const mockFetchReviews = jest.fn();
const mockHandleReviewSuccess = jest.fn();
const mockHandleEditReviewSuccess = jest.fn();
const mockUsername = { id: 1, name: "testuser" };

beforeEach(() => {
  createReview.mockResolvedValue({
    review_id: 1,
    title: "Great Product",
    description: "This is a wonderful product. Highly recommend!",
    stars: 5,
    product_id: 1,
    user_id: 1,
  });

  updateReview.mockResolvedValue({
    title: "Updated Product",
    description: "This product has been updated. Highly recommend!",
    stars: 4,
    product_id: 1,
    user_id: 1,
  });
});

test("Logged-in user can submit a review", async () => {
  render(
    <UserContext.Provider value={{ username: mockUsername }}>
      <ReviewForm
        productId={1}
        fetchReviews={mockFetchReviews}
        handleReviewSuccess={mockHandleReviewSuccess}
      />
    </UserContext.Provider>
  );

  // Simulate entering a title
  await act(async () => {
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Great Product" },
    });
  });

  // Simulate selecting a star rating
  await act(async () => {
    const starElements = document.querySelectorAll(".star-container svg");
    fireEvent.click(starElements[4]); // Select the 5th star (index 4) for a 5-star rating
  });

  // Simulate entering a review description in ReactQuill
  await act(async () => {
    const quillEditor = document.querySelector(".ql-editor");
    quillEditor.innerHTML = "This is a wonderful product. Highly recommend!";
    fireEvent.input(quillEditor, {
      target: { innerHTML: "This is a wonderful product. Highly recommend!" },
    });
  });

  // Check the values before submitting the form
  const titleInput = screen.getByLabelText("Title").value;
  console.log("Title:", titleInput);

  const quillEditor = document.querySelector(".ql-editor");
  const description = quillEditor.innerHTML;
  console.log("Description:", description);

  const rating = 5; // This should be captured from the star rating change
  console.log("Rating:", rating);

  // Simulate submitting the review form
  await act(async () => {
    fireEvent.click(screen.getByDisplayValue("Post"));
  });

  // Ensure the createReview function was called with the correct data
  expect(createReview).toHaveBeenCalledWith({
    title: "Great Product",
    description: "<p>This is a wonderful product. Highly recommend!</p>",
    stars: 5,
    product_id: 1,
    user_id: 1,
  });

  // Ensure the mock functions were called to fetch reviews and handle success
  expect(mockFetchReviews).toHaveBeenCalled();
  expect(mockHandleReviewSuccess).toHaveBeenCalled();
});

test("Logged-in user can edit a review", async () => {
  const mockReview = {
    review_id: 1,
    title: "Great Product",
    description: "This is a wonderful product. Highly recommend!",
    stars: 5,
    product_id: 1,
    user_id: 1,
    create_datetime: new Date().toISOString(),
  };

  render(
    <UserContext.Provider value={{ username: mockUsername }}>
      <ReviewEditForm
        review={mockReview}
        fetchReviews={mockFetchReviews}
        handleEditReviewSuccess={mockHandleEditReviewSuccess}
        handleCancelEdit={jest.fn()}
        setEditReviewId={jest.fn()}
      />
    </UserContext.Provider>
  );

  // Simulate editing the title
  await act(async () => {
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Product" },
    });
  });

  // Simulate selecting a different star rating
  await act(async () => {
    const starElements = document.querySelectorAll(".star-container svg");
    fireEvent.click(starElements[3]);
  });

  // Simulate entering a new review description in ReactQuill
  await act(async () => {
    const quillEditor = document.querySelector(".ql-editor");
    quillEditor.innerHTML = "This product has been updated. Highly recommend!";
    fireEvent.input(quillEditor, {
      target: { innerHTML: "This product has been updated. Highly recommend!" },
    });
  });

  // Simulate submitting the edit form
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /update review/i }));
  });

  // Ensure the updateReview function was called with the correct data
  expect(updateReview).toHaveBeenCalledWith(mockReview.review_id, {
    title: "Updated Product",
    description: "<p>This product has been updated. Highly recommend!</p>",
    stars: 4,
    user_id: 1,
  });

  // Ensure the mock functions were called to fetch reviews and handle success
  expect(mockFetchReviews).toHaveBeenCalled();
  expect(mockHandleEditReviewSuccess).toHaveBeenCalled();
});
