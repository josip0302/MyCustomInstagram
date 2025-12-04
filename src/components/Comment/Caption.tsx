import { Flex, Avatar, Text, Link } from "@chakra-ui/react";
import { timeAgo } from "@/utils/timeAgo";
import useUserProfileStore from "@/store/userProfileStore";

const Caption = ({ post }: { post: any }) => {
    const userProfile = useUserProfileStore((state) => state.userProfile);
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
                    <Text fontSize={14}>{post.caption}</Text>
                </Flex>
                <Text fontSize={14} color={"gray"}>
                    {timeAgo(new Date(post.createdAt).getTime())}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Caption;
