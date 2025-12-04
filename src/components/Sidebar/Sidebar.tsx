import { Box, Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "@/assets/constants";

import { Tooltip } from "@/components/ui/tooltip";
import { BiLogOut } from "react-icons/bi";
import useLogout from "@/hooks/useLogout";
import SidebarItems from "./SidebarItems";
const Sidebar = () => {
    const { handleLogout, isLoggingOut } = useLogout();

    return (
        <Box
            height={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={{ base: 2, md: 3 }}
        >
            <Flex direction={"column"} gap={10} w="full" height={"full"}>
                <RouterLink
                    to="/"
                    style={{
                        paddingLeft: "8px",
                        display: window.innerWidth < 768 ? "none" : "block",
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                >
                    <InstagramLogo />
                </RouterLink>
                <RouterLink
                    to="/"
                    style={{
                        paddingLeft: "8px",
                        display: window.innerWidth >= 768 ? "none" : "block",
                        borderRadius: "6px",
                        cursor: "pointer",
                        textDecoration: "none",
                        width: "40px",
                    }}
                >
                    <InstagramMobileLogo />
                </RouterLink>

                <Flex direction={"column"} gap={5}>
                    <SidebarItems />
                </Flex>
                <Box mt={"auto"}>
                    <Tooltip
                        content={"Logout"}
                        positioning={{ placement: "right" }}
                        showArrow
                        openDelay={500}
                    >
                        <Flex
                            onClick={handleLogout}
                            display={"flex"}
                            alignItems={"center"}
                            _hover={{ bg: "whiteAlpha.400" }}
                            w={{ base: 10, md: "full" }}
                            p={2}
                            borderRadius={6}
                            mt={"auto"}
                            justifyContent={{
                                base: "center",
                                md: "flex-start",
                            }}
                        >
                            <BiLogOut size={25} />
                            <Button
                                display={{ base: "none", md: "block" }}
                                ml={2}
                                variant={"ghost"}
                                _hover={{ bg: "transparent" }}
                                loading={isLoggingOut}
                            >
                                Logout
                            </Button>
                        </Flex>
                    </Tooltip>
                </Box>
            </Flex>
        </Box>
    );
};

export default Sidebar;
