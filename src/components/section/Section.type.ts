import {ReactNode} from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    className?: string;
    backgroundColor?: string;
}