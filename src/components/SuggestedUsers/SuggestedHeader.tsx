import { Flex, Avatar, Button, Link } from "@chakra-ui/react";
import useLogout from "@/hooks/useLogout";
import useAuthStore from "@/store/authStore";

const SuggestedHeader = () => {
    const { handleLogout, isLoggingOut } = useLogout();
    const authUser = useAuthStore((state) => state.user);
    if (!authUser) return null;
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} fontWeight={"bold"} gap={2}>
                <Link href={" /" + authUser?.username} cursor={"pointer"}>
                    <Avatar.Root size={"sm"}>
                        <Avatar.Fallback name={authUser?.fullname} />
                        <Avatar.Image src={authUser?.profilePicURL} />
                    </Avatar.Root>

                    <Flex
                        ml={2}
                        alignItems={"center"}
                        fontSize={12}
                        fontWeight={"bold"}
                        gap={2}
                    >
                        {authUser?.username}
                    </Flex>
                </Link>
            </Flex>
            <Button
                onClick={handleLogout}
                background={"transparent"}
                _hover={{ background: "transparent", color: "white" }}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.500"}
                cursor={"pointer"}
                loading={isLoggingOut}
            >
                Log out
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;
