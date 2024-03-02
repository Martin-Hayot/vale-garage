import { AlertTriangleIcon } from "lucide-react";

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="dark:bg-destructive/30 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive dark:text-red-600">
            <AlertTriangleIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};
