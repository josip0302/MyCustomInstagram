import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Portal,
    Input,
    Field,
    Flex,
} from "@chakra-ui/react";

import { Tooltip } from "@/components/ui/tooltip";
import { SearchLogo } from "@/assets/constants";
import useSearchUser from "@/hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
const Search = () => {
    const { isLoading, getUserProfile, user, setUser } = useSearchUser();
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearchUser = (e: React.FormEvent) => {
        e.preventDefault();
        getUserProfile(searchRef.current?.value || "");
    };
    console.log("Searched User:", user);
    return (
        <Dialog.Root motionPreset="slide-in-left">
            <Dialog.Trigger asChild>
                <Box>
                    <Tooltip
                        content={"search"}
                        positioning={{ placement: "right" }}
                        showArrow
                        openDelay={500}
                    >
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
                            <SearchLogo />
                            <Box
                                display={{
                                    base: "none",
                                    md: "block",
                                }}
                                ml={2}
                            >
                                Search
                            </Box>
                        </Box>
                    </Tooltip>
                </Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={"black"}
                        border={"1px solid gray"}
                        maxW={"400px"}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Box mb={4} fontWeight="bold">
                                <form onSubmit={handleSearchUser}>
                                    <Field.Root>
                                        <Field.Label>Search Users</Field.Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter username or name..."
                                            ref={searchRef}
                                        />
                                    </Field.Root>
                                    <Flex mt={4} justifyContent="flex-end">
                                        <Button
                                            type="submit"
                                            ml={"auto"}
                                            size={"sm"}
                                            loading={isLoading}
                                        >
                                            Search
                                        </Button>
                                    </Flex>
                                </form>
                                {user && (
                                    <SuggestedUser
                                        user={user}
                                        setUser={setUser}
                                    />
                                )}
                            </Box>
                        </Dialog.Body>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default Search;
