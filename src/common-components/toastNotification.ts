import { toast } from "react-toastify";

const showToast = (message: string, type: "success" | "error" | "info" | "warning", title?: string) => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "info":
            toast.info(message);
            break;
        case "warning":
            toast.warning(message);
            break;
        default:
            toast(message);
    }
};

export default showToast;
