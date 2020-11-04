import React from "react";
import { connect } from "react-redux";

import styles from "./FeedOverview.module.scss";
import PostFeed from "../Feed/components/PostFeed";
import { USER_LIST } from "../../devData/users";

const FeedOverview = ({ dispatch, history, match, feedList }) => {
  const feed = feedList.find((feed) => feed.id === match.params.feedId * 1);
  return (
    <div className={styles.feedsWrapper}>
      <div className={styles.bg}>
        <div className={styles.feedsContainer__header}>
          <span className={styles.feedsContainer__header_title}>Your Feed</span>
          {true && (
            <span
              onClick={() => {
                history.push("/");
              }}
              className={styles.feedsContainer__header_title2}
            >
              LOGOUT
            </span>
          )}
        </div>

        <div className={styles.feedsContainer}>
          <PostFeed
            user={USER_LIST[feed.userId - 1]}
            key={match.params.feedId}
            feed={feed}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ feeds }) => ({
  feedList: feeds.userFeeds.feeds,
});

export default connect(mapStateToProps)(FeedOverview);
