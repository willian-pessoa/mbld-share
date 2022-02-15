import React from "react";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Profile/UploadImages.module.scss";

import { client } from "../functions/client";

import { Oval } from "react-loader-spinner";

export default function UploadImages({ imageURL, setImageURL, setImageAsset }) {
  const [imageLoading, setImageLoading] = useState(false);

  function onImageChange(e) {
    setImageLoading(true);
    let { type, name } = e.target.files[0];
    if (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      uploadImageBlob(e.target.files[0], type, name);
    }
  }

  function uploadImageBlob(blob, type, name) {
    client.assets
      .upload("image", blob, { contentType: type, filename: name })
      .then((document) => {
        console.log("The image was uploaded!", document);
        setImageURL(document.url);
        setImageAsset(document);
        setImageLoading(false);
      })
      .catch((error) => {
        console.error("Upload failed:", error.message);
      });
  }

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.image}>
        {imageLoading ? (
          <Oval color="#00BFFF" height={80} width={80} />
        ) : (
          <Image priority src={imageURL} layout="fill" />
        )}
      </div>
      <div className={styles.input}>
        <form>
          <label htmlFor="image">Enviar arquivo</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </form>
      </div>
    </div>
  );
}
