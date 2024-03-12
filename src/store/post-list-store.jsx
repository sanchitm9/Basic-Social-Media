import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addInitialPosts: () => {},
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const addPost = (userId, postTitle, postBody, postTags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: Math.floor(Math.random() * 100),
        userId: userId,
        tags: postTags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{ postList: postList,addInitialPosts: addInitialPosts, addPost: addPost, deletePost: deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

// for using fetch from dummyapi

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Going to Switzerland",
//     body: "Hello everyone, I am going to Switzerland for my business trip. Hope to enjoy this trip alot.",
//     reactions: 2,
//     userId: "user-11",
//     tags: ["vacation", "trip", "Outstation"],
//   },
//   {
//     id: "2",
//     title: "Kya haal chaal sabke",
//     body: "Just abhi movie se aa rha kya hi khatarnaak picture banai hai bhai log jarur dekhne jana",
//     reactions: 23,
//     userId: "user-8",
//     tags: ["movie", "enjoy", "bollywood"],
//   },
// ];

export default PostListProvider;
