import React from 'react'
import styles from './Home.module.scss'
import { Redirect } from 'react-router-dom';
import SignIn from './components/SignIn';

const Home = ({ userLoggedIn }) => {
  return (
    <div className={styles.homeContainer}>
      {userLoggedIn ?
        <Redirect to={'/feed'} /> :
        <SignIn />}
    </div>
  )
}

export default Home;