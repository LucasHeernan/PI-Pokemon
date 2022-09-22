import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";

import Pokemon from "../pokemon/Pokemon";
import c from "./Container.module.css";


export default function Container() {

    const dispatch = useDispatch();
    const all = useSelector((state) => state.all);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    return (
        <section className={c.container} >
            {
                all.map(e =>
                    <Pokemon
                        key={e.id}
                        name={e.name}
                        imgId={e.imgId}
                        id={e.id}
                    />
                )
            }
        </section>
    )
}
