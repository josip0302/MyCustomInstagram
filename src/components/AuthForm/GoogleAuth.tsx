import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useShowToast from "@/hooks/useShowToast";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import useAuthStore from "@/store/authStore";

const GoogleAuth = ({ prefix }: { prefix: string }) => {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (error && !newUser) {
                showToast("Error", error.message, "error");
                return;
            }
            const docRef = doc(
                firestore,
                "users",
                newUser ? newUser.user.uid : ""
            );
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // User exists, log them in
                const userDoc = docSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                showToast(
                    "Success",
                    "Account created successfully!",
                    "success"
                );
            } else {
                if (newUser) {
                    const userDoc = {
                        uid: newUser.user.uid,
                        fullname: newUser.user.displayName || "No Name",
                        username: newUser.user.email?.split("@")[0],
                        email: newUser.user.email,
                        bio: "",
                        profilePictureURL: newUser.user.photoURL || "",
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
            }
        } catch (err: any) {
            showToast("Error", err?.message, "error");
        }
    };
    return (
        <>
            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                cursor={"pointer"}
                onClick={handleGoogleAuth}
            >
                <Image src="/google.png" alt="Google logo" w={5} />
                <Text mx={2} color={"blue.400"}>
                    {prefix} with Google
                </Text>
            </Flex>
        </>
    );
};

export default GoogleAuth;
