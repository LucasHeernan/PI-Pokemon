import React from "react";
import { Link } from "react-router-dom";
import c from "./Pokemon.module.css"
import defaultImg from "../../images/defaultImg.png";

export default function Pokemon({ name, imgId, img, types, id }) {

    return (
        <div className={c.container}>
            <div >
                {
                    id.toString().length < 5 ?
                    <div>
                        <Link to={`home/${name}`}>
                            <img className={c.img} src={imgId} alt="pokemon"/>
                        </Link>
                        <span className={c.id}>{id}</span>
                    </div>  :
                    <div>
                        <Link to={`home/${name}`}>
                            <img className={c.img} src={img ? img : defaultImg } alt="pokemon"/>
                        </Link>
                        <span className={c.id}>{id = 'DB'}</span>
                    </div>
                }
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
