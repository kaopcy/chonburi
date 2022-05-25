import { createContext, useContext, useState } from "react";
const PostContext = createContext({
    post: null,
    setPost: null,
});

const PostsContext = createContext({
    posts: null,
    setPosts: null,
});

export const PostProvider = ({ children, initialPost , initialPosts }) => {
    const [post, setPost] = useState(initialPost || null);
    const [posts, setPosts] = useState(initialPosts || null);

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            <PostContext.Provider value={{ post, setPost }}>
                {children}
            </PostContext.Provider>
        </PostsContext.Provider>
    );
};

export const usePost = () => useContext(PostContext);
export const usePosts = ()=> useContext(PostsContext);
