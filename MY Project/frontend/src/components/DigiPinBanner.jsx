import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function DigiPinBanner() {
  return (
    <div className="w-full py-2 bg-white bg-opacity-70 text-center shadow font-semibold text-indigo-700 text-base flex justify-center items-center">
      Mapping Every Mile With DigiPin
      <FontAwesomeIcon icon={faHeart} className="text-red-500 ml-1" />
    </div>
  );
}
