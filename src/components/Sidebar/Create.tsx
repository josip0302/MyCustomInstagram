import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Portal,
    Input,
    Flex,
    Textarea,
    Image,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { CreatePostLogo } from "@/assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImage from "@/hooks/usePreviewImage";
import useShowToast from "@/hooks/useShowToast";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import useProfileStore from "@/store/userProfileStore";
import { useLocation } from "react-router-dom";
import { firestore, storage } from "@/firebase/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { updateDoc, arrayUnion } from "firebase/firestore";
import { uploadString, getDownloadURL } from "firebase/storage";
import { useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "@/store/userProfileStore";
const Create = () => {
    const [caption, setCaption] = useState("");
    const imageRef = useRef<HTMLInputElement | null>(null);
    const { handleFileChange, selectedFile, setSelectedFile } =
        usePreviewImage();
    const { open, onOpen, onClose } = useDisclosure();
    const { isLoading, handleCreatePost } = useCreatePost();
    const showToast = useShowToast();
    const handlePostCreation = async () => {
        try {
            await handleCreatePost(caption, selectedFile || "");
            onClose();
            setCaption("");
            setSelectedFile("");
        } catch (err: any) {
            showToast("Error", "Error creating post: " + err.message, "error");
        }
    };
    return (
        <Dialog.Root
            motionPreset="slide-in-left"
            open={open}
            onOpenChange={(isOpen) => {
                if (isOpen) {
                    onOpen();
                } else {
                    onClose();
                }
            }}
        >
            <Dialog.Trigger asChild>
                <Box>
                    <Tooltip
                        content={"create"}
                        positioning={{ placement: "right" }}
                        showArrow
                        openDelay={500}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            _hover={{ bg: "whiteAlpha.400" }}
                            w={{ base: 10, md: "full" }}
                            p={2}
                            borderRadius={6}
                            justifyContent={{
                                base: "center",
                                md: "flex-start",
                            }}
                        >
                            <CreatePostLogo />
                            <Box
                                display={{
                                    base: "none",
                                    md: "block",
                                }}
                                ml={2}
                            >
                                Create
                            </Box>
                        </Box>
                    </Tooltip>
                </Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={"black"}
                        border={"1px solid gray"}
                        maxW={"400px"}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Box>
                                <Textarea
                                    placeholder="Post caption..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    ref={imageRef}
                                    onChange={handleFileChange}
                                />
                                <BsFillImageFill
                                    size={16}
                                    style={{
                                        marginTop: "15px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => imageRef.current?.click()}
                                />
                                {selectedFile && (
                                    <Flex
                                        mt={5}
                                        w={"full"}
                                        position={"relative"}
                                        justifyContent={"center"}
                                    >
                                        <Image
                                            src={selectedFile}
                                            alt="Selected image"
                                        />
                                        <CloseButton
                                            position={"absolute"}
                                            top={2}
                                            right={2}
                                            onClick={() => setSelectedFile("")}
                                        />
                                    </Flex>
                                )}
                            </Box>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button
                                ml={"auto"}
                                onClick={handlePostCreation}
                                loading={isLoading}
                            >
                                Post
                            </Button>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default Create;

function useCreatePost() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useProfileStore((state) => state.addPost);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const { pathname } = useLocation();

    const handleCreatePost = async (caption: string, imageFile: string) => {
        if (isLoading) return;
        if (!imageFile) {
            showToast("Error", "Please select an image", "error");
            return;
        }
        setIsLoading(true);
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
            imageURL: "",
        };
        try {
            const postDocRef = await addDoc(
                collection(firestore, "posts"),
                newPost
            );
            const userDocRef = doc(firestore, "users", authUser.uid);

            const imageRef = ref(storage, `posts/${postDocRef.id}`);
            await updateDoc(userDocRef, {
                posts: arrayUnion(postDocRef.id),
            });
            await uploadString(imageRef, imageFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef, {
                imageURL: downloadURL,
            });

            newPost.imageURL = downloadURL;
            if (userProfile?.uid === authUser.uid)
                createPost({ ...newPost, id: postDocRef.id });

            if (pathname !== "/" && userProfile?.uid === authUser.uid)
                addPost({ ...newPost, id: postDocRef.id });

            showToast("Success", "Post created successfully", "success");
        } catch (err: any) {
            showToast("Error", "Error creating post: " + err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreatePost };
}
