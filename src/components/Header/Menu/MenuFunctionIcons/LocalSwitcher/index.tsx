import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.name;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <div className="lang-menu">
      <button className="selected-lang"></button>
      <ul>
        <li>
          <button
            className="en"
            name="en"
            onClick={(e) => onSelectChange(e)}
          ></button>
        </li>
        <li>
          <button
            className="ar"
            name="ar"
            onClick={(e) => onSelectChange(e)}
          ></button>
        </li>
      </ul>
    </div>
  );
}
