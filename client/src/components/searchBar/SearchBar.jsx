import React, { useState } from "react";
import c from "./SearchBar.module.css";
import { getPokemonByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

// BUSCADOR POKEMON POR NAME
/* ¡ AVERIGUAR ¿CÓMO? HACER QUE LA BUSQUEDA VAYA POR QUERY ! */

export default function SearchBar() {
    const dispatch = useDispatch();
    const [poke, setPoke] = useState('');

    function valid (text) {
        let test = text.replaceAll(' ', '').split('').map(e => isNaN(e));
        // let test = text.split('').filter(e => e !== ' ').map(e => !parseInt(e))
        return test;
    }

    function handleSubmit(e) {
        e.prevenDefault();
        if (!poke) return alert('DEBES INGRESAR UN NOMBRE');
        if (valid(poke).includes(false)) return alert('NO SE PERMITEN NÚMEROS');
        else {
            dispatch(getPokemonByName(poke));
            setPoke('');
        }
    }

    function handleChange(e) {
        setPoke(e.target.value)
    }

    return (
        <nav className={c.container}>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                onChange={e => handleChange(e)}
                    className={c.input}
                    value={poke.toLocaleLowerCase()}
                    type="search"
                    placeholder="Nombre"
                />
                <input
                    className={c.btn}
                    type="submit" value="Buscar"
                />
            </form>
        </nav>
    )
}