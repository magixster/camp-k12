import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserFeed } from "./modules";
import styles from "./Feed.module.scss";

import PostFeed from "./components/PostFeed";

const PostInput = () => {
  return (
    <div className={styles.feedsContainer__postInputContainer}>
      <textarea
        className={styles.feedsContainer__postInput}
        placeholder='Write a post...'
      />
      <button className={styles.feedsContainer__postInput_submitBtn}>
        POST
      </button>
    </div>
  );
};

const Feed = ({ dispatch, history, feedList }) => {
  useEffect(() => {
    dispatch(getUserFeed());
  }, []);

  return (
    <div className={styles.feedsWrapper}>
      <div className={styles.bg}>
        <div className={styles.feedsContainer__header}>
          <span className={styles.feedsContainer__header_title}>Your Feed</span>
          {true && (
            <span
              onClick={() => history.push('/')}
              className={styles.feedsContainer__header_title2}>LOGOUT</span>
          )}
        </div>
        <PostInput />
      </div>
      <div className={styles.feedsContainer}>
        {feedList.map((feed) => <PostFeed key={feed.id} feed={feed} />)}
      </div>
    </div>
  );
};

const mapStateToProps = ({ feeds }) => ({
  feedList: feeds.userFeeds.feeds,
});

export default connect(mapStateToProps)(Feed);
