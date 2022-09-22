import React from "react";
import { Link } from "react-router-dom";

export default function Pokemon({ name, imgId, id}) {
    return (
        <div>
            <div>
                <Link to={`/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <img src={imgId} alt="pokemon" />
            </div>
        </div>
    
    )
}
