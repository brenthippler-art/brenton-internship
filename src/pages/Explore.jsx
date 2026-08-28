import React, { useState, useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../components/UI/CountdownTimer";
import SkeletonCarousel, {
  SkeletonGrid,
} from "../components/UI/SkeletonCarousel";

const EXPLORE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    axios
      .get(EXPLORE_URL)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const getSortedData = () => {
    const sorted = [...data];

    switch (sortOption) {
      case "price_low_to_high":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return sorted.sort((a, b) => b.price - a.price);
      case "likes_high_to_low":
        return sorted.sort((a, b) => b.likes - a.likes);
      default:
        return sorted.sort((a, b) => a.id - b.id);
    }
  };

  const sortedData = getSortedData();
  const visibleData = sortedData.slice(0, visibleCount);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div>
              <select
                id="filter-items"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price_low_to_high">Price, Low to High</option>
                <option value="price_high_to_low">Price, High to Low</option>
                <option value="likes_high_to_low">Most liked</option>
              </select>
            </div>

            {data.length === 0 ? (
              <SkeletonGrid
                count={8}
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
              <div className="row">
                {visibleData.map((item) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={item.id}
                  >
                    <div className="nft__item">
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
                  </div>
                ))}
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 text-center">
                {visibleCount < data.length && (
                  <button
                    className="more-btn"
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
