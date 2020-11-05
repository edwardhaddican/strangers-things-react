import React, { useState } from "react";
import ReactDOM from "react-dom";
import { getToken, clearToken } from "./api";
import { PostForm, Login, Register, NavBar } from './components'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

const App = () => {
  // a piece of state that represents the status of the current user
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [allPosts, setAllPosts] = useState([])

  console.log('all posts', allPosts)

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <h1>Thanks for logging in!</h1>
          <NavBar setIsLoggedIn={setIsLoggedIn}/>
          <Switch>
            <Route path="/posts/create" render={() => {
              return <PostForm allPosts={allPosts} setAllPosts={setAllPosts}/>
            }}/>
            {/* <Route path="/posts" render={AllPosts}/> */}

          </Switch>
        </>
      ) : (
          <>
            <Register setIsLoggedIn={setIsLoggedIn} />
            <Login setIsLoggedIn={setIsLoggedIn} />
          </>
        )}
    </div>
  );
};

ReactDOM.render(<Router><App /></Router>, document.getElementById("app"));
