import React from "react";
import styles from "../../styles/Profile/AllAttempts.module.scss";
import { useState, useEffect } from "react";
import Router from "next/router";

// helpers
import { client } from "../../functions/client";
import { timeToString } from "../../functions/timeToString";
import { timeStringToNumber } from "../../functions/timeStringToNumber";
import { TITLES } from "./data";

// visual components
import { AiFillDelete, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Oval } from "react-loader-spinner";

export default function AllAttempts({ id }) {
  const [data, setData] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [filter, setFilter] = useState({
    title: "Created",
    sort: "asc",
  });
  const [showArrow, setShowArrow] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // infos to display

  // fetch attempts User Infos
  useEffect(() => {
    setIsLoading(true);
    if (id !== null) {
      const query = `*[_type == "pin" && userId == "${id}"] | order(_createdAt desc) {
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
  }, []);

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
    client
      .delete(id)
      .then(() => {
        console.log("Attempt deleted");
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });
  };

  const handleFilter = (toFilter) => {
    setShowArrow(true);
    switch (toFilter) {
      case "Points":
        console.log(attempts);
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort((a, b) => Number(a.pontuation) - Number(b.pontuation))
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort((a, b) => Number(b.pontuation) - Number(a.pontuation))
          );
        }
        break;
      case "Memorization":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(a.memo_time) -
                timeStringToNumber(b.memo_time)
            )
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(b.memo_time) -
                timeStringToNumber(a.memo_time)
            )
          );
        }
        break;
      case "Execution":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(a.exec_time) -
                timeStringToNumber(b.exec_time)
            )
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(b.exec_time) -
                timeStringToNumber(a.exec_time)
            )
          );
        }
        break;
      case "Time":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) => timeStringToNumber(a.time) - timeStringToNumber(b.time)
            )
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) => timeStringToNumber(b.time) - timeStringToNumber(a.time)
            )
          );
        }
        break;
      case "Nº Cubes":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort((a, b) => Number(a.number_cubes) - Number(b.number_cubes))
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort((a, b) => Number(b.number_cubes) - Number(a.number_cubes))
          );
        }
        break;
      case "Nº Right":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort((a, b) => Number(a.right_cubes) - Number(b.right_cubes))
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort((a, b) => Number(b.right_cubes) - Number(a.right_cubes))
          );
        }
        break;
      case "Memo/Cube":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(a.memo_cube) -
                timeStringToNumber(b.memo_cube)
            )
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(b.memo_cube) -
                timeStringToNumber(a.memo_cube)
            )
          );
        }
        break;
      case "Exec/Cube":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(a.exec_cube) -
                timeStringToNumber(b.exec_cube)
            )
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(b.exec_cube) -
                timeStringToNumber(a.exec_cube)
            )
          );
        }
        break;
      case "Time/Cube":
        if (filter.sort === "asc") {
          setFilter({
            title: toFilter,
            sort: "desc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(a.time_cube) -
                timeStringToNumber(b.time_cube)
            )
          );
        } else {
          setFilter({
            title: toFilter,
            sort: "asc",
          });
          setAttempts((prev) =>
            prev.sort(
              (a, b) =>
                timeStringToNumber(b.time_cube) -
                timeStringToNumber(a.time_cube)
            )
          );
        }
        break;
    }
  };

  const handlePageRedirect = (idPage, key) => {
    if (key === "id_try") {
      return;
    } else {
      Router.push(`/attempts/${idPage}`);
    }
  };

  return (
    <div className={styles.allAttempts}>
      <h2>All Attempts</h2>
      <h5>
        If the attempt send/deleted doesn't show immediately, wait some minutes
        and refresh the page, sometimes it might take a while to load the
        updates from database.
      </h5>
      <h5>You can click on the title of each column to sort accord</h5>
      <div className={styles.table}>
        {isLoading ? (
          <Oval color="#00BFFF" height={40} width={40} />
        ) : (
          <table className={`${styles.styledTable} ${styles.tableResponsive}`}>
            <thead>
              <tr>
                {TITLES.map((item, index) => {
                  return (
                    <th onClick={() => handleFilter(item)} key={index}>
                      {item}
                      {showArrow && filter.title === item ? (
                        filter.sort === "desc" ? (
                          <AiFillCaretDown style={{ color: "#455A64" }} />
                        ) : (
                          <AiFillCaretUp style={{ color: "#455A64" }} />
                        )
                      ) : (
                        ""
                      )}
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
                        <td
                          key={index}
                          onClick={() => handlePageRedirect(item.id_try, key)}
                        >
                          {key === "id_try" ? (
                            <AiFillDelete
                              onClick={() => handleDelete(item[key])}
                              style={{ cursor: "pointer", zIndex: "10" }}
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
