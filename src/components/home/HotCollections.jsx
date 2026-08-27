import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SkeletonCarousel from "../UI/SkeletonCarousel";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const CAROUSEL_RESPONSIVE = {
  0: { items: 1 },
  480: { items: 2 },
  768: { items: 3 },
  1000: { items: 4 },
};

const HotCollections = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(HOT_COLLECTIONS_URL)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {data.length === 0 ? (
              <SkeletonCarousel
                count={4}
                tileConfig={{
                  wrapperClass: "nft_coll",
                  imageAspectRatio: "314.5 / 177.16",
                  hasAvatar: true,
                  avatarSize: "60px",
                  hasCheckIcon: true,
                  avatarPosition: "after",
                  lines: [
                    { width: "70%", height: "16px" },
                    { width: "40%", height: "14px" },
                  ],
                }}
              />
            ) : (
              <OwlCarousel
                key={data.length}
                className="owl-theme"
                loop
                margin={10}
                nav
                dots={false}
                items={4}
                slideBy={1}
                responsive={CAROUSEL_RESPONSIVE}
              >
                {data.map((item) => (
                  <div className="nft_coll" key={item.id}>
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
