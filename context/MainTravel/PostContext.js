import { useMemo } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const PostsContext = createContext({
    posts: null,
    amphoeArr: [],
    postsArr: [],
});

export const PostsContextProvider = ({ initPosts, children }) => {
    const [posts] = useState(initPosts);

    const amphoeArr = useMemo(() => (posts ? Object.keys(posts) : []), [posts]);
    const postsArr = useMemo(
        () => (posts ? Object.values(posts) : []),
        [posts]
    );

    return (
        <PostsContext.Provider value={{ amphoeArr , posts , postsArr }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePostsContext = () => useContext(PostsContext);
