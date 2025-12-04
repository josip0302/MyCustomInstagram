import { Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { Tooltip } from "@/components/ui/tooltip";
import { NotificationsLogo } from "@/assets/constants";

const Notifications = () => {
    return (
        <Box>
            <Tooltip
                content={"notifications"}
                positioning={{ placement: "right" }}
                showArrow
                openDelay={500}
            >
                <RouterLink to="/notifications">
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
                        <NotificationsLogo />
                        <Box
                            display={{
                                base: "none",
                                md: "block",
                            }}
                            ml={2}
                        >
                            Notifications
                        </Box>
                    </Box>
                </RouterLink>
            </Tooltip>
        </Box>
    );
};

export default Notifications;
