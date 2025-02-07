import React from "react";
// import styles from "./Footer.module.scss";
import Container from "@/components/container/Container";
import {FooterProps} from "@/components/footer/Footer.type";


const Footer: React.FC<FooterProps> = ({ ...rest }) => {
    return (
        <footer className={""} {...rest}>
            <Container>
                <p>
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
