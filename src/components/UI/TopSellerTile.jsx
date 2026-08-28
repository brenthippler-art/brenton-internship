import React from "react";
import { Link } from "react-router-dom";

const TopSellerTile = ({ item }) => (
  <li data-aos="fade-up">
    <div className="author_list_pp">
      <Link to={`/author/${item.authorId}`}>
        <img className="lazy pp-author" src={item.authorImage} alt="" />
        <i className="fa fa-check"></i>
      </Link>
    </div>
    <div className="author_list_info">
      <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
      <span>{item.price} ETH</span>
    </div>
  </li>
);

export default TopSellerTile;