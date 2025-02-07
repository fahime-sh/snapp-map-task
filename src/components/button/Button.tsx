import React from "react";
import clsx from "clsx";
import {ButtonProps , ButtonVariant , ButtonSize} from "@/components/button/Button.type";



const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = "primary",
                                           size = "md",
                                           loading = false,
                                           className,
                                           disabled,
                                           ...props
                                       }) => {
    return (
        <button
            className={clsx(
                "rounded-lg font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
                {
                    "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400": variant === "primary",
                    "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400": variant === "secondary",
                    "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400": variant === "danger",
                    "border border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700 focus:ring-gray-400":
                        variant === "outline",
                    "px-3 py-1 text-sm": size === "sm",
                    "px-4 py-2 text-base": size === "md",
                    "px-5 py-3 text-lg": size === "lg",
                    "opacity-50 cursor-not-allowed": disabled || loading,
                },
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;
