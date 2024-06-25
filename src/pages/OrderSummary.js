import React, { useContext, useState, useEffect } from "react";
import CreditCardForm from "../fragments/CreditCardForm";
import CartItem from "../fragments/CartItem";
import UserContext from "../contexts/UserContext";
import { getProfile } from "../data/repository";

/**
 * OrderSummary component that displays the order summary, user profile, and allows payment.
 *
 * @returns
 */
function OrderSummary() {
  const { username, removeFromCart, displayCartItem } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    /**
     * Loads the user profile data.
     */
    async function loadProfile() {
      const currentProfile = await getProfile();
      setProfile(currentProfile);
    }
    loadProfile();
  }, []);

  useEffect(() => {
    /**
     * Fetches the cart items and calculates the total.
     */
    const fetchCartItems = async () => {
      const { itemList, total } = await displayCartItem();

      setItemList(itemList);
      setTotal(total);
    };

    fetchCartItems();
  }, [displayCartItem]);

  return (
    <div className="d-flex justify-content-center">
      <div className="col-6">
        <h2 className="text-center my-4">Order Summary</h2>
        <div className="card mb-3">
          <div className="card-body">
            {profile && (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="fw-bold form-label">
                    Email
                  </label>
                  <p className="card-text"> {profile.email}</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="fw-bold form-label">
                    Name
                  </label>
                  <p className="card-text">
                    {profile.firstname + " " + profile.lastname}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            {itemList.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                isOrderSummary={true}
                onRemove={(itemId) => removeFromCart(itemId)}
              />
            ))}
          </div>
          <div className="mb-3 mt-5">
            <div className="row">
              <div className="col-6 text-center fw-bold">Total</div>
              <div className="col-6 text-center">
                <span>AUD {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <CreditCardForm />
      </div>
    </div>
  );
}

export default OrderSummary;
