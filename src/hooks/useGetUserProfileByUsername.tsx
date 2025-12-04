import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { query, where, getDocs } from "firebase/firestore";
import useUserProfileStore from "@/store/userProfileStore";

const useGetUserProfileByUsername = (username: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();

    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);
            try {
                const q = query(
                    collection(firestore, "users"),
                    where("username", "==", username)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    return setUserProfile(null);
                }

                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
                setUserProfile(userDoc);
                console.log("Fetched user profile:", userDoc);
            } catch (err: any) {
                showToast("Error", err?.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [setUserProfile, username, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
