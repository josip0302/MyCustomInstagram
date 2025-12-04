import { Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { Tooltip } from "@/components/ui/tooltip";
const Home = () => {
    return (
        <Box>
            <Tooltip
                content={"home"}
                positioning={{ placement: "right" }}
                showArrow
                openDelay={500}
            >
                <RouterLink to="/">
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
                        <AiFillHome size={25} />
                        <Box
                            display={{
                                base: "none",
                                md: "block",
                            }}
                            ml={2}
                        >
                            Home
                        </Box>
                    </Box>
                </RouterLink>
            </Tooltip>
        </Box>
    );
};

export default Home;
