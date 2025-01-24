import { ReactNode } from "react";

interface Props {
  id: string;
  heading: string;
  className?: string;
  children?: ReactNode
}

function HomeSection({ id, heading, className, children }: Props) {
  return (
    <section id={id} className={className}>
      <h1 className="font-bold text-6xl text-neutral-800 mx-2 my-6">
        {heading}
      </h1>
      {children}
    </section>
  );
}

export default HomeSection;