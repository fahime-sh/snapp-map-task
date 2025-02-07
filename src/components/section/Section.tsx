import { forwardRef, ReactNode } from 'react';
import {SectionProps} from "@/components/section/Section.type";



const Section = forwardRef<HTMLElement, SectionProps>(
    ({ children, className, backgroundColor, ...rest }, ref) => {

        return (
            <section ref={ref} className="" data-background-color={backgroundColor} {...rest}>
                {children}
            </section>
        );
    }
);

export default Section;
