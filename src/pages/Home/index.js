import React from 'react'
import styles from './Home.module.scss'
import { Redirect } from 'react-router-dom';
import SignIn from './components/SignIn';

class Home extends React.Component {
  render() {
  // throw new Error('I crashed!');
  return (
    <div className={styles.homeContainer}>
      {this.props.userLoggedIn ?
        <Redirect to={'/feed'} /> :
        <SignIn />}
    </div>
  )

  }
}

export default Home;