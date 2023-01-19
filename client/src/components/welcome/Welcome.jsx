import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import c from "./Welcome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";

export default function Welcome() {

    const dispatch = useDispatch();
    const { types } = useSelector(store => store);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    return (
        <div className={c.App}>
            <h1 className={c.title}>Welcome to Pokemon App</h1>
            { types?.length ?
                <Link to='/home'>
                    {/* <div className={c.link}> */}
                        <div className={c.btnGeneral}></div>
                    {/* </div> */}
                </Link> :
                null
            }
        </div>
    )
}