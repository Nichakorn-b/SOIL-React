import React from "react";
import { getEndpoint } from "../data/repository";

/**
 * CartItem component that displays a single item in the shopping cart.
 * It supports incrementing/decrementing quantity and removing the item from the cart.
 *
 * @param {Object} item - The cart item.
 * @param {function} props.onRemove - Function to remove the item from the cart.
 * @param {boolean} props.isOrderSummary - Flag indicating if the item is in the order summary view.
 * @param {function} props.onIncrement - Function to increment the item quantity.
 * @param {function} props.onDecrement - Function to decrement the item quantity.
 * @returns
 */
function CartItem({
  item,
  onRemove,
  isOrderSummary,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="row">
      <div className="col-2">
        <div className="mb-3">
          <img
            src={getEndpoint() + item.imageUrl}
            className="card-img-top mx-auto mt-3"
            alt={item.name}
            style={{ maxWidth: "200px" }}
          />
        </div>
      </div>
      <div className="col-6">
        <div className="">
          <p>{item.name}</p>
        </div>
      </div>
      <div className="col-4">
        <div className="">
          <p>
            <span className="fw-bold">Price:</span> AUD{" "}
            {item.totalPrice.toFixed(2)}
          </p>
          {isOrderSummary && (
            <p>
              <span className="fw-bold">Quantity:</span> {item.quantity}
            </p>
          )}
          {!isOrderSummary && (
            <div>
              <div className="d-flex align-items-center">
                <button
                  onClick={() => onDecrement(item)}
                  className="btn btn-outline-secondary"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="form-control text-center mx-2"
                  style={{ width: "60px" }}
                />
                <button
                  onClick={() => onIncrement(item)}
                  className="btn btn-outline-secondary"
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger mt-3 mb-3"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
