import React, { useState, useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import axios from "axios";
import SkeletonCarousel, {
  SkeletonGrid,
} from "../components/UI/SkeletonCarousel";
import NftItemTile from "../components/UI/NFTItemTile";

const EXPLORE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const Explore = () => {
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const url = sortOption
      ? `${EXPLORE_URL}?filter=${sortOption}`
      : EXPLORE_URL;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setVisibleCount(8);
      })
      .catch((error) => console.error(error));
  }, [sortOption]);

  const visibleData = data.slice(0, visibleCount);

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
        <section id="section-explore" className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
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

              <div className="row">
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
                  visibleData.map((item) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={item.id}
                    >
                      <NftItemTile item={item} />
                    </div>
                  ))
                )}
              </div>

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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
