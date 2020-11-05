import React from "react";
import { connect } from "react-redux";

import styles from "./FeedOverview.module.scss";
import PostFeed from "../Feed/components/PostFeed";

const FeedOverview = ({ history, match, feedList, user, allUsers }) => {
  const feed = feedList.find((feed) => feed.id === match.params.feedId * 1);
  debugger;
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
            user={allUsers[feed.userId - 1]}
            key={match.params.feedId}
            feed={feed}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ feeds, user }) => ({
  feedList: feeds.userFeeds.feeds,
  user: user.user.data,
  allUsers: user.allUsers.allUsers,
});

export default connect(mapStateToProps)(FeedOverview);
