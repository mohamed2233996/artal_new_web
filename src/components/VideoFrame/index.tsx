import { useState } from "react";
import classNames from "classnames";

import LinkingButton from "../Button";
import Modal from "../Modal";

export default function VideoFrame(props: any) {
  const [showModal, setShowModal] = useState(false);
  let { poster, height, width, src, className } = props;
  return (
    <>
      <div
        className={`video-frame ${classNames(className)}`}
        style={{ height: height, width: width ? width : (height * 16) / 9 }}
      >
        <div className="video-frame__poster">
          <img src={poster} alt="Video poster" />
        </div>
        <LinkingButton
          to="/"
          color="white"
          height="50px"
          width="50px"
          className="-round"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          content={<i className="fas fa-play"></i>}
        ></LinkingButton>
        <a></a>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        height={400}
        width={700}
      >
        <iframe
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Modal>
    </>
  );
}
