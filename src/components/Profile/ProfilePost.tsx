import {
    GridItem,
    Flex,
    Text,
    Image,
    Dialog,
    Button,
    Portal,
    CloseButton,
    Avatar,
    Separator,
    VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "@/store/userProfileStore";
import useAuthStore from "@/store/authStore";
import useShowToast from "@/hooks/useShowToast";
import { storage } from "@/firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import usePostStore from "@/store/postStore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }: { post: any }) => {
    const [open, setOpen] = useState(false);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const decrementPostCount = useUserProfileStore((state) => state.deletePost);
    const authUser = useAuthStore((state) => state.user);
    const [isDeleting, setIsDeleting] = useState(false);
    const showToast = useShowToast();
    const deletePost = usePostStore((state) => state.deletePost);
    const hangleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?"))
            return;
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef);
            const userRef = doc(firestore, "users", authUser.uid);
            await deleteDoc(doc(firestore, "posts", post.id));
            await updateDoc(userRef, {
                posts: arrayRemove(post.id),
            });
            deletePost(post.id);
            decrementPostCount(post.id);
            showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            showToast("Error", "Error deleting post", "error");
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <Dialog.Root
            size={"xl"}
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            placement={"center"}
            motionPreset="slide-in-bottom"
        >
            <Dialog.Trigger asChild>
                <GridItem
                    cursor={"pointer"}
                    borderRadius={4}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"whiteAlpha.300"}
                    position={"relative"}
                    aspectRatio={1 / 1}
                >
                    <Flex
                        opacity={0}
                        _hover={{ opacity: 1 }}
                        position={"absolute"}
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg={"blackAlpha.700"}
                        transition={"all 0.3s ease"}
                        zIndex={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={10}
                    >
                        <Flex alignItems={"center"} gap={1}>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"}>{post.likes.length}</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={1}>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"}>
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                    <Image
                        src={post.imageURL}
                        alt="profile post"
                        w={"100%"}
                        h={"100%"}
                        objectFit={"cover"}
                    />
                </GridItem>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body bg={"black"} pb={5}>
                            <Flex
                                gap={4}
                                w={{ base: "90%", sm: "70%", md: "full" }}
                                mx={"auto"}
                                maxH={"90vh"}
                                maxW={"50vw"}
                            >
                                <Flex
                                    borderRadius={4}
                                    overflow={"hidden"}
                                    border={"1px solid"}
                                    borderColor={"whiteAlpha.300"}
                                    flex={1.5}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <Image
                                        src={post.imageURL}
                                        alt="profile post"
                                    />
                                </Flex>
                                <Flex
                                    flex={1}
                                    direction={"column"}
                                    px={10}
                                    display={{ base: "none", md: "flex" }}
                                    gap={2}
                                >
                                    <Flex
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                    >
                                        <Flex alignItems={"center"} gap={4}>
                                            <Avatar.Root size={"sm"}>
                                                <Avatar.Fallback
                                                    name={userProfile?.fullName}
                                                />
                                                <Avatar.Image
                                                    src={
                                                        userProfile?.profilePicURL
                                                    }
                                                />
                                            </Avatar.Root>
                                            <Flex>
                                                <Text
                                                    fontSize={12}
                                                    fontWeight={"bold"}
                                                >
                                                    {userProfile?.username}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        {authUser?.uid === userProfile?.uid && (
                                            <Button
                                                size={"sm"}
                                                bg={"transparent"}
                                                _hover={{
                                                    bg: "whiteAlpha.300",
                                                    color: "red.300",
                                                }}
                                                borderRadius={4}
                                                p={1}
                                                onClick={hangleDeletePost}
                                                loading={isDeleting}
                                            >
                                                <MdDelete
                                                    size={20}
                                                    cursor={"pointer"}
                                                ></MdDelete>
                                            </Button>
                                        )}
                                    </Flex>
                                    <Separator borderColor="gray.300" />
                                    <VStack
                                        w={"full"}
                                        alignItems={"flex-start"}
                                        gap={4}
                                        overflowY="auto"
                                        maxH="400px"
                                    >
                                        {post.caption && (
                                            <Caption post={post} />
                                        )}
                                        {post.comments.map((comment: any) => (
                                            <Comment
                                                key={comment.id}
                                                comment={comment}
                                            />
                                        ))}
                                    </VStack>
                                    <Separator borderColor="gray.700" />
                                    <PostFooter
                                        post={post}
                                        creatorProfile={userProfile}
                                        isProfilePage={true}
                                    />
                                </Flex>
                            </Flex>
                        </Dialog.Body>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default ProfilePost;
