import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName, clearDetail} from "../../redux/actions";
import c from "./Detail.module.css";
import defaultImg from "../../images/defaultImg.png"
import esperanding from "../../images/esperanding.gif"

export default function Detail() {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { detail } = useSelector(store => store);

    useEffect(() => {
        dispatch(getPokemonByName(name));
        return () => {
            dispatch(clearDetail());
        }
    }, [dispatch, name])

    return (
        <div className={c.div}>
            <Link to="/home">
                <button className={c.btnBackHome}>Back to home!</button>
            </Link>
            {
                detail.length < 1 ? <img src={esperanding} alt="wait" width={400} /> :
                <div>
                    {
                        detail.err ? <h2>{detail.err}</h2> :
                        <div className={c.container}>
                            <div className={c.items}>
                                <div>
                                    <h2 className={c.title}>{detail.name}</h2>
                                    <img className={c.img} src={detail.img ? detail.img : defaultImg} alt="poke"/>
                                    <p className={c.id}>{typeof detail.id === "number" ? detail.id : `DATABASE`}</p>
                                </div>
                                <section>
                                    <p>Life {detail.hp}</p>
                                    <p>Attack {detail.attack}</p>
                                    <p>Defense {detail.defense}</p>
                                    <p>Speed {detail.speed}</p>
                                    <p>Height {detail.height}</p>
                                    <p>Weight {detail.weight}</p>
                                    <p>Types</p>
                                    <div className={c.detail}>
                                        {
                                            detail.types?.map((type, i) => (
                                                <span className={c.span} key={i}>{ type.name }</span>
                                            ))
                                        }
                                    </div>
                                </section>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
