import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "@/store/authStore";
import { firestore } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import usePostStore from "@/store/postStore";

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment);

    const handlePostComment = async (postId: string, commentText: string) => {
        if (!authUser) {
            showToast("Error", "You must be logged in to comment", "error");
            return;
        }
        if (isCommenting) return; // Prevent multiple submissions
        setIsCommenting(true);
        const newComment = {
            comment: commentText,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId: postId,
        };

        try {
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment),
            });
            addComment(postId, newComment);
        } catch (error) {
            showToast("Error", "Error posting comment", "error");
        } finally {
            setIsCommenting(false);
        }
    };
    return { isCommenting, handlePostComment };
};

export default usePostComment;
