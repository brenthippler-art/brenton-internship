import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SkeletonCarousel from "../UI/SkeletonCarousel";
import CountdownTimer from "../UI/CountdownTimer";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const CAROUSEL_RESPONSIVE = {
  0: { items: 1 },
  480: { items: 2 },
  768: { items: 3 },
  1000: { items: 4 },
};

const NewItems = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(NEW_ITEMS_URL)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {data.length === 0 ? (
              <SkeletonCarousel
                count={4}
                tileConfig={{
                  wrapperClass: "nft__item",
                  imageAspectRatio: "1 / 1",
                  hasAvatar: true,
                  avatarSize: "50px",
                  hasCheckIcon: true,
                  avatarPosition: "before",
                  lines: [
                    { width: "70%", height: "16px" },
                    { width: "50%", height: "14px" },
                    { width: "30%", height: "14px" },
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
                navText={[
                  '<i class="fa fa-angle-left"></i>',
                  '<i class="fa fa-angle-right">',
                ]}
                dots={false}
                items={4}
                slideBy={1}
                responsive={CAROUSEL_RESPONSIVE}
              >
                {data.map((item) => (
                  <div className="nft__item" key={item.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.title}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <CountdownTimer expiryDate={item.expiryDate} />

                    <div className="nft__item_wrap">                      
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;
