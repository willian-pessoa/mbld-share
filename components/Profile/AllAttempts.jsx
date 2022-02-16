import React from "react";
import styles from "../../styles/Profile/AllAttempts.module.scss";
import { useState, useEffect } from "react";
import Router from "next/router";

import { client } from "../../functions/client";

import { timeToString } from "../../functions/timeToString";
import { AiFillDelete, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Oval } from "react-loader-spinner";

import { TITLES } from "./data";

export default function AllAttempts({ id }) {
  const [data, setData] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [filter, setFilter] = useState({title:"Created", order: "_createdAt", sort: "asc"});
  const [showArrow, setShowArrow] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // infos to display

  // fetch attempts User Infos
  useEffect(() => {
    setIsLoading(true);
    if (id !== null) {
      const query = `*[_type == "pin" && userId == "${id}"] | order(${filter.order + " " + filter.sort}) {
        exec_time, memo_time, number_cubes, pontuation, right_cubes, time, note, _id
      }`;
      client
        .fetch(query)
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch(console.error);
    }
  }, [id, filter]);

  // build array to generate the lines of table
  useEffect(() => {
    setIsLoading(true);
    let tempAttempt = [];
    data.map((item) => {
      let attempt = {
        number_cubes: item.number_cubes,
        right_cubes: item.right_cubes,
        pontuation: item.pontuation,
        memo_time: timeToString(item.memo_time),
        memo_cube: timeToString(Math.trunc(item.memo_time / item.number_cubes)),
        exec_time: timeToString(item.exec_time),
        exec_cube: timeToString(Math.trunc(item.exec_time / item.number_cubes)),
        time: timeToString(item.time),
        time_cube: timeToString(Math.trunc(item.time / item.number_cubes)),
        id_try: item._id,
      };
      tempAttempt.push(attempt);
    });
    setAttempts(tempAttempt);
    setIsLoading(false);
  }, [data]);

  const handleDelete = (id) => {
    setIsLoading(true);
    console.log(id);
    client
      .delete(id)
      .then(() => {
        console.log("Attempt deleted");
        setTimeout(() => {
          setIsLoading(false);
          Router.reload(window.location.pathname);
        }, 5000);
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });
  };

  const handleFilter = (toFilter) => {
    setShowArrow(true);
    console.log(toFilter);
    switch (toFilter){
      case "Points":
        if(filter.sort === "asc"){
          setFilter(prev=>({title: toFilter, order:"pontuation", sort:"desc"}))
        } else {
          setFilter(prev=>({title: toFilter, order:"pontuation", sort:"asc"}))
        }
      case "Memorization":
        if(filter.sort === "asc"){
          setFilter(prev=>({title: toFilter, order:"memo_time", sort:"desc"}))
        } else {
          setFilter(prev=>({title: toFilter, order:"memo_time", sort:"asc"}))
        }
      case "Execution":
        if(filter.sort === "asc"){
          setFilter(prev=>({title: toFilter, order:"exec_time", sort:"desc"}))
        } else {
          setFilter(prev=>({title: toFilter, order:"exec_time", sort:"asc"}))
        }
      case "Time":
        if(filter.sort === "asc"){
          setFilter(prev=>({title: toFilter, order:"time", sort:"desc"}))
        } else {
          setFilter(prev=>({title: toFilter, order:"time", sort:"asc"}))
        }
      case "Nº Cubes":
        if(filter.sort === "asc"){
          setFilter(prev=>({title: toFilter, order:"number_cubes", sort:"desc"}))
        } else {
          setFilter(prev=>({title: toFilter, order:"number_cubes", sort:"asc"}))
        }
      case "Nº Right":
        if(filter.sort === "asc"){
          setFilter(prev=>({title: toFilter, order:"right_cubes", sort:"desc"}))
        } else {
          setFilter(prev=>({title: toFilter, order:"right_cubes", sort:"asc"}))
        }
    }
  };

  return (
    <div className={styles.allAttempts}>
      <h2>All Attempts</h2>
      <h5>
        If the attempt send/deleted doesn't show immediately, wait some minutes
        and refresh the page, sometimes it might take a while to load from
        database.
      </h5>
      <div className={styles.table}>
        {isLoading ? (
          <Oval color="#00BFFF" height={40} width={40} />
        ) : (
          <table className={styles.styledTable}>
            <thead>
              <tr>
                {TITLES.map((item, index) => {
                  return (
                    <th
                      onClick={() => handleFilter(item)}
                      key={index}
                    >
                      {item}
                      {showArrow && filter.title === item ? filter.sort === "desc" ? <AiFillCaretDown style={{color: "#455A64"}}/> : <AiFillCaretUp style={{color: "#455A64"}}/> : ""}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {attempts.map((item, index) => {
                return (
                  <tr key={index}>
                    {Object.keys(item).map((key, index) => {
                      return (
                        <td key={key}>
                          {key === "id_try" ? (
                            <AiFillDelete
                              onClick={() => handleDelete(item[key])}
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            item[key]
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
