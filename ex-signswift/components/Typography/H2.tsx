import React, { ReactNode } from "react";

const H2 = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-3xl font-medium focus-visible:ring-ring ring-offset-background rounded-md  leading-5 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 text-foreground dark:text-muted-foreground">
      {children}
    </h2>
  );
};

export default H2;
