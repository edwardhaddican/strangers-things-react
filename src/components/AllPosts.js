import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AllPosts.css";
import { PostForm } from "../components";

const AllPosts = (props) => {
  const allThePosts = props.allPosts;
  const setAllPosts = props.setAllPosts;

  return (
    <div>
      <h1>All Posts</h1>

      <div className="allPosts_Main_Container">
        <div className="allPostsContainer">
          {allThePosts.reverse().map((post, idx) => {
            return (
              <div
                className="singlePost"
                key={`${idx}: ${allThePosts.title}`}
                style={{
                  border: post.isAuthor ? "5px solid gold" : "2px solid brown",
                }}
              >
                <Link to={`/posts/${post._id}`}>
                  <h5>
                    {post.title} {post.location}
                  </h5>
                  <p>{post.description}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <PostForm allPosts={allThePosts} setAllPosts={setAllPosts} />
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
