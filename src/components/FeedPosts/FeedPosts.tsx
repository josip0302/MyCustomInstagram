import {
    Container,
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Text,
} from "@chakra-ui/react";
import FeedPost from "@/components/FeedPosts/FeedPost";
import useGetFeedPosts from "@/hooks/useGetFeedPosts";

const FeedPosts = () => {
    const { posts, isLoading } = useGetFeedPosts();

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {isLoading &&
                [1, 2, 3].map((_, index) => (
                    <>
                        {" "}
                        <Stack gap="6" width="full" my={5} key={index}>
                            <HStack width="full">
                                <SkeletonCircle size="10" />
                                <SkeletonText noOfLines={2} />
                            </HStack>
                            <Skeleton height={"700px"} />
                        </Stack>
                    </>
                ))}
            {!isLoading && (
                <>
                    {posts.map((post: any) => (
                        <FeedPost key={post.id} post={post} />
                    ))}
                </>
            )}
            {!isLoading && posts.length === 0 && (
                <>
                    <Text fontSize={"md"} color={"red.400"}>
                        No posts available.
                    </Text>
                    <Text fontSize={"md"} color={"red.400"}>
                        Follow someone to seee posts in your feed.
                    </Text>
                </>
            )}
        </Container>
    );
};

export default FeedPosts;
