import React, { useState } from "react";
import c from "./SearchBar.module.css";
import { Link, useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getPokemonByName } from "../../redux/actions";
import pokeBall from "../../images/pokeBall.png";


export default function SearchBar() {
    
    const history = useHistory();
    // const dispatch = useDispatch();
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
            <div className={c.div}>
                <img className={c.img} src={pokeBall} alt="pokebola" />
                <span className={c.span}>POKE-APP</span>
            </div>
            <Link className={c.create} to="/home/create" >
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
