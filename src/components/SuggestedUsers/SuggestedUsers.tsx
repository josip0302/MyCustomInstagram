import { Flex, VStack, Text, Box, Link } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import SuggestedHeader from "./SuggestedHeader";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();
    if (isLoading) {
        return <Box>Loading suggestions...</Box>;
    }
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />
            {suggestedUsers.length !== 0 && (
                <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"full"}
                >
                    <Text fontSize={12} color={"gray.500"} fontWeight={"bold"}>
                        Suggested for you
                    </Text>
                    <Text
                        fontSize={12}
                        color={"blue.500"}
                        cursor={"pointer"}
                        p={1}
                    >
                        See All
                    </Text>
                </Flex>
            )}
            {suggestedUsers.map((user) => (
                <SuggestedUser key={user.uid} user={user} setUser={() => {}} />
            ))}

            <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
                © 2025 Built by{" "}
                <Link
                    href="https://github.com/josip0302"
                    target="_blank"
                    color="blue.500"
                    fontSize={14}
                    as={"span"}
                >
                    Josip Došen
                </Link>
            </Box>
        </VStack>
    );
};

export default SuggestedUsers;
