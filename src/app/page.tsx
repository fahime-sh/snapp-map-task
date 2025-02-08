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
    const DEFAULT_CENTER: [number, number] = [35.6892, 51.3890];
    const DEFAULT_WIDTH = 600;
    const DEFAULT_HEIGHT = 600;

    return (
        <Layout>
            <Section>
                <Container>
                    <Map width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} defaultCenter={DEFAULT_CENTER} />
                </Container>
            </Section>
        </Layout>
    );
}