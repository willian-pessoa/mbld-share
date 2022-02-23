import React from "react";
import styles from "../../styles/Ranking/Ranking.module.scss";
import Router from "next/router"

import ReactCountryFlag from "react-country-flag";
import { timeToString } from "../../functions/timeToString";

const TITLES = ["Pos", "User", "Result", "Pontuation", "Time", "Date"];

export default function Ranking({ ranking }) {

  return (
    <div className={styles.ranking}>
      <h1>MBLD Share Ranking</h1>
      <div className={styles.table}>
        <table className={`${styles.styledTable} ${styles.tableResponsive}`}>
          <thead>
            <tr>
              {TITLES.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {ranking.map(
              ({ userName, highPontuation, countryCode, country }, index) => {
                return (
                  <tr onClick={()=>Router.push(`/attempts/${highPontuation._id}`)} key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <ReactCountryFlag
                        countryCode={countryCode}
                        svg
                        style={{
                          width: "2em",
                          height: "2em",
                        }}
                        title={country}
                      />
                      &nbsp;
                      {userName}
                    </td>
                    <td>{`${highPontuation.right_cubes} / ${highPontuation.number_cubes}`}</td>
                    <td>{highPontuation.pontuation}</td>
                    <td>{timeToString(highPontuation.time)}</td>
                    <td>{highPontuation._createdAt.substring(0, 10)}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
