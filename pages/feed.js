import React from 'react';
import styles from "../styles/Feed/Feed.module.scss";
import { useState, useEffect } from 'react';

// components
import Masonry from 'react-masonry-css';
import Pin from '../components/Feed/Pin';

import { client } from "../functions/client";

export default function Feed() {
  const [pins, setPins] = useState([])

  useEffect(() => {
    const query = `*[_type == "pin"] | order(_createdAt desc){ 
      number_cubes, 
      pontuation, 
      right_cubes, 
      time, 
      "imageUrl": image.asset->url,
      "imageDimensions": image.asset->metadata.dimensions,
      "author": postedBy->userName,
      _id,
    }[0...20]`;

    client
      .fetch(query)
      .then((data) => {
        console.log(data);
        setPins(data);
      })
      .catch(console.error);
  }, [])

  const breakpointColumnsObj = {
    default: 3,
    929: 2,
    400: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGrid_column}>
      {
        pins.map((pin, index) => {
          return (
            <Pin id={pin._id} key={index} imageDimensions={pin.imageDimensions} imageUrl={pin.imageUrl} result={`${pin.right_cubes}/${pin.number_cubes}`} pontuation={pin.pontuation} time={pin.time} />
          )
        })
      }
    </Masonry>
  )
}
