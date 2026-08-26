import React from "react";
import Skeleton from "./Skeleton";

const SkeletonTile = ({ wrapperClass, imageAspectRatio, hasAvatar, avatarSize, hasCheckIcon, lines }) => (
  <div className={`${wrapperClass} skeleton-tile`}>
    <div className="skeleton-image-wrap" style={{ aspectRatio: imageAspectRatio }}>
      <Skeleton width="100%" height="100%" borderRadius="8px" />
    </div>

    {hasAvatar && (
      <div className="skeleton-avatar-wrap">
        <Skeleton width={avatarSize} height={avatarSize} borderRadius="100%" />
        {hasCheckIcon && <i className="fa fa-check"></i>}
      </div>
    )}

    <div className="skeleton-info">
      {lines.map((line, index) => (
        <Skeleton
          key={index}
          width={line.width}
          height={line.height}
          borderRadius="4px"
        />
      ))}
    </div>
  </div>
);

const SkeletonCarousel = ({ count = 4, tileConfig }) => {
  return (
    <div className="skeleton-carousel-wrap">
      <div className="skeleton-carousel-track">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonTile key={index} {...tileConfig} />
        ))}
      </div>
      <div className="owl-nav">
        <button className="owl-prev" disabled aria-label="Previous">‹</button>
        <button className="owl-next" disabled aria-label="Next">›</button>
      </div>
    </div>
  );
};

export default SkeletonCarousel;