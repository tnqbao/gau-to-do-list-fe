import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "default" | "icon";
    variant?: "default" | "outline";
}

export function Button({
                           children,
                           className = "",
                           size = "default",
                           variant = "default",
                           ...props
                       }: ButtonProps) {
    const baseStyles = "rounded-md transition font-medium";
    const sizeStyles = size === "icon" ? "h-10 w-10 flex items-center justify-center p-0" : "px-4 py-2";
    const variantStyles = variant === "outline"
        ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
        : "bg-blue-500 text-white hover:bg-blue-600";

    return (
        <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
}
