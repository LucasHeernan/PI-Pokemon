import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPokemons } from "../redux/actions";

export function Cokemones({all, getAllPokemons}) {

    function getPokemones(){
        getAllPokemons()
    }

    useEffect(() => {
        getPokemones()
    }, [])

    return (
        <div>
            {
                all.map((p) => {
                    return (
                        <div>
                            <h1>{p.name}</h1>
                            <img src={p.imgId} alt="imagen"/>
                        </div>
                    )
                })
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        all: state.all
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPokemons: (p) => dispatch(getAllPokemons(p))
    }
}

export default connect ( mapStateToProps, mapDispatchToProps ) (Cokemones)




























// import { useEffect } from "react";
// import { connect } from "react-redux";
// import { getAllPokemons } from "../redux/actions";

// export function Main({allPokemons, getAllPokemons}) {

//     function getPokemons(){
//         getAllPokemons();
//     };

//     useEffect(() => {
//         getPokemons();
//     }, []);

//     return (
//         <div>
//             {
//                 allPokemons.map((poke) => {
//                     return (
//                         <div>
//                             <p>{poke.name}</p>
//                             <img src={poke.img} alt="imagen" />
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// function mapStateToProps(state) {
//     return {
//         allPokemons: state.allPokemons
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getAllPokemons: (p) => dispatch(getAllPokemons(p))
//     }
// }

// export default connect ( mapStateToProps, mapDispatchToProps ) (Main)