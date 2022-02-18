import React from "react";
import styles from "../../styles/Feed/AttemptDetails.module.scss";
import Image from "next/image";

import { useState, useEffect } from "react";

// helpers
import { timeToString } from "../../functions/timeToString";

const MAXDIMENSION = 350;

export default function AttemptDetails({ idPage, dataDetails }) {
  const [height, setHeight] = useState(MAXDIMENSION);
  const [width, setWidth] = useState(MAXDIMENSION);

  console.log(dataDetails);

  useEffect(() => {
    resizeImage(
      dataDetails.imageDimensions.height,
      dataDetails.imageDimensions.width
    );
  }, []);

  const resizeImage = (h, w) => {
    if (h > w) {
      setHeight(MAXDIMENSION);
      setWidth((MAXDIMENSION * w) / h);
    } else {
      setWidth(MAXDIMENSION);
      setHeight((MAXDIMENSION * h) / w);
    }
  };

  return (
    <div className={styles.attemptDetails}>
      <div className={styles.containerTop}>
        <div className={styles.containerTop_left}>
          <div
            style={{ height: `${height}px`, width: `${width}px` }}
            className={styles.image}
          >
            <Image priority src={dataDetails.imageUrl} layout="fill" />
          </div>
          <p>{dataDetails.note}</p>
        </div>
        <div className={styles.containerTop_right}>
          <h2>{dataDetails.title}</h2>
          <div className={styles.numberCubes}>
            <div className={styles.amountContainer}>
              <p>Nº Cubes</p>
              <p>{dataDetails.number_cubes}</p>
            </div>
            <div className={styles.amountContainer}>
              <p>Nº Right</p>
              <p>{dataDetails.right_cubes}</p>
            </div>
            <div className={styles.amountContainer}>
              <p>Pontuation</p>
              <p>{dataDetails.pontuation}</p>
            </div>
          </div>
          <h2>
            <span>Total Time: </span>
            {timeToString(dataDetails.time)}
          </h2>
          <div className={styles.containerTimes}>
            <div className={styles.timesInfo}>
              <div className={styles.timeContainer}>
                <p>Memorization</p>
                <p>{timeToString(dataDetails.memo_time)}</p>
              </div>
              <div className={styles.timeContainer}>
                <p>Execution</p>
                <p>{timeToString(dataDetails.exec_time)}</p>
              </div>
            </div>
            <div className={styles.timesInfo}>
              <div className={styles.timeContainer}>
                <p>Memo/Cube</p>
                <p>{timeToString(Math.trunc(dataDetails.memo_time / dataDetails.number_cubes))}</p>
              </div>
              <div className={styles.timeContainer}>
                <p>Exec/Cube</p>
                <p>{timeToString(Math.trunc(dataDetails.exec_time / dataDetails.number_cubes))}</p>
              </div>
              <div className={styles.timeContainer}>
                <p>Time/Cube</p>
                <p>{timeToString(Math.trunc(dataDetails.time / dataDetails.number_cubes))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
