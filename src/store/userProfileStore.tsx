import { create } from "zustand";

const useUserProfileStore = create<{
    userProfile: any;
    setUserProfile: (user: any) => void;
    addPost: (post: any) => void;
    deletePost: (postId: string) => void;
}>((set) => ({
    userProfile: null as null,
    setUserProfile: (user: any) => set({ userProfile: user }),
    addPost: (post: any) =>
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: [post.id, ...state.userProfile?.posts],
            },
        })),
    deletePost: (postId: string) =>
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: state.userProfile?.posts.filter(
                    (id: string) => id !== postId
                ),
            },
        })),
}));

export default useUserProfileStore;
