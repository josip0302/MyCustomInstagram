import { Grid, VStack, Skeleton, Box, Flex, Text } from "@chakra-ui/react";

import ProfilePost from "@/components/Profile/ProfilePost";
import useGetPosts from "@/hooks/useGetPosts";
const ProfilePosts = () => {
    const { isLoading, posts } = useGetPosts();
    if (!isLoading && posts.length === 0) {
        return <NoPostsFound />;
    }

    return (
        <Grid
            templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
            gap={1}
            columnGap={1}
        >
            {isLoading &&
                [1, 2, 3].map((_, index) => (
                    <>
                        <VStack key={index} alignItems={"flex-start"} gap={4}>
                            <Skeleton w={"full"}>
                                <Box h="400px"></Box>
                            </Skeleton>
                        </VStack>
                    </>
                ))}
            {!isLoading && (
                <>
                    {posts.map((post) => (
                        <ProfilePost key={post.id} post={post} />
                    ))}
                </>
            )}
        </Grid>
    );
};

export default ProfilePosts;

const NoPostsFound = () => {
    return (
        <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10}>
            <Text fontSize={"2xl"}>No posts found</Text>
        </Flex>
    );
};
