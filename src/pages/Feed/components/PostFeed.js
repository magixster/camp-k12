import React from "react";
import styles from "./PostFeed.module.scss";
import dollarImage from "../../../assets/images/dollar.svg";
import badgeImage from "../../../assets/images/badge.svg";

<<<<<<< HEAD
const PostFeed = ({ feed: { body }, user }) => (
  <div className={styles.postContainer}>
=======
const PostFeed = ({ feed: { body, last_updated }, user, onClick }) => (
  <div className={styles.postContainer} onClick={onClick}>
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
    <div className={styles.postContainer__header}>
      <img
        className={styles.postContainer__profileImg}
        alt='dummy img'
        src={user.img}
      />
      <div>
        <p className={styles.postContainer__profileName}>{user.name}</p>
        <img height={15} width={15} src={badgeImage} alt='badge' />
        <span style={{ marginRight: "4px" }}>{user.stage}</span>
        <img height={15} width={15} src={dollarImage} alt='dollar' />
        <span style={{ marginLeft: "4px" }}>{user.coins}</span>
      </div>
<<<<<<< HEAD
      <span>{user.last_updated}</span>
=======
      <span>{last_updated || user.last_updated}</span>
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
    </div>
    <div className={styles.postContainer__body}>{body}</div>
  </div>
);
export default PostFeed;
