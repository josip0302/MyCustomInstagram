import { Container, Flex, VStack } from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";
import AuthForm from "@/components/AuthForm/AuthForm";
const AuthPage = () => {
    return (
        <Flex minH={"100vh"} alignItems="center" justifyContent="center" px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex gap={10} justifyContent={"center"} alignItems={"center"}>
                    {/* Left hand side */}
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="/auth.png" alt="Phone img" h={650} />
                    </Box>
                    {/* Right hand side */}
                    <VStack gap={4} align={"stretch"}>
                        <AuthForm />
                        <Box textAlign={"center"}>Get the app</Box>
                        <Flex justify={"center"} gap={5}>
                            <Image
                                src="/playstore.png"
                                alt="Play Store"
                                h={10}
                            />{" "}
                            <Image
                                src="/microsoft.png"
                                alt="Microsoft logo"
                                h={10}
                            />
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;
