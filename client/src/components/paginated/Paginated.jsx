import React from "react";
import c from "./Paginated.module.css";
import { useSelector } from "react-redux";

export default function Paginated({ pokesPerPage, paginated, handlePrev, handleNext, currentPage }) {

    const { all, pokemons } = useSelector(store => store);

    let pages = [];
    let max = all.length / pokesPerPage;
    for (let i = 0; i <= max; i++) {
        pages.push(i+1)
    }
    
    let pagesFilter = [];
    let maxFilter = pokemons.length / pokesPerPage;
    for (let f = 0; f < maxFilter; f++) {
        pagesFilter.push(f+1)
    }

    return (
        <nav className={c.container}>
            <ul className={c.paginated}>
                <button
                    disabled={currentPage === 1}
                    className={c.btn}
                    onClick={handlePrev}>PREV
                </button>
                {
                    pagesFilter.length >= 1 ? pagesFilter.map(f =>
                        <p className={f === currentPage ? c.currentPage : c.list} onClick={()=>{paginated(f)}} key={f}>{f}</p>
                    ) :
                    pages.map(n =>
                        <p className={n === currentPage ? c.currentPage : c.list} onClick={()=>{paginated(n)}} key={n}>{n}</p>
                    )
                }
                <button
                    disabled={currentPage === Math.ceil(max) || currentPage === Math.ceil(maxFilter)}
                    className={c.btn}
                    onClick={handleNext}>NEXT
                </button>
            </ul>
        </nav>
    )
}