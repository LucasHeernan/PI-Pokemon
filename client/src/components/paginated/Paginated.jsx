import React from "react";
import c from "./Paginated.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";

export default function Paginated({ pokesPerPage, paginated, handlePrev, handleNext, lastPoke }) {

    const { all } = useSelector(store => store);
    const dispatch = useDispatch();
    let pages = [];

    for (let i = 1; i <= (all.length/pokesPerPage); i++) {
        pages.push(i)
    }

    function handleMore(e) {
        e.preventDefault();
        dispatch(getAllPokemons(lastPoke));
    }

    return (
        <nav className={c.container}>
            <ul className={c.paginated}>
                <button className={c.btnPagina}
                    onClick={handlePrev}>Prev
                </button>
                {
                    pages && pages.map(n =>
                        <p className={c.btnPage} onClick={()=>{paginated(n)}} key={n}>{n}</p>
                    )
                }

                {/* ACÁ PODRÍA PONER UN BOTON QUE TRAIGA MÁS POKEMONES */}
                <button className={c.btnPagina}
                    onClick={handleMore}>
                    {/* TIENE QUE PODER DESPACHAR A PARTIR DEL ULTIMO POKEMON */}
                    +
                </button>

                {/* <p className="btnPage">{currentPage} de {pageNumbers.length} </p> */}

                <button className={c.btnPagina}
                    onClick={handleNext}>Next
                </button>

                {/* <p className="btnPage" onClick={()=>{paginated(pageNumbers.length)}}>{pageNumbers.length}</p> */}
            </ul>
        </nav>
    )
}