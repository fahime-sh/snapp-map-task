import React, {ReactNode} from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}