import React, { useState } from "react";
import c from "./SearchBar.module.css";
import { Link, useHistory } from "react-router-dom";


export default function SearchBar() {
    
    const history = useHistory();
    const [poke, setPoke] = useState('');

    function valid (text) {
        let test = text.replaceAll(' ', '').split('').map(e => isNaN(e));
        return test;
    }

    function handleChange(e) {
        e.preventDefault();
        setPoke(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!poke) return alert('DEBES INGRESAR UN NOMBRE');
        if (valid(poke).includes(false)) return alert('NO SE PERMITEN NÚMEROS');
        else {
            history.push(`/home/${poke}`);
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
}
