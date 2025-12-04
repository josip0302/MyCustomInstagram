import useAuthStore from "@/store/authStore";
import { useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const useLikePost = (post: any) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const [likes, setLikes] = useState<number>(post.likes.length);
    const [isLiked, setIsLiked] = useState<boolean>(
        post.likes.includes(authUser.uid)
    );
    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!authUser) {
            showToast("Error", "You must be logged in to like a post", "error");
            return;
        }

        setIsUpdating(true);
        try {
            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isLiked
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);
        } catch (err: any) {
            showToast("Error", "Error updating like: " + err.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };
    return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
