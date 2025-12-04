import { useState } from "react";
import useShowToast from "@/hooks/useShowToast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const showToast = useShowToast();

    const getUserProfile = async (username: string) => {
        setIsLoading(true);

        try {
            const q = query(
                collection(firestore, "users"),
                where("username", "==", username)
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                showToast("Error", "User not found", "error");
                setUser(null);
            }

            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err: any) {
            showToast("Error", JSON.stringify(err), "error");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };
    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
