import React from "react";
import farmView from "../asset/framView.jpg";
import ACO from "../asset/homeImage/ACO.gif";
import australia from "../asset/homeImage/australia.png";
import training from "../asset/homeImage/training.png";
import farming from "../asset/homeImage/farmer.png";
import visitus from "../asset/homeImage/visitus.jpg";

/**
 * AboutUs component that provides information about the company's story, mission, and values.
 * @returns
 */
function AboutUs() {
  return (
    <div className="container text-center">
      <h3 className="display-6 mb-4 mt-3">Our Story</h3>
      <img
        src={farmView}
        alt=""
        style={{ maxWidth: "90%" }}
        className="img-fluid mb-3" //source: https://unsplash.com/photos/grass-field-IQVFVH0ajag
      />
      <div className="fs-5 fw-light">
        SOIL began in 2000 as a small stall at a Melbourne farmer's market, a
        passion project driven by a deep belief in the power of wholesome,
        organic food. Over the years, we've grown steadily alongside our loyal
        community, expanding to become a trusted source for the finest organic
        produce. Today, SOIL is more than just a store – we're a hub for those
        who believe that food should be healthy, sustainably sourced, and
        accessible to everyone.
      </div>
      <section id="our-mission">
        <div className="container py-5">
          <h2 className="mb-4">Our Mission</h2>
          <p className="lead">
            At SOIL, we're committed to making a positive impact on the world,
            one delicious organic meal at a time. We achieve this by:
          </p>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "#F1FFF0" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Sourcing the Freshest Produce</h5>
                  <img
                    src={ACO}
                    style={{ maxHeight: "100%", maxWidth: "80%" }}
                    alt=""
                    className="img-fluid mb-3" //source: https://th.bing.com/th/id/R.a4a2c4bea00116104d9ffad3651c66ab?rik=c35Piqx9a6es1Q&riu=http%3a%2f%2faco.net.au%2fImages%2fACO-logo-CMYK-OL.gif&ehk=2OZNJ7xqBbbPVHjE8xG33lIEhgZT2SFs02UgFT8Ibr8%3d&risl=&pid=ImgRaw&r=0
                  />
                  <p className="card-text">
                    Each item on our shelves is ACO certified, ensuring complete
                    transparency for our customers.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "#F1FFF0" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Sustainable Farming</h5>
                  <img
                    src={farming}
                    style={{ maxHeight: "100%", maxWidth: "55%" }}
                    alt=""
                    className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/teacher" Teacher stickers created by inipagistudio - Flaticon
                  />
                  <p className="card-text">
                    We believe that supporting organic farming methods is
                    crucial for the health of both people and the planet.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "#F1FFF0" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Sharing Knowledge</h5>
                  <img
                    src={training}
                    alt=""
                    style={{ maxHeight: "100%", maxWidth: "55%" }}
                    className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/teacher" Teacher stickers created by inipagistudio - Flaticon
                  />
                  <p className="card-text">
                    We host regular educational seminars where people can learn
                    about healthy eating, organic cooking techniques, and the
                    importance of sustainable farming.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "#F1FFF0" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Making Organics Accessible</h5>
                  <img
                    src={australia}
                    alt=""
                    style={{ maxHeight: "100%", maxWidth: "50%" }}
                    className="img-fluid mb-3" //source: https://www.flaticon.com/free-stickers/australia Australia stickers created by Stickers - Flaticon
                  />
                  <p className="card-text">
                    We deliver Australia-wide with the goal of making wholesome,
                    premium organic food accessible to everyone, regardless of
                    location.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <h3 className="mb-3">Come Visit Us!</h3>
            <img
              src={visitus}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "80%" }}
              className="img-fluid mb-3" //source: https://unsplash.com/photos/side-view-of-hispanic-male-owner-arranging-food-on-shelf-in-supermarket-Ukxw2dHUb9o
            />
            <p className="fs-5 fw-light">
              Whether you're a seasoned organic enthusiast or just starting to
              explore the world of healthy eating, we invite you to stop by our
              store in Melbourne. Our friendly team is passionate about sharing
              their knowledge and guiding you on your organic food journey.
            </p>
            <p className="fs-5 fw-bold">
              Let SOIL nourish your body, mind, and community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

{
  /*The content of this page (not the code) is adapted from Google Gemini (2024). Gemini (4 March 2024), accessed 19 April 2024 https://g.co/gemini/share/25ef29d50c1f*/
}
