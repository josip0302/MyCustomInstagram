import { Box, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";
import useAuthStore from "@/store/authStore";

const Profile = () => {
    const authUser = useAuthStore((state) => state.user);
    return (
        <Box>
            <Tooltip
                content={"profile"}
                positioning={{ placement: "right" }}
                showArrow
                openDelay={500}
            >
                <RouterLink to={"/" + authUser?.username}>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        _hover={{ bg: "whiteAlpha.400" }}
                        w={{ base: 10, md: "full" }}
                        p={2}
                        borderRadius={6}
                        justifyContent={{
                            base: "center",
                            md: "flex-start",
                        }}
                    >
                        {" "}
                        <Avatar.Root size={"xs"}>
                            <Avatar.Fallback name={authUser?.username} />
                            <Avatar.Image src={authUser?.profilePicURL} />
                        </Avatar.Root>
                        <Box
                            display={{
                                base: "none",
                                md: "block",
                            }}
                            ml={2}
                        >
                            Profile
                        </Box>
                    </Box>
                </RouterLink>
            </Tooltip>
        </Box>
    );
};

export default Profile;
