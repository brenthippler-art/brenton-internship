import React from "react";
import Skeleton from "./Skeleton";

const SkeletonTile = ({
  wrapperClass,
  imageAspectRatio,
  hasImage = true,
  hasAvatar,
  avatarSize,
  hasCheckIcon,
  avatarPosition = "after",
  lines = [],
}) => {
  const avatarBlock = hasAvatar && (
    <div className="skeleton-avatar-wrap">
      <Skeleton width={avatarSize} height={avatarSize} borderRadius="100%" />
      {hasCheckIcon && <i className="fa fa-check"></i>}
    </div>
  );

  const imageBlock = hasImage && (
    <div
      className="skeleton-image-wrap"
      style={{ aspectRatio: imageAspectRatio }}
    >
      <Skeleton width="100%" height="100%" borderRadius="8px" />
    </div>
  );

  return (
    <div className={`${wrapperClass} skeleton-tile`}>
      {avatarPosition === "before" ? avatarBlock : imageBlock}
      {avatarPosition === "before" ? imageBlock : avatarBlock}

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
};

const SkeletonCarousel = ({ count = 4, tileConfig }) => {
  return (
    <div className="skeleton-carousel-wrap">
      <div className="skeleton-carousel-track">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonTile key={index} {...tileConfig} />
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

export const SkeletonList = ({ count = 12, tileConfig }) => (
  <ol className="author_list skeleton-list">
    {Array.from({ length: count }, (_, index) => (
      <li key={index} className="skeleton-tile">
        <SkeletonTile {...tileConfig} wrapperClass="" />
      </li>
    ))}
  </ol>
);

export default SkeletonCarousel;
