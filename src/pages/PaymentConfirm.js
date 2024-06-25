import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

/**
 * Payment confirmation component displayed after a successful payment.
 * @returns
 */
function PaymentConfirm() {
  const navigate = useNavigate();

  /**
   * Handles the button click to continue shopping.
   */
  const handleContinueShopping = () => {
    navigate("/categoryProducts?category_id=All");
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Payment Successful!</h2>
      <div className="d-flex justify-content-center mb-3">
        <MdCheckCircle size="60px" color="green" />
      </div>
      <p className="text-center">Thank you for your purchase.</p>
      <p className="text-center">
        Your order is being processed and a confirmation email has been sent to
        you.
      </p>
      <div className="text-center my-4">
        <button className="btn btn-primary" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
      <div className="text-center">
        <p>
          Need help? <a href="/contactUs">Contact us</a>
        </p>{" "}
      </div>
    </div>
  );
}

export default PaymentConfirm;
