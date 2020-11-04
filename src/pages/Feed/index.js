import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserFeed, createPost } from "./modules";
import styles from "./Feed.module.scss";

import PostFeed from "./components/PostFeed";
import { randomUser } from "../../utils";
import { userSignout } from "../Home/modules";
<<<<<<< HEAD
=======
import { USER_LIST } from "../../devData/users";
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600

const PostInput = ({ userPost, setUserPost, createNewPost, disabled }) => {
  return (
    <div className={styles.feedsContainer__postInputContainer}>
      <textarea
        className={styles.feedsContainer__postInput}
        placeholder='Write a post...'
        value={userPost}
        onChange={({ target }) => {
          setUserPost(target.value);
        }}
      />
      <button
        onClick={() => {
          createNewPost();
          setUserPost('');
        }}
        disabled={disabled}
        className={`${styles.feedsContainer__postInput_submitBtn} ${
          disabled && styles.feedsContainer__postInput_submitBtn_disabled
        }`}
      >
        POST
      </button>
    </div>
  );
};

<<<<<<< HEAD
const Feed = ({ dispatch, history, feedList, user }) => {
  useEffect(() => {
    dispatch(getUserFeed());
  }, []);

=======
const Feed = ({ dispatch, history, feedList }) => {
  useEffect(() => {
    dispatch(getUserFeed());
  }, []);
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
  const [userPost, setUserPost] = useState("");

  return (
    <div className={styles.feedsWrapper}>
      <div className={styles.bg}>
        <div className={styles.feedsContainer__header}>
          <span className={styles.feedsContainer__header_title}>Your Feed</span>
          {true && (
            <span
              onClick={() => {
<<<<<<< HEAD
                dispatch(userSignout(user));
=======
                dispatch(userSignout());
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
                history.push("/");
              }}
              className={styles.feedsContainer__header_title2}
            >
              LOGOUT
            </span>
          )}
        </div>
        <PostInput
          userPost={userPost}
          setUserPost={setUserPost}
          disabled={!userPost}
          createNewPost={() => dispatch(createPost(userPost))}
        />
      </div>
      <div className={styles.feedsContainer}>
        {feedList.map((feed) => (
<<<<<<< HEAD
          <PostFeed user={user} key={feed.id} feed={feed} />
=======
          <PostFeed
            onClick={() => {
              history.push(`/feeds/${feed.id}`);
            }}
          user={USER_LIST[feed.userId - 1]} key={feed.id} feed={feed} />
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ feeds }) => ({
  feedList: feeds.userFeeds.feeds,
<<<<<<< HEAD
  user: randomUser(),
=======
>>>>>>> f5bc3019907e3d6451d28bad6a91b0fff37d0600
});

export default connect(mapStateToProps)(Feed);
