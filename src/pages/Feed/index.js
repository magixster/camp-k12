import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserFeed, createPost } from "./modules";
import styles from "./Feed.module.scss";

import PostFeed from "./components/PostFeed";
import { userSignout } from "../Home/modules";

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

const Feed = ({ dispatch, history, feedList, user, allUsers }) => {
  useEffect(() => {
    if (!feedList.length) dispatch(getUserFeed());
  }, []);
  const [userPost, setUserPost] = useState("");

  return (
    <div className={styles.feedsWrapper}>
      <div className={styles.bg}>
        <div className={styles.feedsContainer__header}>
          <span className={styles.feedsContainer__header_title}>Your Feed</span>
          {true && (
            <span
              onClick={() => {
                dispatch(userSignout());
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
        {feedList.map((feed) => {
          return (
          <PostFeed
            onClick={() => {
              history.push(`/feeds/${feed.id}`);
            }}
          user={allUsers[feed.userId - 1]} key={feed.id} feed={feed} />
        )})}
      </div>
    </div>
  );
};

const mapStateToProps = ({ feeds, user }) => ({
  feedList: feeds.userFeeds.feeds,
  user: user.user.data,
  allUsers: user.allUsers.allUsers,
});

export default connect(mapStateToProps)(Feed);
