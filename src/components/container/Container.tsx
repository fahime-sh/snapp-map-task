import React, { ReactNode } from "react";
import {ContainerProps} from "@/components/container/Container.type";



const Container: React.FC<ContainerProps> = ({ children, className, ...rest }) => {
    return (
        <div
            className='flex justify-center p-4'
            {...rest}>
            {children}
        </div>
    );
};

export default Container;
