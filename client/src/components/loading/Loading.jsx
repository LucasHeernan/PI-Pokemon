import React from 'react';
import c from "./Loading.module.css";
import loadingPika from "../../images/loadingPika.gif";


export default function Loading() {

    return (
        <div className={c.loading}>
            <img src={loadingPika} alt="recalculando"/>
        </div>
    )
}