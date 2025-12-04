import { create } from "zustand";

const usePostStore = create<{
    posts: any[];
    createPost: (post: any) => void;
    deletePost: (postId: string) => void;
    //updatepost
    setPosts: (posts: any[]) => void;
    addComment: (postId: string, comment: any) => void;
}>((set) => ({
    posts: [],
    createPost: (post: any) =>
        set((state: any) => ({ posts: [post, ...state.posts] })),
    deletePost: (postId: string) =>
        set((state: any) => ({
            posts: state.posts.filter((post: any) => post.id !== postId),
        })),
    //updatepost
    setPosts: (posts: any[]) => set({ posts }),
    addComment: (postId: string, comment: any) =>
        set((state: any) => ({
            posts: state.posts.map((post: any) => {
                if (post.id == postId) {
                    return {
                        ...post,
                        comments: [...post.comments, comment],
                    };
                }
                return post;
            }),
        })),
}));
export default usePostStore;
