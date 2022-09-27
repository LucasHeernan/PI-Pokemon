import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByAttack, orderByName, orderByType } from "../../redux/actions";

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

    function handlerByType(e) {
        e.preventDefault();
        dispatch(orderByType(e.target.value));
    }

    return (
        <div>
            <select defaultValue="Alphabetical order" 
            onChange={e => handlerByName(e)}>
                <option disabled={click}>Order by Name</option>
                <option value='ASC'>A - Z</option>
                <option value='DESC'>Z - A</option>
            </select>
            <select defaultValue="Select Attack"
            onChange={e => handlerByAttack(e)}>
                <option disabled={click}>Order by Attack</option>
                <option value='ASC'>Ascendent</option>
                <option value='DESC'>Descendent</option>
            </select>
            <select  defaultValue="All Pokemons"> 
                <option>Filter by Created</option>
                <option value="ALL">All</option>
                <option value="CREATED">Created</option>
            </select>
            <select defaultValue="All Types"
            onChange={e => handlerByType(e)}>
                <option value='ALL'>All Types</option>
                { types?.map((t, id) => {
                    return  <option value={t.name} key={id}>{t.name}</option>;
                })}
            </select>
        </div>
    )
}