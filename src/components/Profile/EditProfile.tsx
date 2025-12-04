import useAuthStore from "@/store/authStore";
import {
    Avatar,
    Button,
    Center,
    Flex,
    Field,
    Input,
    Dialog,
    Stack,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import usePreviewImage from "@/hooks/usePreviewImage";
import useEditProfile from "@/hooks/useEditProfile";
import useShowToast from "@/hooks/useShowToast";

const EditProfile = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const showToast = useShowToast();
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        bio: "",
    });
    const authUser = useAuthStore((state) => state.user);
    const imageRef = useRef<HTMLInputElement>(null);
    const { selectedFile, handleFileChange, setSelectedFile } =
        usePreviewImage();
    const { editProfile, isUpdating } = useEditProfile();

    useEffect(() => {
        if (authUser) {
            console.log("Auth User:", authUser);
            setInputs({
                fullName: authUser.fullname || "",
                username: authUser.username || "",
                bio: authUser.bio || "",
            });
        }
    }, []);

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile || "");
            setSelectedFile(null);
            onClose();
        } catch (err: any) {
            showToast(
                "Error",
                "Error updating profile: " + err.message,
                "error"
            );
        }
    };

    return (
        <>
            <Dialog.Root
                open={isOpen}
                onOpenChange={(e) => !e.open && onClose()}
            >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={"black"}
                        boxShadow={"xl"}
                        border={"1px solid gray"}
                        mx={3}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Edit Profile</Dialog.Title>
                            <Dialog.CloseTrigger />
                        </Dialog.Header>

                        <Dialog.Body>
                            {/* Container Flex */}
                            <Flex bg={"black"}>
                                <Stack
                                    gap={4}
                                    w={"full"}
                                    maxW={"md"}
                                    bg={"black"}
                                    p={6}
                                    my={0}
                                >
                                    <Field.Root>
                                        <Stack
                                            direction={["column", "row"]}
                                            gap={6}
                                        >
                                            {" "}
                                            <Center w="2/3">
                                                <Avatar.Root
                                                    size={"full"}
                                                    borderRadius={"full"}
                                                >
                                                    <Avatar.Fallback />
                                                    <Avatar.Image
                                                        src={
                                                            selectedFile ||
                                                            authUser.profilePicURL
                                                        }
                                                    />
                                                </Avatar.Root>
                                            </Center>
                                            <Center w="1/3">
                                                <Button
                                                    w="full"
                                                    onClick={() =>
                                                        imageRef.current?.click()
                                                    }
                                                >
                                                    Edit Profile Picture
                                                </Button>
                                                <Input
                                                    type="file"
                                                    hidden
                                                    ref={imageRef}
                                                    onChange={handleFileChange}
                                                />
                                            </Center>
                                        </Stack>
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label fontSize={"sm"}>
                                            Full Name
                                        </Field.Label>
                                        <Input
                                            placeholder={"Full Name"}
                                            size={"sm"}
                                            type={"text"}
                                            value={inputs.fullName}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    fullName: e.target.value,
                                                })
                                            }
                                        />
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label fontSize={"sm"}>
                                            Username
                                        </Field.Label>
                                        <Input
                                            placeholder={"Username"}
                                            size={"sm"}
                                            type={"text"}
                                            value={inputs.username}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label fontSize={"sm"}>
                                            Bio
                                        </Field.Label>
                                        <Input
                                            placeholder={"Bio"}
                                            size={"sm"}
                                            type={"text"}
                                            value={inputs.bio}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    bio: e.target.value,
                                                })
                                            }
                                        />
                                    </Field.Root>

                                    <Flex
                                        gap={10}
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Button
                                            bg={"red.400"}
                                            color={"white"}
                                            size="sm"
                                            px={16}
                                            _hover={{ bg: "red.500" }}
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            bg={"blue.400"}
                                            color={"white"}
                                            size="sm"
                                            px={16}
                                            _hover={{ bg: "blue.500" }}
                                            onClick={handleEditProfile}
                                            loading={isUpdating}
                                        >
                                            Submit
                                        </Button>
                                    </Flex>
                                </Stack>
                            </Flex>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    );
};

export default EditProfile;
