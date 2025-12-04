import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";
import useGetUserProfileById from "@/hooks/useGetUserProfileById";

const FeedPost = ({ post }: { post: any }) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);
    return (
        <>
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box overflow={"hidden"}>
                <Image
                    my={2}
                    borderRadius={4}
                    src={post.imageURL}
                    alt=" FEED Post Image"
                    w={"100vw"}
                    h={"100vh"}
                    objectFit="cover"
                />
            </Box>
            <PostFooter
                post={post}
                isProfilePage={false}
                creatorProfile={userProfile}
            />
        </>
    );
};

export default FeedPost;
