import React from 'react'
import Ranking from '../components/Ranking/Ranking';
import { useState, useEffect } from 'react';

import { client } from "../functions/client";
import { Oval } from 'react-loader-spinner'

export default function RankingMBLD({ ranking }) {
    const [sortedRank, setSortedRank] = useState(ranking);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let tempArr = []
        sortedRank.forEach((item) => {
            if (item.highPontuation != null) {
                tempArr.push(item)
            }
        })
        setSortedRank(tempArr.sort((b, a) => parseInt(a.highPontuation.pontuation) - parseInt(b.highPontuation.pontuation)))
        setTimeout(() => setIsLoading(false), 500);
    }, [sortedRank])

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "100vw" }}>
            {
                isLoading ? <Oval color="#00BFFF" height={80} width={80} /> :
                    <Ranking ranking={sortedRank} />
            }
        </div>
    )
}

export async function getStaticProps(context) {

    const query = `*[_type == "user"]{
        userName,
        country,
        countryCode,
        "highPontuation": *[_type == "pin" && userId == ^._id]|order(pontuation desc)[0]{
        number_cubes,
        right_cubes,
        pontuation,
        time,
        _createdAt,
        _id
      }
      }`

    let ranking = [];

    await client.fetch(query)
        .then((res) => {
            ranking = res;
        })
        .catch((err) => {
            console.error(err.message)
        })

    return {
        props: { ranking }, // will be passed to the page component as props
    }
}