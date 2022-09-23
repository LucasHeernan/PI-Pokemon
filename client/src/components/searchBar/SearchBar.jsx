import React, { useState } from "react";
import c from "./SearchBar.module.css";
import { getPokemonByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// BUSCADOR POKEMON POR NAME
/* ¡ AVERIGUAR ¿CÓMO? HACER QUE LA BUSQUEDA VAYA POR QUERY ! */

export default function SearchBar() {
    const dispatch = useDispatch();
    const [poke, setPoke] = useState('');

    function valid (text) {
        let test = text.replaceAll(' ', '').split('').map(e => isNaN(e));
        return test;
    }

    function handleChange(e) {
        setPoke(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!poke) return alert('DEBES INGRESAR UN NOMBRE');
        if (valid(poke).includes(false)) return alert('NO SE PERMITEN NÚMEROS');
        else {
            dispatch(getPokemonByName(poke));
            setPoke('');
        }
    }


    return (
        <nav className={c.container} >
            <div>
                <Link className={c.span} to='/home'>
                    <span>HOME</span>
                </Link>
            </div>
            <Link className={c.about} to="/home/create" >
                <span>CREATE POKEMON</span>
            </Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                onChange={(e) => handleChange(e)}
                    className={c.input}
                    value={poke}
                    type="text"
                    placeholder="Nombre"
                />
                <input
                    className={c.btn}
                    type="submit" value="Buscar"
                />
            </form>
        </nav>
    )

    // return (
    //     <nav className={c.container}>
            
    //     </nav>
    // )
}