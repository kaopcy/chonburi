import { createContext, useContext, useState, useMemo } from "react";
import { getDistance } from "geolib";

import { useUserLocation } from "../UserLocationContext";

const PostContext = createContext({ post: null, setPost: () => {} });
const PostsContext = createContext({ posts: null, setPosts: () => {} });

export const PostContextProvider = ({
    fetchedPost,
    fetchedPosts,
    children,
}) => {
    const [post, setPost] = useState(fetchedPost);
    const [posts, setPosts] = useState(fetchedPosts);

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            <PostContext.Provider value={{ post, setPost }}>
                {children}
            </PostContext.Provider>
        </PostsContext.Provider>
    );
};

export const usePostContext = () => useContext(PostContext);
export const usePostsContext = () => {
    const { userLocation } = useUserLocation();
    const { posts, setPosts } = useContext(PostsContext);
    const { post } = useContext(PostContext);

    const distanceSortedPost = useMemo(() =>
        posts
            ? posts
                  .map((e) => ({
                      distance: userLocation
                          ? getDistance(userLocation, e.coords)
                          : null,
                      ...e,
                  }))
                  .sort((a, b) => a.distance - b.distance)
                  .filter(
                      (e) =>
                          e.title.toLowerCase().trim() !==
                          post.title.toLowerCase().trim()
                  )
            : null
    );

    const distanceSortedByCurrentLocationPost = useMemo(() =>
        posts
            ? posts
                  .map((e) => ({
                      distance: post.coords
                          ? getDistance(post.coords, e.coords)
                          : null,
                      ...e,
                  }))
                  .sort((a, b) => a.distance - b.distance)
                  .filter(
                      (e) =>
                          e.title.toLowerCase().trim() !==
                          post.title.toLowerCase().trim()
                  )
            : null
    );

    return {
        posts,
        setPosts,
        distanceSortedPost,
        distanceSortedByCurrentLocationPost,
    };
};
