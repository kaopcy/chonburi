import { useMemo, useRef } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const PostsContext = createContext({
    posts: null,
    amphoeArr: [],
    postsArr: [],
    activeAmphoe: null,
    setActiveAmphoe: () => {},
    postByActiveAmphoe: null,
    isScrollTo: null,
    filter: null,
    setFilter: () => {},
});

export const PostsContextProvider = ({ initPosts, children }) => {
    const [posts] = useState(initPosts);
    const isScrollTo = useRef(false);
    const [activeAmphoe, setActiveAmphoe] = useState(null);

    const [filter, setFilter] = useState("");

    const amphoeArr = useMemo(() => (posts ? Object.keys(posts) : []), [posts]);
    const postsArr = useMemo(
        () =>
            posts
                ? Object.values(posts).map((amphoe) =>
                      amphoe.filter((post) => post.title.includes(filter))
                  )
                : [],
        [posts, filter]
    );

    const postByActiveAmphoe = useMemo(
        () =>
            posts[activeAmphoe]
                ? posts[activeAmphoe].filter((post) =>
                      post.title.includes(filter)
                  )
                : null,
        [activeAmphoe, filter]
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
                isScrollTo,
                filter,
                setFilter,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export const usePostsContext = () => useContext(PostsContext);
