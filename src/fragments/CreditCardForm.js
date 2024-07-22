import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from "../fragments/Alert";
import useAlert from "../hooks/useAlert";
import UserContext from "../contexts/UserContext";
/**
 * CreditCardForm component handles the credit card information input and validation.
 * Uses Luhn Algorithm to validate the credit card number.
 *
 * @param {function} cartSubmit - Function to handle the cart submission.
 * @returns
 */
function CreditCardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { cartSubmit } = useContext(UserContext);
  const navigate = useNavigate();
  const { showAlert, showAlertMessage, showAlertClassName, triggerAlert } =
    useAlert();

  /**
   * Submits the form data after validating the credit card number using Luhn Algorithm.
   * card number example 4263982640269299
   * @param {Object} data - The form data.
   */
  const onSubmit = async (data) => {
    const isValidCardNumber = validateLuhnAlgorithm(data.cardNumber);
    if (!isValidCardNumber) {
      setError("cardNumber", {
        message: "Invalid credit card number",
      });
      return;
    }

    var response = await cartSubmit();
    if (!response.success) {
      triggerAlert(response.message, response.success);
    } else navigate("/PaymentConfirm");
  };

  /**
   * Validates the credit card number using the Luhn Algorithm.
   * ref: https://javascript.plainenglish.io/how-to-build-a-credit-card-user-interface-with-validation-in-javascript-4f190b6208ad
   * @param {string} cardNumber - The credit card number.
   * @returns {boolean} - Returns true if the card number is valid, otherwise false.
   */
  function validateLuhnAlgorithm(cardNumber) {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }

  /**
   * Validates the expiration date.
   *
   * @param {string} expireDate - The expiration date in MM/YY format.
   * @returns {boolean} - Returns true if the expiration date is valid and in the future, otherwise false.
   */
  const isExpireDateValid = (expireDate) => {
    const [month, year] = expireDate.split("/");
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // January is 0

    // Check if month and year are valid numbers
    if (!/^\d{2}$/.test(month) || !/^\d{2}$/.test(year)) {
      return false;
    }

    // Convert month and year to numbers
    const monthNumber = Number(month);
    const yearNumber = Number(year);

    // Check if month is between 1 and 12 and year is not in the past
    if (monthNumber < 1 || monthNumber > 12 || yearNumber < currentYear) {
      return false;
    }

    // If the year is the current year, check if the month is in the future
    if (yearNumber === currentYear && monthNumber < currentMonth) {
      return false;
    }

    return true;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title my-3">Payment Information</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label my-2">
              Credit Card Number:
            </label>
            <input
              type="text"
              maxLength={16}
              minLength={16}
              className="form-control"
              id="cardNumber"
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Please enter a valid 16-digit card number",
                },
              })}
              placeholder="Enter your credit card number"
            />
            {errors.cardNumber && (
              <span className="text-danger">{errors.cardNumber.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="expireDate" className="form-label my-2">
              Expire Date (MM/YY):
            </label>
            <input
              type="text"
              className="form-control"
              maxLength={5}
              minLength={5}
              name="expireDate"
              id="expireDate"
              {...register("expireDate", {
                required: "Expire date is required",
                pattern: {
                  value: /^\d{2}\/\d{2}$/,
                  message: "Please enter a valid expire date (MM/YY)",
                },
                validate: (value) =>
                  isExpireDateValid(value) ||
                  "Expire date must be in the future",
              })}
              placeholder="Enter expire date (MM/YY)"
            />
            {errors.expireDate && (
              <span className="text-danger">{errors.expireDate.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label my-2">
              CVV:
            </label>
            <input
              type="text"
              maxLength={3}
              minLength={3}
              className="form-control"
              id="cvv"
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "Please enter a valid CVV (3 digits)",
                },
              })}
              placeholder="Enter CVV"
            />
            {errors.cvv && (
              <span className="text-danger">{errors.cvv.message}</span>
            )}
          </div>
          <div className="row">
            <div className="mb-3 text-center col-12">
              <button type="submit" className="btn btn-primary w-100 my-3">
                Submit Payment
              </button>
              <a href="/cart" className="btn btn-secondary w-100">
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>

      <Alert
        show={showAlert}
        message={showAlertMessage}
        className={showAlertClassName}
      />
    </div>
  );
}

export default CreditCardForm;
