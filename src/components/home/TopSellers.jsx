import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonCarousel, { SkeletonList } from "../UI/SkeletonCarousel";

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
              <h2>Top Sellers</h2>
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
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>
                        {item.authorName}
                      </Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
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
