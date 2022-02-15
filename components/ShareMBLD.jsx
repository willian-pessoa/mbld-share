import React, { memo } from "react";
import { useState, useEffect } from "react";
import UploadImages from "./UploadImages";
import styles from "../styles/Profile/ShareMBLD.module.scss";
import Router from "next/router";

import { client } from "../functions/client.js";

import { Oval } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";

// helpers
import { isFormatTime } from "../functions/isFormatTime.js";
import { timeToString } from "../functions/timeToString.js";

export default function ShareMBLD({ id }) {
  // data to send
  const [imageAsset, setImageAsset] = useState(null);
  const [imageURL, setImageURL] = useState("/assets/defaultUpload.png");
  const [title, setTitle] = useState("");
  const [numberCubes, setNumberCubes] = useState("");
  const [rightCubes, setRightCubes] = useState("");
  const [pontuation, setPontuation] = useState(0);
  const [memorization, setMemorization] = useState(0);
  const [execution, setExecution] = useState(0);
  const [time, setTime] = useState(0);
  const [note, setNote] = useState("");
  const [urlVideo, setUrlVideo] = useState("");

  // data to helper
  const [tempMemo, setTempMemo] = useState("");
  const [tempExec, setTempExec] = useState("");
  const [tempTime, setTempTime] = useState("");

  // button text and loading send
  const [textBtn, setTextBtn] = useState("SHARE");
  const [isSending, setIsSending] = useState(false);

  // input title, url, number cubes and cubes right
  const handleUrlVideo = (url) => {
    setUrlVideo(url);
  };

  const handleTitle = (title) => {
    setTitle(title);
  };

  const handleAmount = (amount) => {
    amount < 0 ? setNumberCubes(0) : setNumberCubes(amount);
    if (amount < rightCubes) {
      setRightCubes(amount);
    }
  };

  const handleRight = (right) => {
    right < 0
      ? setRightCubes(0)
      : right > numberCubes
      ? setRightCubes(numberCubes)
      : setRightCubes(right);
  };

  // pontuation
  useEffect(() => {
    let wrongCubes = numberCubes - rightCubes;
    setPontuation(rightCubes - wrongCubes);
  }, [numberCubes, rightCubes]);

  // times input
  const handleTotalTime = (time) => {
    setTempTime(time);
    let isFormat = isFormatTime(time)[0];
    let timeInSecs = isFormatTime(time)[1];
    if (isFormat) {
      setTime(timeInSecs);
    }
  };

  const handleMemoTime = (time) => {
    setTempMemo(time);
    let isFormat = isFormatTime(time)[0];
    let timeInSecs = isFormatTime(time)[1];
    if (isFormat) {
      setMemorization(timeInSecs);
    }
  };

  const handleExecTime = (time) => {
    setTempExec(time);
    let isFormat = isFormatTime(time)[0];
    let timeInSecs = isFormatTime(time)[1];
    if (isFormat) {
      setExecution(timeInSecs);
    }
  };

  // auto compute time input
  useEffect(() => {
    if (memorization !== -1 && execution !== -1) {
      setTime(memorization + execution);
      setTempTime(timeToString(memorization + execution));
    }
  }, [memorization, execution]);

  // notes
  const handleNotes = (text) => {
    setNote(text);
  };

  // SHARE BUTTON
  const handleShare = () => {
    setIsSending(true);

    const doc = {
      _type: "pin",
      title: title,
      number_cubes: Number(numberCubes),
      right_cubes: Number(rightCubes),
      pontuation: pontuation,
      memo_time: memorization,
      exec_time: execution,
      time: time,
      note: note,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      video: urlVideo,
      userId: id,
      postedBy: {
        _type: "postedBy",
        _ref: id,
      },
    };

    if (
      imageAsset === null ||
      time === 0 ||
      title === "" ||
      numberCubes === "" ||
      rightCubes === ""
    ) {
      setTimeout(() => {
        setTextBtn("TRY AGAIN");
        setIsSending(false);
      }, 700);
      return;
    }

    client.create(doc).then(() => {
      setIsSending(false);
      Router.push(`/profile/${id}/attemptsUser`);
    });
  };

  return (
    <div className={styles.ShareMBLD}>
      <div className={styles.topContainer}>
        <div className={styles.leftTopContainer}>
          <UploadImages
            setImageAsset={setImageAsset}
            imageURL={imageURL}
            setImageURL={setImageURL}
          />
          <label>
            Url Video
            <input
              placeholder="https://..."
              onChange={(e) => handleUrlVideo(e.target.value)}
              value={urlVideo}
              id="urlvideo"
              type="text"
            />
          </label>
        </div>
        <div className={styles.rightTopContainer}>
          <div className={styles.title}>
            <label htmlFor="title">Title</label>
            <input
              placeholder="Impresive n/n attempt..."
              onChange={(e) => handleTitle(e.target.value)}
              value={title}
              id="title"
              type="text"
            />
          </div>
          <div className={styles.cubesInfos}>
            <label>
              Nº Cubes
              <input
                onChange={(e) => handleAmount(e.target.value)}
                value={numberCubes}
                id="amount"
                type="number"
                placeholder="2"
              />
            </label>
            <label>
              Nº Right
              <input
                onChange={(e) => handleRight(e.target.value)}
                value={rightCubes}
                id="right"
                type="number"
                placeholder="2"
              />
            </label>
            <label>
              Pontuation
              <input
                value={pontuation}
                id="pontuation"
                type="number"
                disabled
              />
            </label>
          </div>
          <div className={styles.timeInfos}>
            <label>
              Memo Time
              <input
                onChange={(e) => handleMemoTime(e.target.value)}
                value={tempMemo}
                id="memo"
                type="text"
                placeholder="00:00"
              />
            </label>
            <label>
              Exec Time
              <input
                onChange={(e) => handleExecTime(e.target.value)}
                value={tempExec}
                id="exec"
                type="text"
                placeholder="00:00"
              />
            </label>
            <label>
              Total Time
              <input
                onChange={(e) => handleTotalTime(e.target.value)}
                value={tempTime}
                id="time"
                type="text"
              />
            </label>
          </div>
          <div className={styles.tooltipContainer}>
            <p data-tip data-for="formatTime">
              Format Times Allowed
            </p>
            <ReactTooltip multiline className={styles.tooltip} id="formatTime" place="top" effect="solid">
              The Format times Allowed are <br/> <br/> 00:00:00 and 00:00 
            </ReactTooltip>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        Notes
        <textarea placeholder="Write your good and bad thoughts about the attempt..." onChange={(e) => handleNotes(e.target.value)} value={note} />
      </div>
      <div className={styles.sendContainer}>
        <button onClick={() => handleShare()}>{textBtn}</button>
        &nbsp;
        {isSending ? <Oval color="#00BFFF" height={40} width={40} /> : ""}
      </div>
    </div>
  );
}
