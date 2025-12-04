import { useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "@/firebase/firebase";
import useUserProfileStore from "@/store/userProfileStore";
import useAuthStore from "@/store/authStore";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const useEditProfile = () => {
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    const [isUpdating, setIsUpdating] = useState(false);
    const showToast = useShowToast();

    const editProfile = async (
        inputs: { fullName: string; username: string; bio: string },
        profilePicFile: string
    ) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);

        let URL = "";
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${authUser.uid}`);
        const userRef = doc(firestore, "users", authUser.uid);
        try {
            if (profilePicFile) {
                await uploadString(storageRef, profilePicFile, "data_url");
                URL = await getDownloadURL(storageRef);
            }

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
            };

            await updateDoc(userRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully.", "success");
        } catch (err: any) {
            showToast("Error", err.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
};

export default useEditProfile;
