import {
    Flex,
    Avatar,
    Text,
    SkeletonCircle,
    Skeleton,
    Link,
} from "@chakra-ui/react";
import useGetUserProfileById from "@/hooks/useGetUserProfileById";
import { timeAgo } from "@/utils/timeAgo";

const Comment = ({ comment }: { comment: any }) => {
    const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
    if (isLoading) {
        return <CommentSkeleton />;
    }
    return (
        <Flex gap={4}>
            <Link href={`/${userProfile.username}`}>
                <Avatar.Root size={"sm"}>
                    <Avatar.Fallback name={userProfile.fullName} />

                    <Avatar.Image src={userProfile.profilePicURL} />
                </Avatar.Root>
            </Link>
            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link href={`/${userProfile.username}`}>
                        <Text fontSize={12} fontWeight={"bold"}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{comment.comment}</Text>
                </Flex>
                <Text fontSize={14} color={"gray"}>
                    {timeAgo(new Date(comment.createdAt).getTime())}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Comment;

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w="10" />
            <Flex gap={1} flexDir={"column"}>
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>
        </Flex>
    );
};
