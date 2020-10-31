import React from "react";
import styles from "./PostFeed.module.scss";
import { randomUser } from "../../../utils";
import dollarImage from "../../../assets/images/dollar.svg";
import badgeImage from "../../../assets/images/badge.svg";

const PostFeed = ({ feed: { body } }) => {
  const user = randomUser();
  return (
    <div className={styles.postContainer}>
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
        <span>{user.last_updated}</span>
      </div>
      <div className={styles.postContainer__body}>{body}</div>
    </div>
  );
};

export default PostFeed;
