import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import { SkeletonGrid } from "../components/UI/SkeletonCarousel";

const AUTHOR_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const AuthorProfileSkeleton = () => (
  <div className="d_profile de-flex">
    <div className="de-flex-col">
      <div className="profile_avatar">
        <Skeleton width="150px" height="150px" borderRadius="100%" />
        <div className="profile_name">
          <h4>
            <Skeleton width="180px" height="24px" borderRadius="4px" />
            <span className="profile_username">
              <Skeleton width="100px" height="16px" borderRadius="4px" />
            </span>
            <span className="profile_wallet">
              <Skeleton width="220px" height="14px" borderRadius="4px" />
            </span>
          </h4>
        </div>
      </div>
    </div>
    <div className="profile_follow de-flex">
      <div className="de-flex-col">
        <Skeleton width="100px" height="16px" borderRadius="4px" />
      </div>
    </div>
  </div>
);
const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setAuthor(null); // reset when navigating between authors
    axios
      .get(`${AUTHOR_URL}?author=${authorId}`)
      .then((response) => setAuthor(response.data))
      .catch((error) => console.error(error));
  }, [authorId]);

  const displayedFollowers = author
    ? author.followers + (isFollowing ? 1 : 0)
    : 0;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {author === null ? (
                  <AuthorProfileSkeleton />
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {displayedFollowers} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsFollowing((prev) => !prev);
                          }}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {author === null ? (
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
                    <AuthorItems items={author.nftCollection} author={author} />
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

export default Author;
