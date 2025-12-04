import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

import LogIn from "./Login";
import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
    const [logIn, setIsLogIn] = useState(true);

    return (
        <>
            <Box border={"1px solid gray"} padding={5} borderRadius={4}>
                <VStack gap={4}>
                    <Image
                        src="/logo.png"
                        h={24}
                        cursor={"pointer"}
                        alt="Ig logo"
                    />

                    {logIn ? <LogIn /> : <SignUp />}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        my={4}
                        gap={1}
                        w={"full"}
                    >
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>
                    <GoogleAuth prefix={logIn ? "Log in" : "Sign up"} />
                </VStack>
            </Box>
            <Box border={"1px solid gray"} padding={5} borderRadius={4}>
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Box mx={2} fontSize={14}>
                        {logIn
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </Box>
                    <Box
                        onClick={() => setIsLogIn(!logIn)}
                        color={"blue.400"}
                        cursor="pointer"
                        fontSize={14}
                    >
                        {logIn ? "Sign Up" : "Log In"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;
