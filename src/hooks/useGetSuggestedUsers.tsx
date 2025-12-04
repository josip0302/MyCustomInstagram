import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "@/firebase/firebase";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import useAuthStore from "@/store/authStore";

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState<Array<any>>([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            try {
                const usersRef = collection(firestore, "users");
                const q = query(
                    usersRef,
                    where("uid", "not-in", [
                        authUser.uid,
                        ...authUser.following,
                    ]),
                    orderBy("uid"),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                const users: Array<any> = [];
                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), users });
                });
                setSuggestedUsers(users);
            } catch (err: any) {
                showToast("Error", err.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        if (authUser) getSuggestedUsers();
    }, [authUser, showToast]);

    return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
