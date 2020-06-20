import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPosts, getPostsDb, addPost, deletePost } from './features/posts/postSlice'


const App = () => {
  const [formData, setFormData] = useState({
    post: ''
  })

  const { post } = formData

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
    dispatch(getPostsDb())
    // eslint-disable-next-line
  }, [])

  const {posts, DBposts} = useSelector(selectPosts)
  //console.log(DBposts)

  const onChange = e => setFormData({ [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    dispatch(addPost(post))
    setFormData({...formData, post: ''})
  }
  //console.log(post)

  return (
    <div>
      <Fragment>
        <h3>Get posts from JSON PLACE HOLDER</h3>
        {posts && posts.map(post => <li key={post.id}>
        <h3>post title:{<br/>} {post.title}</h3>
        post text:{<br/>} {post.body}
        </li>)}
        <hr/>
      </Fragment>

      <Fragment>
        <h3>Get posts from db</h3>
        {DBposts && DBposts.map(dbpost => <li 
        key={dbpost.todo_id}>
          {dbpost.description}
          <button onClick={()=> dispatch(deletePost(dbpost.todo_id))}>
            delete</button>
        </li>)}
        <hr />
      </Fragment>

      <Fragment>
        <h3>Add post to db</h3>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} name='post' value={post} placeholder='add post' /> <br/>
          <button>Add</button>
        </form>
      </Fragment>
    </div>
  )
}

export default App