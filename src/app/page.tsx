"use client";

import dynamic from "next/dynamic";
import Layout from '../components/layout/Layout';
import Section from '../components/section/Section';
import Container from '../components/container/Container';

const Map = dynamic(
    () => import("@/components/map/Map").then((component) => component.default),
    { ssr: false }
);

export default function Home() {

    return (
        <Layout>
            <Section>
                <Container>
                    <Map />
                </Container>
            </Section>
        </Layout>
    );
}