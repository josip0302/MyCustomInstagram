import { useState } from "react";
import { Input, Button, Alert, Box } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useSignUpWithEmailAndPassword from "@/hooks/useSignUpWithEmailAndPassword";
const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    return (
        <>
            <Input
                placeholder="Email"
                fontSize={14}
                size={"sm"}
                type="email"
                value={inputs.email}
                onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                }
            />
            <Input
                placeholder="Full Name"
                fontSize={14}
                size={"sm"}
                type="text"
                value={inputs.fullname}
                onChange={(e) =>
                    setInputs({ ...inputs, fullname: e.target.value })
                }
            />
            <Input
                placeholder="Username"
                fontSize={14}
                size={"sm"}
                type="text"
                value={inputs.username}
                onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                }
            />
            <Box position="relative" w={"full"}>
                <Input
                    w={"full"}
                    placeholder="Password"
                    fontSize={14}
                    size={"sm"}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                    }
                    pr="4.5rem"
                />
                <Box
                    position="absolute"
                    right="0"
                    top="0"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    pr="2"
                >
                    <Button
                        variant={"ghost"}
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </Button>
                </Box>
            </Box>
            {error && (
                <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Description>{error.message}</Alert.Description>
                    </Alert.Content>
                </Alert.Root>
            )}
            <Button
                w={"full"}
                colorScheme="blue"
                fontSize={14}
                size={"sm"}
                onClick={() => signup(inputs)}
                loading={loading}
            >
                Sign Up
            </Button>
        </>
    );
};

export default SignUp;
