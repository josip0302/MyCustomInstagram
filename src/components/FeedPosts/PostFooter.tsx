import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";
import usePostComment from "@/hooks/usePostComment";
import useAuthStore from "@/store/authStore";
import {
    Flex,
    Box,
    Text,
    Input,
    InputGroup,
    Button,
    Dialog,
    Portal,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import useLikePost from "@/hooks/useLikePost";
import { timeAgo } from "@/utils/timeAgo";
import Comment from "../Comment/Comment";

const PostFooter = ({
    post,
    isProfilePage,
    creatorProfile,
}: {
    post: any;
    isProfilePage: boolean;
    creatorProfile: any;
}) => {
    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState("");
    const authUser = useAuthStore((state) => state.user);
    const inputRef = useRef<HTMLInputElement>(null);
    const commentsContainerRef = useRef<HTMLDivElement>(null);
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment("");
    };

    const { isLiked, likes, handleLikePost } = useLikePost(post);
    return (
        <Box mb={4} mt={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={3} mt={4}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                    {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
                </Box>
                <Box
                    cursor={"pointer"}
                    fontSize={18}
                    onClick={() => inputRef.current?.focus()}
                >
                    <CommentLogo />
                </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2} mb={2}>
                <Text>{likes} likes</Text>
                {!isProfilePage && (
                    <Text fontSize={12} color={"gray"}>
                        {timeAgo(post.createdAt)}
                    </Text>
                )}
            </Flex>
            {!isProfilePage && (
                <>
                    <Text fontSize={"sm"} fontWeight={700}>
                        {" "}
                        {creatorProfile?.username}{" "}
                        <Text as={"span"} fontWeight={400}>
                            {" "}
                            {post.caption}
                        </Text>
                    </Text>
                    {post.comments.length > 0 && (
                        <Dialog.Root motionPreset="slide-in-left">
                            <Dialog.Trigger>
                                {" "}
                                <Text
                                    fontSize={"sm"}
                                    color={"gray"}
                                    cursor={"pointer"}
                                >
                                    {" "}
                                    View all {post.comments.length} comments
                                </Text>{" "}
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.CloseTrigger></Dialog.CloseTrigger>
                                        <Dialog.Header>
                                            <Dialog.Title>
                                                Comments
                                            </Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body pb={6}>
                                            <Flex
                                                mb={4}
                                                gap={4}
                                                flexDir={"column"}
                                                maxH={"250px"}
                                                overflowY={"auto"}
                                                ref={commentsContainerRef}
                                            >
                                                {post.comments.map(
                                                    (
                                                        comment: any,
                                                        idx: number
                                                    ) => (
                                                        <Comment
                                                            key={idx}
                                                            comment={comment}
                                                        />
                                                    )
                                                )}
                                            </Flex>
                                            <InputGroup
                                                mt={1}
                                                w={"full"}
                                                border={"none"}
                                                padding={0}
                                                mb={3}
                                                fontSize={14}
                                                endElement={
                                                    <Button
                                                        fontSize={14}
                                                        color={"blue.500"}
                                                        bg={"transparent"}
                                                        cursor={"pointer"}
                                                        _hover={{
                                                            color: "white",
                                                        }}
                                                        loading={isCommenting}
                                                        onClick={
                                                            handleSubmitComment
                                                        }
                                                    >
                                                        Post
                                                    </Button>
                                                }
                                            >
                                                <Input
                                                    ref={inputRef}
                                                    placeholder="Add a comment..."
                                                    variant={"flushed"}
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </InputGroup>
                                        </Dialog.Body>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    )}
                </>
            )}
            <Flex alignItems={"center"} gap={2}></Flex>
            {authUser && (
                <InputGroup
                    mt={1}
                    w={"full"}
                    border={"none"}
                    padding={0}
                    mb={3}
                    fontSize={14}
                    endElement={
                        <Button
                            fontSize={14}
                            color={"blue.500"}
                            bg={"transparent"}
                            cursor={"pointer"}
                            _hover={{ color: "white" }}
                            loading={isCommenting}
                            onClick={handleSubmitComment}
                        >
                            Post
                        </Button>
                    }
                >
                    <Input
                        ref={inputRef}
                        placeholder="Add a comment..."
                        variant={"flushed"}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </InputGroup>
            )}
        </Box>
    );
};

export default PostFooter;
