import React from "react";
import NftItemTile from "../UI/NFTItemTile";

const AuthorItems = ({ items, author }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.id}
            >
              <NftItemTile
                item={{
                  ...item,
                  authorImage: author.authorImage,
                  authorId: author.authorId,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;