import React from "react";
import Skeleton from "./Skeleton";

const SkeletonTile = () => (
  <div className="nft_coll skeleton-tile">
    <div className="nft_wrap skeleton-nft-wrap">
      <Skeleton width="100%" height="100%" borderRadius="10px 10px 0 0" />
    </div>
    <div className="nft_coll_pp">
      <Skeleton width="60px" height="60px" borderRadius="100%" />
      <i className="fa fa-check"></i>
    </div>
    <div className="nft_coll_info">
      <h4>
        <Skeleton width="70%" height="16px" borderRadius="4px" />
      </h4>
      <span>
        <Skeleton width="40%" height="14px" borderRadius="4px" />
      </span>
    </div>
  </div>
);

const SkeletonCarousel = ({ count = 4 }) => {
  return (
    <div className="skeleton-carousel-wrap">
      <div className="skeleton-carousel-track">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonTile key={index} />
        ))}
      </div>
      <div className="owl-nav">
        <button className="owl-prev" disabled aria-label="Previous">
          ‹
        </button>
        <button className="owl-next" disabled aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
};

export default SkeletonCarousel;