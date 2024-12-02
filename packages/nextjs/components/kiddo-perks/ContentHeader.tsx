import { ReactNode } from "react";

type ContentHeaderProps = {
  title: string;
  subtitle: ReactNode;
};

export const ContentHeader = ({ title, subtitle }: ContentHeaderProps) => {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <p className="">{subtitle}</p>
    </header>
  );
};
