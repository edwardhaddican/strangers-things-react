import React, { useState } from "react";
import {useParams} from "react-router-dom"

const SinglePost = (props) => {
  const allThePosts = props.allPosts

  const {singlepost} = useParams()

  const currentPost = allThePosts.find((post)=>{
    if(post._id === singlepost){
      return true
    } else {
      return false
    }
  })

  if(currentPost){
    return(
      <div>
        <h1>Single Post</h1>
        <h2>Title: {currentPost.title}</h2>
      </div>
    )
  } else {
    return <h1>Loading</h1>
  }



}




export default SinglePost
