import Axios from "axios";
import React, { useState } from "react";
import { getToken } from "../api";
import "./AllPosts.css";
import { PostForm, Post } from "../components";

const AllPosts = (props) => {
  const { searchTerm, allPosts, setAllPosts } = props;

  const BASE_URL =
    "https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT";

  const handleDelete = async (postId) => {
    const myCurrentToken = getToken();

    await Axios.delete(`${BASE_URL}/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myCurrentToken}`,
      },
    });

    setAllPosts(
      allPosts.filter((post) => {
        return post._id != postId;
      })
    );
  };

  const handleResponse = async (content, postId) => {
    const myCurrentToken = getToken();

    await Axios.post(
      `${BASE_URL}/posts/${postId}/messages`,
      {
        message: {
          content,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myCurrentToken}`,
        },
      }
    );
  };

  return (
    <div>
      <h1>All Posts</h1>

      <div className="allPosts_Main_Container">
        <div className="allPostsContainer">
          {allPosts
            .filter((post) => {
              if (!searchTerm) {
                return true;
              }
              if (
                post.description.includes(searchTerm) ||
                post.title.includes(searchTerm)
              ) {
                return true;
              }
              return false;
            })
            .sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);

              return dateB - dateA;
            })
            .map((post, idx) => {
              return (
                <Post
                  key={`${idx}: ${post.title}`}
                  post={post}
                  handleDelete={handleDelete}
                  handleResponse={handleResponse}
                />
              );
            })}
        </div>
        <div>
          <PostForm allPosts={allPosts} setAllPosts={setAllPosts} />
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
