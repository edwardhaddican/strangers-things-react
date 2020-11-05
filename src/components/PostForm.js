import React, { useState } from "react";
import axios from 'axios'
import { getToken } from '../api'
import AllPosts from "./AllPosts";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT";

const PostForm = (props) => {

  const [body, setBody] = useState('Title')
  const [title, setTitle] = useState('empty')
  const [price, setPrice] = useState('empty')
  const [location, setLocation] = useState('no place yet')
  const [willDeliver, setWillDeliver] = useState(false)

  const myCurrentToken = getToken()

  console.log("token", myCurrentToken)


  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const { allPosts, setAllPosts } = props
    try {

      const newPost = await axios.post(`${BASE_URL}/posts`,
        {
          post: {
            title: title,
            description: body,
            price: price
          }
        }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${myCurrentToken}`
        }
      })

      console.log('newPost', newPost)
      setAllPosts([...allPosts, newPost.data.data.post])

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={title} onChange={(event) =>
        setTitle(event.target.value)} placeholder='title' />

      <input type='text' value={body} onChange={(event) =>
        setBody(event.target.value)} placeholder='body' />

      <button type='submit'>Post</button>
    </form>
  )

}

export default PostForm
