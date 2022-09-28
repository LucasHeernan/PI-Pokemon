import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByAttack, orderByName, orderByType, orderByOrigin } from "../../redux/actions";
import c from "./Filter.module.css";

export default function Filters() {

    const dispatch = useDispatch();
    const { types } = useSelector(state => state);
    const [click, setClick] = useState('');

    function handlerByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setClick(e.target.value);
    }

    function handlerByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setClick(e.target.value);
    }

    function handlerByOrigin(e) {
        e.preventDefault();
        dispatch(orderByOrigin(e.target.value));
    }

    function handlerByType(e) {
        e.preventDefault();
        dispatch(orderByType(e.target.value));
    }

    return (
        <div className={c.container}>
            <select className={c.select} defaultValue="Alphabetical order"
            onChange={e => handlerByName(e)}>
                <option value='DEFAULT'>Order by Name</option>
                <option value='ASC'>A - Z</option>
                <option value='DES'>Z - A</option>
            </select>
            <select className={c.select} defaultValue="Select Attack"
            onChange={e => handlerByAttack(e)}>
                <option value='DEFAULT'>Order by Attack</option>
                <option value='ASC'>Ascendent</option>
                <option value='DES'>Descendent</option>
            </select>
            <select className={c.select}  defaultValue="Origin"
            onChange={e => handlerByOrigin(e)}>
                <option value='ALL'>Filter by Created</option>
                <option value='API'>Existing</option>
                <option value='CREATED'>Created</option>
            </select>
            <select className={c.select} defaultValue="All Types"
            onChange={e => handlerByType(e)}>
                <option value='ALL'>All Types</option>
                { types?.map((t, id) => {
                    return  <option value={t.name} key={id}>{t.name}</option>;
                })}
            </select>
        </div>
    )
}