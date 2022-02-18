import React from 'react';
import AttemptDetails from '../../components/Feed/AttemptDetails';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { client } from "../../functions/client";

import { Oval } from "react-loader-spinner";

export default function AttemptPage() {
  const router = useRouter();
  const [dataDetails, setDataDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //fecth data
  useEffect(() => {
    const query = `*[_type == "pin" && _id == "${router.query.attemptId}"]{
            exec_time, 
            memo_time, 
            number_cubes, 
            pontuation, 
            right_cubes, 
            time, 
            note, _id, 
            "imageUrl": image.asset->url,
            "imageDimensions": image.asset->metadata.dimensions,
            video,
            title,
          }`;
    client
      .fetch(query)
      .then((data) => {
        setDataDetails(data[0]);
        if (data.length === 1) {
          setTimeout(() => setIsLoading(false), 700)
        }
      })
      .catch(console.error);
  }, [router.query]);

  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 80px" }}>
    {
      isLoading ? <Oval color="#00BFFF" height={40} width={40} /> :
        <AttemptDetails dataDetails={dataDetails} idPage={router.query.attemptId} />
    }
  </div>;
}
