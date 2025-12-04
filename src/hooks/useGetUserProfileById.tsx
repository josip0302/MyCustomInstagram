import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

const useGetUserProfileById = (userId: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<any>(null);

    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                const userRef = await getDoc(doc(firestore, "users", userId));
                if (userRef.exists()) {
                    setUserProfile(userRef.data());
                }
            } catch (err: any) {
                showToast(
                    "Error",
                    "Error fetching user profile: " + err.message,
                    "error"
                );
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [showToast, setUserProfile, userId]);

    return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
