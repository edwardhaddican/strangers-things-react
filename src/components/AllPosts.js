import React, { useState } from "react";
import { Link } from 'react-router-dom'

const AllPosts = (props) => {
  const allThePosts = props.allPosts
  console.log('all posts', allThePosts)

  return (
    <div className='allPostsContainer'>
      <h1>All Posts</h1>
      {allThePosts.map((post, idx) => {
        return (
          <div className="singlePost" key={`${idx}: ${allThePosts.title}`}>
            <Link to={`/posts/${post._id}`}>
              {post.title}
              {post.description}
            </Link>
          </div>
        )
      })}
    </div>
  )


}


export default AllPosts
