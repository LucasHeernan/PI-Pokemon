import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import c from "./Detail.module.css";

export default function Details() {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { details } = useSelector(store => store);

    useEffect(() => {
        dispatch(getPokemonByName(name))
    }, [dispatch, name])

    return (
        <div className={c.div}>
            <Link to="/home">
                <button className={c.btnBackHome}>Back to home!</button>
            </Link>
            <div className={c.container}>
                <div className={c.items}>
                    <div>
                        <h2 className={c.title}>{details.name}</h2>
                        <img className={c.img} src={details.img} alt="poke"/>
                        <p className={c.id}>{details.id}</p>
                    </div>
                    <section>
                        <p>Life {details.hp}</p>
                        <p>Attack {details.attack}</p>
                        <p>Defense {details.defense}</p>
                        <p>Speed {details.speed}</p>
                        <p>Height {details.height}</p>
                        <p>Weight {details.weight}</p>
                        <p>Types</p>
                        <div className={c.detail}>
                            {
                                details.types?.map((type, i) => (
                                    <span className={c.span} key={i}>{ type.name }</span>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
