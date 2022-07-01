import { useMemo , useRef } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const PostsContext = createContext({
    posts: null,
    amphoeArr: [],
    postsArr: [],
    activeAmphoe: null,
    setActiveAmphoe: () => {},
    postByActiveAmphoe: null,
    isScrollTo: null

});

export const PostsContextProvider = ({ initPosts, children }) => {
    const [posts] = useState(initPosts);
    const isScrollTo = useRef(false);
    const [activeAmphoe, setActiveAmphoe] = useState(null);

    const amphoeArr = useMemo(() => (posts ? Object.keys(posts) : []), [posts]);
    const postsArr = useMemo(
        () => (posts ? Object.values(posts) : []),
        [posts]
    );

    const postByActiveAmphoe = useMemo(
        () => posts[activeAmphoe],
        [activeAmphoe]
    );

    return (
        <PostsContext.Provider
            value={{
                amphoeArr,
                posts,
                postsArr,
                activeAmphoe,
                setActiveAmphoe,
                postByActiveAmphoe,
                isScrollTo
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export const usePostsContext = () => useContext(PostsContext);
