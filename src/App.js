import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Page404 from "./pages/Page404";
import SignUp from "./pages/Home/components/SignUp";

import "./App.css";
import ErrorBoundary from "./components/ErrorBoundry";

const HomePage = (props) => (
  <ErrorBoundary>
    <Home {...props} />
  </ErrorBoundary>
);
const FeedPage = (props) => (
  <ErrorBoundary>
    <Feed {...props} />
  </ErrorBoundary>
);
const SignUpPage = (props) => (
  <ErrorBoundary>
    <SignUp {...props} />
  </ErrorBoundary>
);

function App() {
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className='switch-wrapper'
      >
        <Route exact path='/' component={HomePage} />
        <Route path='/feeds/' component={FeedPage} />
        <Route path='/signUp/' component={SignUpPage} />
        <Route component={Page404} />
      </AnimatedSwitch>
    </Router>
  );
}

export default App;
