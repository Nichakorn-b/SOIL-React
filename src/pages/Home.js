import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shop from "../asset/homeImage/shop.avif";
import ACO from "../asset/homeImage/ACO.gif";
import organic from "../asset/homeImage/organic.png";
import composting from "../asset/homeImage/composting.png";
import seasonal from "../asset/homeImage/seasonal.png";
import accessible from "../asset/homeImage/money-saving.png";
import australia from "../asset/homeImage/australia.png";
import grocer from "../asset/homeImage/grocer.avif";
import {
  FaLeaf,
  FaSeedling,
  FaHandHoldingWater,
  FaAppleAlt,
} from "react-icons/fa";
import { getAllProducts, getEndpoint } from "../data/repository";

//get random
//https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
//img carousel
//https://getbootstrap.com/docs/5.0/components/carousel/

/**
 * Home component that displays the homepage of the website, including welcome message,
 * featured products, information about the company, and upcoming seminars. (mock)
 * @returns
 */
function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    /**
     * Fetches all products and sets a random selection of three products.
     */
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        const randomProduct = products
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setData(randomProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="text-center">
      <h1 className="display-3">Welcome to SOIL</h1>
      <h3 className="display-6 mb-4 mt-3">
        Nuturing Healthy Communities - Premium Organics Since 2000
      </h3>
      <img
        src={shop}
        style={{ maxWidth: "30%" }}
        className="img-fluid mb-3" //source: https://unsplash.com/photos/woman-in-white-coat-holding-green-shopping-cart-Gk8LG7dsHWA
        alt=""
      />
      <img
        src={grocer}
        style={{ maxWidth: "40%" }}
        className="img-fluid mb-3" //source: https://unsplash.com/photos/woman-in-white-coat-holding-green-shopping-cart-Gk8LG7dsHWA
        alt=""
      />
      {/*About us*/}
      <h3 className="display-6 mt-5 mb-3">About us</h3>
      <div className="fw-light fs-5 pb-3">
        SOIL has been a cornerstone of Melbourne's organic food scene since
        2000. What started as a passion project has grown into a commitment to
        providing our community with the highest quality organic produce. We
        believe in the power of food to nourish bodies and minds, which is why
        we offer educational seminars on healthy eating and sustainable farming
        practices.
      </div>

      {/*features*/}
      <div style={{ backgroundColor: "#F1FFF0" }}>
        <div className="d-flex flex-row align-items-top mb-5 mt-5 pt-4 pb-4">
          <div className="col-md-4 px-3">
            <div className="d-flex flex-column align-items-center h-100">
              <div className="fw-bold mb-4">Authentically Organic</div>
              <img
                src={ACO}
                style={{ maxHeight: "100%", maxWidth: "55%" }}
                className="img-fluid mb-3" //source: https://th.bing.com/th/id/R.a4a2c4bea00116104d9ffad3651c66ab?rik=c35Piqx9a6es1Q&riu=http%3a%2f%2faco.net.au%2fImages%2fACO-logo-CMYK-OL.gif&ehk=2OZNJ7xqBbbPVHjE8xG33lIEhgZT2SFs02UgFT8Ibr8%3d&risl=&pid=ImgRaw&r=0
                alt=""
              />
              <p>ACO Certified for Your Peace of Mind.</p>
            </div>
          </div>

          <div className="col md-4 px-3">
            <div className="d-flex flex-column align-items-center h-100">
              <div className="fw-bold mb-4">
                Premium Organics Delivered Australia-Wide
              </div>
              <img
                src={australia}
                style={{ maxHeight: "100%", maxWidth: "30%" }}
                className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/australia Australia stickers created by Stickers - Flaticon
                alt=""
              />
              <p>Our Trusted Source for Organics, No Matter Where You Live</p>
            </div>
          </div>

          <div className="col md-4 px-3">
            <div className="d-flex flex-column align-items-center h-100">
              <div className="fw-bold mb-4">Organic Made Accessible</div>
              <img
                src={accessible}
                style={{ maxHeight: "100%", maxWidth: "30%" }}
                className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/rich" Rich stickers created by Stickers - Flaticon</a>
                alt=""
              />
              <p>Premium Quality at Affordable Prices.</p>
            </div>
          </div>
        </div>
      </div>

      {/*Why choose organic?*/}
      <div className="container my-5">
        <h3 className="display-5 text-center my-4">Why choose organic?</h3>
        <div className="px-lg-5 fs-5 fw-light text-start">
          <ul className="list-unstyled">
            <li className="mb-3">
              <FaSeedling className="text-success me-2" />{" "}
              <span>
                <strong>Healthier for You:</strong> Organic foods are free from
                potentially harmful pesticides, herbicides, and synthetic
                fertilizers.
              </span>
            </li>
            <li className="mb-3">
              <FaLeaf className="text-success me-2" />
              <span>
                <strong>Better for the Environment:</strong> Organic farming
                practices promote soil health and reduce pollution compared to
                conventional methods.
              </span>
            </li>
            <li className="mb-3">
              <FaHandHoldingWater className="text-success me-2" />
              <span>
                <strong>Sustainable Farming:</strong> Choosing organic
                contributes to a more sustainable food system that benefits both
                the environment and farmers.
              </span>
            </li>
            <li className="mb-3">
              <FaAppleAlt className="text-success me-2" />
              <span>
                <strong>Tastier Foods:</strong> Many people believe organic
                produce has a richer, more authentic flavor.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/*featured products*/}
      <div className="container col-4 my-5">
        <h3 className="display-6 my-4">Featured Products</h3>

        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" data-bs-interval="10000">
            {data &&
              data.map((product, index) => (
                <div key={product.product_id} className="carousel-item active">
                  <Link to={`/product/${product.product_id}`}>
                    <div className="image-wrapper">
                      <img
                        src={`${getEndpoint()}${product.image_url}`}
                        className="d-block w-100 img-fluid"
                        alt={product.product_name}
                      />
                    </div>
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{product.product_name}</h5>
                      {/* <p>{product.description}</p> */}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/*Upcoming seminars*/}
      <div className="mx-3 mb-5 mt-5">
        <div>
          <h3 className="display-6">Upcoming seminars</h3>
          <h5 className="mt-4 mb-4 fw-light">
            Join our community of health-conscious foodies and changemakers.
          </h5>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4  d-flex ">
              <div className="card">
                <div className="card-body h-100">
                  <img
                    src={organic}
                    style={{ maxHeight: "100%", maxWidth: "40%" }}
                    className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/organic" organic stickers">Organic stickers created by Stickers - Flaticon
                    alt=""
                  />
                  <h5 className="card-title">
                    Beyond the Label: Understanding Organic Certifications
                  </h5>
                  <p className="card-text">
                    Demystify organic labeling standards and what they truly
                    mean for consumers.
                  </p>
                  <p className="card-text">Date: May 1st, 2024</p>
                  <a href="" className="btn btn-info text-light">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4  d-flex">
              <div className="card">
                <div className="card-body h-100">
                  <img
                    src={composting}
                    style={{ maxHeight: "100%", maxWidth: "40%" }}
                    className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/composting Composting stickers created by Stickers - Flaticon
                    alt=""
                  />
                  <h5 className="card-title">
                    Composting for Beginners: Turning Waste into Garden Gold
                  </h5>
                  <p className="card-text">
                    A hands-on workshop on building and maintaining an effective
                    compost system.
                  </p>
                  <p className="card-text">Date: May 25st, 2024</p>
                  <a href="" className="btn btn-info text-light">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4  d-flex">
              <div className="card">
                <div className="card-body h-100">
                  <img
                    src={seasonal}
                    style={{ maxHeight: "100%", maxWidth: "40%" }}
                    className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/food-and-restaurant" Food and restaurant stickers created by Stickers - Flaticon
                    alt=""
                  />
                  <h5 className="card-title ">
                    The Power of Seasonal Eating for Optimal Health
                  </h5>
                  <p className="card-text">
                    Learn how to align your diet with the freshest produce for
                    maximum nutrients and flavor.
                  </p>

                  <p className="card-text">Date: June 2st, 2024</p>
                  <a href="" className="btn btn-info text-light">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
