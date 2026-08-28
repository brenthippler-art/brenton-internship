import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";

const DETAILS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const ItemDetailsSkeleton = () => (
  <div className="row">
    <div className="col-md-6 text-center">
      <Skeleton width="100%" height="500px" borderRadius="10px" />
    </div>
    <div className="col-md-6">
      <div className="item_info">
        <h2>
          <Skeleton width="70%" height="32px" borderRadius="4px" />
        </h2>

        <div className="item_info_counts">
          <div className="item_info_views">
            <Skeleton width="60px" height="16px" borderRadius="4px" />
          </div>
          <div className="item_info_like">
            <Skeleton width="60px" height="16px" borderRadius="4px" />
          </div>
        </div>

        <Skeleton width="100%" height="16px" borderRadius="4px" />
        <div className="spacer-10"></div>
        <Skeleton width="100%" height="16px" borderRadius="4px" />
        <div className="spacer-10"></div>
        <Skeleton width="60%" height="16px" borderRadius="4px" />

        <div className="spacer-40"></div>

        <div className="d-flex flex-row">
          <div className="mr40">
            <h6>Owner</h6>
            <div className="item_author">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="100%" />
              </div>
              <div className="author_list_info">
                <Skeleton width="100px" height="16px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>

        <div className="de_tab tab_simple">
          <div className="de_tab_content">
            <h6>Creator</h6>
            <div className="item_author">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="100%" />
              </div>
              <div className="author_list_info">
                <Skeleton width="100px" height="16px" borderRadius="4px" />
              </div>
            </div>
          </div>
          <div className="spacer-40"></div>
          <h6>Price</h6>
          <Skeleton width="80px" height="20px" borderRadius="4px" />
        </div>
      </div>
    </div>
  </div>
);

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setItem(null);

    axios
      .get(`${DETAILS_URL}?nftId=${nftId}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error(error));
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {item === null ? (
              <ItemDetailsSkeleton />
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {item.title} #{item.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;