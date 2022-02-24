import React from 'react';
import GoogleLogin from "react-google-login";
import { FcGoogle } from 'react-icons/fc';
import styles from "../styles/Login.module.scss";
import Image from "next/image"
import Router from 'next/router'

import { client } from "../functions/client.js"

export default function Login() {

    const responseGoogle = (response) => {
        //console.log(response)
        localStorage.setItem("user", JSON.stringify(response.profileObj));

        const { name, googleId, imageUrl } = response.profileObj;

        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl,
            country: "",
        }

        client.createIfNotExists(doc)
            .then(() => {
                Router.push("/")
            })
    }

    return <div className={styles.login_container}>
        <div className={styles.videoContainer}>
            <iframe src="https://www.youtube.com/embed/_oEU0l58HPY?controls=0&autoplay=1&mute=1&playlist=_oEU0l58HPY&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div className={styles.login_bg}>
            <div className={styles.login}>
                <Image priority src="/assets/logo.png" width="150" height="51" alt="logo" />
                <GoogleLogin
                    clientId={`${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_ID}`}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <FcGoogle style={{ marginRight: "10px" }} />
                            Sing in with Google</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    </div>;
}
