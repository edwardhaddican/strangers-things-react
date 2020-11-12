import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getToken, clearToken } from "./api";
import {
  PostForm,
  AllPosts,
  SinglePost,
  Login,
  Register,
  NavBar,
} from "./components";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT";


const App = () => {
  // a piece of state that represents the status of the current user
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')  //make  a state to filter the posts maybe here or in all posts.  or physically render the search bar in the nav bar.
  // make the i will delete a check box.

  // function filteredPosts(){
  //   return postList.filter((post) => {
  //     return post.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   })

  //   if(!isRecent){
  //     return true
  //   }

  //   const postsFilteredByRecency = postFilteredBySearchTerm.filter((post) => {
  //     const postTime = Date.parse(post.createdAt) // time date string
  //     const nowTime = Date.now()
  //     const TWO_HOURS = 1000 * 60 * 60 * 2; // in milliseconds

  //     return postTime + TWO_HOURS >=nowTime
  //   })
  // } //making a function to filter by a search and by a recent button for the last two hours.

  useEffect(async () => {
    const myCurrentToken = getToken()

    const allFetchedPosts = await Axios.get(`${BASE_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myCurrentToken}`,
      },
    });

    setAllPosts(allFetchedPosts.data.data.posts)
  }, []);

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <h1>Thanks for logging in!</h1>
          <NavBar setIsLoggedIn={setIsLoggedIn} />
          <Switch>
            <Route
              exact
              path="/posts/create"
              render={() => {
                return (
                  <PostForm allPosts={allPosts} setAllPosts={setAllPosts} />
                );
              }}
            />
            <Route
              exact
              path="/posts/:singlepost"
              render={() => {
                return <SinglePost allPosts={allPosts} />;
              }}
            />
            <Route
              exact
              path="/posts"
              render={() => {
                return <AllPosts allPosts={allPosts} setAllPosts={setAllPosts}/>;
              }}
            />
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

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
