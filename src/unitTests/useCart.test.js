import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import useCart from "../hooks/useCart";

// Mocking axios instance
const mockAxios = new MockAdapter(axios);

// Mock component to test the useCart hook
const TestComponent = ({ cartID }) => {
  const { addToCart, removeFromCart, updateCartItemQuantity, cartItems } =
    useCart(cartID);

  return (
    <div>
      <button
        onClick={() =>
          addToCart({ product_id: 1, product_name: "Product 1", price: 10 })
        }
      >
        Add Item
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={() => updateCartItemQuantity(1, 2)}>Update Item</button>
      {cartItems.map((item) => (
        <div key={item.product_id} data-testid={`cart-item-${item.product_id}`}>
          {item.product_id} - Quantity: {item.quantity}
        </div>
      ))}
    </div>
  );
};

describe("useCart", () => {
  let cartID = 1;

  beforeEach(() => {
    mockAxios.reset(); // Resetting mock adapter before each test

    // Mock the initial cart details endpoint
    mockAxios.onGet(`http://localhost:4000/api/cart/${cartID}`).reply(200, []);

    // Mock the add to cart endpoint
    mockAxios.onPost("http://localhost:4000/api/cart/add").reply(200, {
      success: true,
      cartItem: { cart_item_id: 1, cart_id: 1, product_id: 1, quantity: 1 },
    });

    // Mock the remove from cart endpoint
    mockAxios
      .onPost("http://localhost:4000/api/cart/remove")
      .reply(200, { message: "Item removed from cart" });

    // Mock the update cart item endpoint to return quantity of 2
    mockAxios.onPost("http://localhost:4000/api/cart/update").reply(200, {
      success: true,
      cartItem: { cart_item_id: 1, quantity: 2, cart_id: 1, product_id: 1 },
    });
  });

  afterEach(() => {
    mockAxios.reset(); // Reset mock adapter after each test
  });

  test("adds an item to the cart", async () => {
    render(<TestComponent cartID={cartID} />); // Render the mock component with cartID

    // Simulate a click event to add an item to the cart
    fireEvent.click(screen.getByText("Add Item"));

    // Verify the item is added to the cart
    await waitFor(() => {
      expect(screen.getByTestId("cart-item-1")).toBeInTheDocument(); // Check if the item is present in the DOM
    });
    await waitFor(() => {
      expect(screen.getByTestId("cart-item-1")).toHaveTextContent(
        "1 - Quantity: 1"
      ); // Check if the item quantity is correct
    });
  });

  test("removes a specific item from the cart", async () => {
    render(<TestComponent cartID={cartID} />); // Render the mock component with cartID

    // Simulate a click event to add an item to the cart
    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(screen.getByTestId("cart-item-1")).toBeInTheDocument(); // Check if the item is present in the DOM
    });

    // Simulate a click event to remove the item from the cart
    fireEvent.click(screen.getByText("Remove Item"));

    // Verify the item is removed from the cart
    await waitFor(() => {
      expect(screen.queryByTestId("cart-item-1")).toBeNull(); // Check if the item is removed from the DOM
    });
  });

  test("updates the quantity of the item in the cart", async () => {
    render(<TestComponent cartID={cartID} />); // Render the mock component with cartID

    // Simulate a click event to add an item to the cart
    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(screen.getByTestId("cart-item-1")).toBeInTheDocument(); // Check if the item is present in the DOM
    });

    // Simulate a click event to update the item quantity in the cart to 2
    fireEvent.click(screen.getByText("Update Item"));

    // Verify the item quantity is updated in the cart to 2
    await waitFor(() => {
      expect(screen.getByTestId("cart-item-1")).toHaveTextContent(
        "1 - Quantity: 2"
      ); // Check if the item quantity is correct
    });
  });
});
