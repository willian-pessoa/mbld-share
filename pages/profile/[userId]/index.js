import React from 'react';
import { client } from '../../../functions/client';
import { useEffect, useState, useMemo } from 'react';
import Image from "next/image"

import Select from 'react-select'
import countryList from 'react-select-country-list'
import ReactCountryFlag from "react-country-flag"
import { Oval } from 'react-loader-spinner'

import styles from "../../../styles/Profile/Profile.module.scss";

export default function Profile() {
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [changed, setChanged] = useState(false);

  const [countryCode, setCountryCode] = useState("UN");
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), [])

  const [isLoading, setIsLoading] = useState(true);

  // fetch User Infos
  useEffect(() => {
    if (id === null) {
      setId(JSON.parse(localStorage.getItem("user")).googleId);
      setTimeout(() => setIsLoading(false), 500);
    } else {
      const query = `*[_type == "user" && _id == "${id}"]`
      client.fetch(query)
        .then((data) => {
          setImage(data[0].image)
          //console.log(data[0].countryCode)
          setCountryCode(data[0].countryCode)
          setCountry(data[0].country)
          setUserName(data[0].userName)
        })
        .catch(console.error);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [id])

  const changeCountry = value => {
    console.log(value.label);
    console.log(value.value)
    setCountry(value.label);
    setCountryCode(value.value);
    setChanged(false);
  }

  const saveChanges = () => {

    client.patch(id)
      .set({ country: country, countryCode: countryCode, _id: id })
      .commit()
      .then((r) => {setChanged(prev => !prev); console.log(r)})
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message)
      })
  }

  return (
    <div className={styles.profile}>
      {isLoading ? <Oval color="#00BFFF" height={80} width={80} /> :
        <><div className={styles.left}>
          <Image alt="profile" src={image === null ? "/assets/defaultProfile.png" : image} width={125} height={125} />
        </div><div className={styles.right}>
            <h2>{userName}</h2>
            <div className={styles.country}>
              <h2>Country: &nbsp;</h2>
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                  width: '2em',
                  height: '2em',
                }}
                title={countryCode} />
              &nbsp;
              <Select placeholder={country} className={styles.select} options={options} value={country} onChange={changeCountry} />
            </div>
            <button onClick={() => saveChanges()}>{!changed ? "Change Country" : "Changed"}</button>
          </div></>}
    </div>

  )
}
