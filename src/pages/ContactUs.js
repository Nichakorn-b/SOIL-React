import React from "react";

/**
 * ContactUs component that provides contact information and ways to get in touch.
 *
 * @returns
 */
function contactUs() {
  return (
    <div className="container text-center">
      <h3 className="display-6 mb-4 mt-3">We're here to help!</h3>
      <div className="fs-5 fw-light">
        Let us know how we can assist you with your organic food questions,
        concerns, or feedback. We aim to respond to all inquiries within 24-48
        hours.
      </div>
      <h3 className="mb-4 display-6 mt-4">Ways to Get in Touch</h3>
      <div className="row text-start">
        <div className="col-lg-6 fs-5 fw-light">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Email:</strong>{" "}
              <a href="mailto:soilsupport@soil.com">soilsupport@soil.com</a>
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong> (04) 1234 5678
              <small> (Available Monday-Friday, 9 am - 5 pm AEST)</small>
            </li>
            <li className="list-group-item">
              <strong>In-Person:</strong> Visit our Melbourne store.
              <address>123 Swanston St, Melbourne, VIC 3000</address>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default contactUs;
