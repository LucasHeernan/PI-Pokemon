import React from 'react';
import c from "./Loading.module.css";
import pika from "./loadingPika.gif";


export default function Loading() {

    return (
        <div className={c.loading}>
            <img src={pika} alt="recalculando"/>
        </div>
    )
}