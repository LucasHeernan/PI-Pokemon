import React from "react";
import { Link } from "react-router-dom";
import c from "./Welcome.module.css";

// PÁGINA INICIAL
// Imagen de fondo y botón para ir a la ruta {/home}

export default function Welcome() {
    return (
        <div className={c.Landing}>
            <h1 className={c.title}>Welcome to Pokemon App</h1>
            <Link to='/home'>
                <button className={c.btnGeneral}>Enter Site</button>
            </Link>
        </div>
    )
}