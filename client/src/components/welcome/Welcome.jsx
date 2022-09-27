import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import c from "./Welcome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";

export default function Welcome() {

    const dispatch = useDispatch();
    const { all, types } = useSelector(store => store);

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
    }, [dispatch])

    return (
        <div className={c.Landing}>
            <h1 className={c.title}>Welcome to Pokemon App</h1>
            { all?.length && types?.length ?
                <Link to='/home'>
                    <button className={c.btnGeneral}>Enter Site</button>
                </Link> :
                null
            }
        </div>
    )
}