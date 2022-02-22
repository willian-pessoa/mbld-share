import React from 'react'
import styles from "../../styles/Feed/Pin.module.scss";
import Image from "next/image"
import { useState, useEffect } from 'react';
import Router from "next/router"

import {timeToString} from "../../functions/timeToString";

export default function Pin({imageDimensions, imageUrl, result, pontuation, time, id}) {
  const [height, setHeight] = useState(300);
  const [width] = useState(300);

  useEffect(()=>{
    resizeImage(imageDimensions.height, imageDimensions.width)
  })

  const resizeImage = (h, w) => {
      setHeight((width * h) / w);
  };

  return (
    <div style={{height:height, width:width}} className={styles.pin}>
        <h1>{result}</h1>
        <h2>{pontuation}</h2>
        <h3>{timeToString(time)}</h3>
        <Image onClick={()=>Router.push(`/attempts/${id}`)} priority src={imageUrl} width={width} height={height} as="image"/>
    </div>
  )
}
