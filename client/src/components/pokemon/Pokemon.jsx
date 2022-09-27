import React from "react";
import { Link } from "react-router-dom";

export default function Pokemon({ name, imgId, types, id}) {
    return (
        <div>
            <div>
                <Link to={`home/${name}`}>
                    <h2>{name}</h2>
                </Link>
                <img src={imgId} alt="pokemon" />
                <p>Types: </p>
                {
                    types?.map((type, i) => (
                        <span key={i}>{type.name}</span>
                    ))
                }
            </div>
        </div>
    
    )
}
