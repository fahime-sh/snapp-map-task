import React from "react";
import Link from "next/link";
// import { FaGithub } from "react-icons/fa";
import Container from "@/components/container/Container";
// import styles from "./Header.module.scss";

const Header: React.FC = () => {
    return (
        <header>
            <Container>
                <h1>SnappSop map</h1>
            </Container>
        </header>
    );
};

export default Header;
