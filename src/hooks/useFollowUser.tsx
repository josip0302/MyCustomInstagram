import useAuthStore from "@/store/authStore";
import useUserProfileStore from "@/store/userProfileStore";
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
const useFollowUser = (userId: string) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();

    const showToast = useShowToast();

    const handleFollowUser = async () => {
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid);

            const otherUserRef = doc(firestore, "users", userId);

            await updateDoc(currentUserRef, {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            });

            await updateDoc(otherUserRef, {
                followers: isFollowing
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });

            if (isFollowing) {
                setAuthUser({
                    ...authUser,
                    following: authUser?.following.filter(
                        (uid: string) => uid !== userId
                    ),
                });
                if (userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile?.followers.filter(
                            (uid: string) => uid !== authUser.uid
                        ),
                    });
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: authUser?.following.filter(
                            (uid: string) => uid !== userId
                        ),
                    })
                );
                setIsFollowing(false);
            } else {
                setAuthUser({
                    ...authUser,
                    following: [...authUser?.following, userId],
                });

                if (userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid],
                    });
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: [...authUser?.following, userId],
                    })
                );
                setIsFollowing(true);
            }
        } catch (err: any) {
            showToast(
                "Error",
                "Failed to update follow status. Please try again.",
                "error"
            );
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
