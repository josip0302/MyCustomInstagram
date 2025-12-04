import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "@/store/authStore";

const useSignUpWithEmailAndPassword = () => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const [createUserWithEmailAndPassword, , loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const signup = async (inputs: {
        fullname: string;
        username: string;
        email: string;
        password: string;
    }) => {
        if (
            !inputs.email ||
            !inputs.fullname ||
            !inputs.username ||
            !inputs.password
        ) {
            showToast("Error", "All fields are required", "error");
            return;
        }
        const userRef = collection(firestore, "users");

        const q = query(userRef, where("username", "==", inputs.username));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return;
        }
        try {
            const newUser = await createUserWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    fullname: inputs.fullname,
                    username: inputs.username,
                    email: inputs.email,
                    bio: "",
                    profilePictureURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(
                    doc(firestore, "users", newUser.user.uid),
                    userDoc
                );
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                showToast(
                    "Success",
                    "Account created successfully!",
                    "success"
                );
            }
        } catch (err: any) {
            showToast("Error", err?.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
