import type { ReactNode } from "react";

interface PageProps {
  title: string;
  children: ReactNode;
}

function Page({ title, children }: PageProps) {
  return (
    <div className="wrapper only:mt-8">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Page;
