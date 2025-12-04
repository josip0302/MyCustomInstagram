import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "@/store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const fetchFeedPosts = async () => {
            setIsLoading(true);
            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }
            try {
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "in", authUser.following)
                );
                const querySnapshot = await getDocs(q);
                const feedPosts: any[] = [];
                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (err: any) {
                showToast(
                    "Error",
                    "Error fetching feed posts: " + err.message,
                    "error"
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) fetchFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile]);
    return { posts, isLoading };
};

export default useGetFeedPosts;
