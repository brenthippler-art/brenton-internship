import React, { useState, useEffect } from "react";
import axios from "axios";
import SkeletonCarousel, { SkeletonList } from "../UI/SkeletonCarousel";
import TopSellerTile from "../UI/TopSellerTile";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(TOP_SELLERS_URL)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(data);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {data.length === 0 ? (
              <SkeletonList
                count={12}
                tileConfig={{
                  hasImage: false,
                  hasAvatar: true,
                  avatarSize: "50px",
                  hasCheckIcon: true,
                  lines: [
                    { width: "60%", height: "16px" },
                    { width: "30%", height: "14px" },
                  ],
                }}
              />
            ) : (
              <ol className="author_list">
                {data.map((item) => (
                  <TopSellerTile item={item} key={item.id} />
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
