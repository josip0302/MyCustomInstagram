import {
    Avatar,
    Box,
    Button,
    Flex,
    Link,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import { timeAgo } from "@/utils/timeAgo";
import useFollowUser from "@/hooks/useFollowUser";
const PostHeader = ({
    post,
    creatorProfile,
}: {
    post: any;
    creatorProfile: any;
}) => {
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
        post.createdBy
    );
    return (
        <Flex
            justifyContent={"space-between"}
            w={"full"}
            alignItems={"center"}
            my={2}
        >
            <Flex alignItems={"center"} fontWeight={"bold"} gap={2}>
                {creatorProfile ? (
                    <Link href={`/${creatorProfile?.username}`}>
                        <Avatar.Root size={"sm"}>
                            <Avatar.Fallback name={creatorProfile?.fullname} />
                            <Avatar.Image
                                src={creatorProfile?.profilePictureURL}
                            />
                        </Avatar.Root>
                    </Link>
                ) : (
                    <SkeletonCircle size="10" />
                )}

                <Flex
                    ml={2}
                    alignItems={"center"}
                    fontSize={12}
                    fontWeight={"bold"}
                    gap={2}
                >
                    {creatorProfile ? (
                        <Link href={`/${creatorProfile?.username}`}>
                            {creatorProfile?.username}
                        </Link>
                    ) : (
                        <Skeleton height={"10px"} width={"100px"} />
                    )}
                    <Box color={"gray.500"}>• {timeAgo(post.createdAt)}</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"blue.500"}
                    _hover={{ color: "white" }}
                    onClick={handleFollowUser}
                    loading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex>
    );
};

export default PostHeader;
