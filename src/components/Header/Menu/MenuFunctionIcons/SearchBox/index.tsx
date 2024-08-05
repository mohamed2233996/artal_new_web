import React, { useRef } from "react";
// @ts-expect-error non-typesafe-supported
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";

import outsideClickHandle from "@/shared/handleClickOutside";

interface SearchBoxProps {
  showSearch: boolean;
  setShowSearch: (val: boolean) => void;
}

export default function SearchBox({
  showSearch,
  setShowSearch,
}: SearchBoxProps) {
  // hooks
  const { register, handleSubmit } = useForm();
  const wrapperRef = useRef(null);
  outsideClickHandle(wrapperRef, () => {
    setShowSearch(false);
  });

  // handler
  function onSubmit() {}
  return (
    <CSSTransition
      in={showSearch}
      unmountOnExit
      timeout={200}
      classNames="search-box"
    >
      <div ref={wrapperRef} className="search-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="What are you looking for?"
            {...register("search")}
          />
          <button>
            <img src="/images/header/search-icon.png" alt="Search icon" />
          </button>
        </form>
      </div>
    </CSSTransition>
  );
}
