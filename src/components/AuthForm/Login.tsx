import { useState } from "react";
import { Input, Button, Alert } from "@chakra-ui/react";
import useLogin from "@/hooks/useLogin";
const Login = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const { loading, error, login } = useLogin();
    return (
        <>
            {" "}
            <Input
                placeholder="Email"
                fontSize={14}
                type="email"
                size={"sm"}
                value={inputs.email}
                onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                }
            />
            <Input
                placeholder="Password"
                fontSize={14}
                type="password"
                size={"sm"}
                value={inputs.password}
                onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                }
            />
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
                onClick={() => login(inputs)}
                loading={loading}
            >
                Log In
            </Button>
        </>
    );
};

export default Login;
