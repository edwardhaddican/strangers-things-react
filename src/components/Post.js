import React, { useState } from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { post, handleDelete, handleResponse } = props;
  const [isResponseTrue, setIsResponseTrue] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <div
      className="singlePost"
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
      {post.isAuthor ? (
        <button
          onClick={() => {
            handleDelete(post._id);
          }}
        >
          Delete
        </button>
      ) : isResponseTrue ? (
        <div>
          <textarea
            type="text"
            value={response}
            onChange={(event) => {
              setResponse(event.target.value);
            }}
          ></textarea>
          <button onClick={()=>{
            console.log(response)

            handleResponse(response, post._id)
            setIsResponseTrue(false)
            setResponse('')
          }}>submit</button>
        </div>
      ) : (
        <button
          onClick={() => {
            isResponseTrue ? setIsResponseTrue(false) : setIsResponseTrue(true);
          }}
        >
          Respond
        </button>
      )}
    </div>
  );
};

export default Post;
