'use client'

import classNames from "classnames";

interface SectionTitleProps {
  subTitle?: string;
  className?: string;
  description?: string;
  align?: any;
  spaceBottom?: string;
  showSubTitle?: boolean;
  children?: React.ReactNode;
  hideDecoration?: boolean;
}
export default function SectionTitle({
  subTitle,
  className,
  description,
  align,
  spaceBottom,
  showSubTitle,
  children,
  hideDecoration,
}: SectionTitleProps) {
  return (
    <div
      className={`section-title -style1 ${classNames(className)}`}
      style={{ textAlign: align, marginBottom: spaceBottom || "3.125rem" }}
    >
      {showSubTitle && <h5>{subTitle}</h5>}
      <h2>{children}</h2>
      {description && <p>{description}</p>}
      {!hideDecoration && (
        <img
          src="/images/introduction/IntroductionOne/content-deco.png"
          alt="decoration"
        />
      )}
    </div>
  );
}
