import useAuthStore from "@/store/authStore";
import useUserProfileStore from "@/store/userProfileStore";
import {
    Flex,
    AvatarGroup,
    Avatar,
    VStack,
    Text,
    Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import EditProfile from "./EditProfile";
import useFollowUser from "@/hooks/useFollowUser";

const ProfileHeader = () => {
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const authUser = useAuthStore((state) => state.user);
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
        userProfile?.uid
    );

    const visitingOwnProfile =
        authUser && authUser.username === userProfile?.username;
    const visitingAnotherProfile =
        authUser && authUser.username !== userProfile?.username;

    const { open, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}
        >
            <AvatarGroup
                w={150}
                h={150}
                justifySelf={"center"}
                alignSelf={"flex-start"}
                mx={"auto"}
            >
                <Avatar.Root size={"full"} borderRadius="full">
                    <Avatar.Fallback name={userProfile.fullname} />
                    <Avatar.Image src={userProfile.profilePicURL} />
                </Avatar.Root>
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex
                    fontSize={{ base: "sm", md: "lg" }}
                    gap={4}
                    alignItems={"center"}
                    direction={{ base: "column", sm: "row" }}
                    w={"full"}
                >
                    <Text fontSize={{ base: "sm", md: "lg" }}>
                        {userProfile.username}
                    </Text>
                    {visitingOwnProfile && (
                        <Flex
                            gap={4}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Button
                                bg={"white"}
                                color={"black"}
                                _hover={{ bg: "whiteAlpha.900" }}
                                size={{ base: "xs", md: "sm" }}
                                onClick={onOpen}
                            >
                                Edit Pofile
                            </Button>
                        </Flex>
                    )}
                    {visitingAnotherProfile && (
                        <Flex
                            gap={4}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Button
                                bg={"blue.500"}
                                color={"white"}
                                _hover={{ bg: "blue.600" }}
                                size={{ base: "xs", md: "sm" }}
                                onClick={handleFollowUser}
                                loading={isUpdating}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </Flex>
                    )}
                </Flex>
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                            {userProfile.posts.length}
                        </Text>{" "}
                        posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                            {" "}
                            {userProfile.followers.length}
                        </Text>{" "}
                        followers
                    </Text>

                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                            {" "}
                            {userProfile.following.length}
                        </Text>{" "}
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {userProfile.fullname}
                    </Text>
                </Flex>
                <Text fontSize={"sm"}>{userProfile.bio}</Text>
            </VStack>
            <EditProfile isOpen={open} onClose={onClose} />
        </Flex>
    );
};

export default ProfileHeader;
