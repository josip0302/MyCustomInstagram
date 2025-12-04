import useFollowUser from "@/hooks/useFollowUser";
import useAuthStore from "@/store/authStore";
import { Button, Flex, Avatar, VStack, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const SuggestedUser = ({
    user,
    setUser,
}: {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
        user.uid
    );
    const authUser = useAuthStore((state) => state.user);
    const onFollowUser = async () => {
        await handleFollowUser();
        setUser({
            ...user,
            followers: isFollowing
                ? user.followers.filter((uid: string) => uid !== authUser.uid)
                : [...user.followers, authUser.uid],
        });
    };

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={4}>
                <RouterLink to={"/" + user?.username}>
                    <Avatar.Root size={"sm"}>
                        <Avatar.Fallback name="profile pic" />
                        <Avatar.Image src={user.profilePicURL} />
                    </Avatar.Root>
                </RouterLink>
                <VStack gap={2} alignItems={"flex-start"}>
                    <RouterLink to={"/" + user?.username}>
                        <Box fontSize={12} fontWeight={"bold"}>
                            {user.fullname}
                        </Box>
                    </RouterLink>
                    <Box fontSize={11} color={"gray.500"}>
                        {user?.followers?.length || 0} followers
                    </Box>
                </VStack>
            </Flex>
            {authUser.uid !== user.uid && (
                <Button
                    fontSize={13}
                    bg={"transparent"}
                    fontWeight={"medium"}
                    color={"blue.400"}
                    cursor={"pointer"}
                    _hover={{ color: "white" }}
                    onClick={onFollowUser}
                    loading={isUpdating}
                    p={0}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>
    );
};

export default SuggestedUser;
