import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../api";
import "./PostForm.css";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT";

const PostForm = (props) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const myCurrentToken = getToken();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { allPosts, setAllPosts } = props;
    try {
      const newPost = await axios.post(
        `${BASE_URL}/posts`,
        {
          post: {
            title: title,
            description: body,
            price: price,
            location: location,
            willDeliver: willDeliver,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myCurrentToken}`,
          },
        }
      );

      setAllPosts([...allPosts, newPost.data.data.post]);
      setErrMessage("");
      setTitle('')
      setBody('')
      setPrice('')
      setLocation('')
      setWillDeliver(false)
    } catch (err) {
      console.dir(err.response.data.error.message);
      setErrMessage(err.response.data.error.message);
      //need to add funcitonality that if the post fails because of a missing required field that a small banner appears
    }
  };

  return (
    <div className="post_form_main_container">
      {errMessage ? <p>{errMessage}</p> : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="form_title"
        />

        <input
          type="text"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Description"
          className="form_body"
        />

        <input
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Requested Price"
          className="form_price"
        />

        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location"
          className="form_location"
        />

        {/* <select
          value={willDeliver}
          onChange={(event) => setWillDeliver(event.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select> */}
        <div>
          <label className="will_deliver_checkbox">
            Will Deliver
            <input
              type="checkbox"
              checked={willDeliver}
              onChange={() => setWillDeliver(!willDeliver)}
            />
          </label>
        </div>

        <button type="submit" className="form_submit_button">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
