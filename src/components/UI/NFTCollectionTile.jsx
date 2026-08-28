import React from "react";
import { Link } from "react-router-dom";

const NftCollectionTile = ({ item }) => (
  <div className="nft_coll" data-aos="fade-up">
    <div className="nft_wrap">
      <Link to={`/item-details/${item.nftId}`}>
        <img src={item.nftImage} className="lazy img-fluid" alt="" />
      </Link>
    </div>
    <div className="nft_coll_pp">
      <Link to={`/author/${item.authorId}`}>
        <img className="lazy pp-coll" src={item.authorImage} alt="" />
      </Link>
      <i className="fa fa-check"></i>
    </div>
    <div className="nft_coll_info">
      <Link to={`/item-details/${item.nftId}`}>
        <h4>{item.title}</h4>
      </Link>
      <span>ERC-{item.code}</span>
    </div>
  </div>
);

export default NftCollectionTile;