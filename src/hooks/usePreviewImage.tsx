import React from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
    const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
    const showToast = useShowToast();
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSize) {
                showToast("Error", "File size exceeds 2MB limit.", "error");
                setSelectedFile(null);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            showToast("Error", "Please select a valid image file.", "error");
            setSelectedFile(null);
        }
    };

    return {
        selectedFile,
        handleFileChange,
        setSelectedFile,
    };
};

export default usePreviewImage;
