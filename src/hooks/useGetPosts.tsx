import usePostStore from "@/store/postStore";
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "@/store/userProfileStore";
import { firestore } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
const useGetPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return;
            setIsLoading(true);

            setPosts([]);
            try {
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "==", userProfile.uid)
                );
                const querySnapshot = await getDocs(q);
                const posts = [] as any[];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                });
                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (err: any) {
                showToast(
                    "Error",
                    "Error fetching posts: " + err.message,
                    "error"
                );
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, [setPosts, userProfile, showToast]);

    return { isLoading, posts };
};

export default useGetPosts;
