import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        DBposts: []
    },
    reducers: {
        handlePosts: (state, action) => {
            return{ ...state, posts: state.posts.concat(action.payload)}
        },
        handleDBPosts: (state, action) => {
            return{ ...state, DBposts: state.DBposts.concat(action.payload)}
        },
        deleteDBPost: (state, action) => {
            return{ ...state, DBposts: state.DBposts.filter(postdb => postdb.todo_id !== action.payload)}
        }
    }
})

export const { handlePosts, handleDBPosts, deleteDBPost } = postSlice.actions;

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: {_limit: 1}})
        dispatch(handlePosts(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const getPostsDb = () => async dispatch => {
    try {
        const res = await axios.get('/db')
        dispatch(handleDBPosts(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const addPost = (data) => async dispatch => {
    try {
        console.log(data)
        const res = await axios.post('/db', {data})
        dispatch(handleDBPosts(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        const res = await axios.delete('/db', {data: {id}})
        //console.log(res.data)
        dispatch(deleteDBPost(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const selectPosts = state => state.post

export default postSlice.reducer