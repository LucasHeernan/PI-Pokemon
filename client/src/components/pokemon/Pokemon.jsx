import React from "react";
import { Link } from "react-router-dom";
import c from "./Pokemon.module.css"

export default function Pokemon({ name, imgId, types, id}) {
    return (
        <div className={c.container}>
            <div >
                <img className={c.img} src={imgId} alt="pokemon" />
                <span className={c.id}>{id}</span>
                <Link className={c.section} to={`home/${name}`}>
                    <h2 className={c.title}>{name}</h2>
                </Link>
            </div>
            <div>
                <p>Types</p>
                <div className={c.detail}>
                    {
                        types?.map((type, i) => (
                            <span className={c.span} key={i}>{ type.name }</span>
                        ))
                    }
                </div>
            </div>
        </div>
    
    )
}
