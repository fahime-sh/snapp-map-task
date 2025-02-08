import React from "react";
import {LayoutProps} from "@/components/layout/Layout.type";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";



const Layout: React.FC<LayoutProps> = ({ children, className, ...rest }) => {
    return (
        <div className='bg-gray-500 h-full' {...rest}>
             <Header />
            <main>{children}</main>
             <Footer />
        </div>
    );
};

export default Layout;
