import { toaster } from "@/components/ui/toaster";
import { useCallback } from "react";
type ToastStatus = "success" | "error" | "warning" | "info" | "loading";

const useShowToast = () => {
    const showToast = useCallback(
        (title: string, description: string, status: ToastStatus) => {
            return toaster.create({
                title: title,
                description: description,
                type: status,
            });
        },
        [toaster]
    );

    return showToast;
};

export default useShowToast;
