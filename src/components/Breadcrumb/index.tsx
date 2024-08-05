import React from "react";

interface BreadcrumbItemProps {
  name: string;
  current?: boolean;
}

export const BreadcrumbItem = ({ name, current }: BreadcrumbItemProps) => {
  const className = current ? "active" : "";
  return <li className={className}>{name}</li>;
};

interface BreadcrumbProps {
  title: string;
  children: React.ReactNode;
}
export const Breadcrumb = ({ title, children }: BreadcrumbProps) => {
  return (
    <div className="breadcrumb">
      <div className="container">
        <h2>{title}</h2>
        <ul>{children}</ul>
      </div>
    </div>
  );
};
