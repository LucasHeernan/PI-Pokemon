import React, { useState } from "react";
import "./create.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon } from "../../redux/actions";

export default function Create() {

    const dispatch = useDispatch();
    const types = useSelector(store => store.types);

    const [input, setInput] = useState({
        name: "",
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null
    });

    function handleChange(e) {
        setInput({
           ...input,
           [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input));
    }

    return (
        <div className="allForm">
            <br/>
            <div className="divBtnCreate">
                <Link to="/home">
                    <button className="btnBackCreate">Back to home!</button>
                </Link>
            </div>
            <div>
                <br/>
                <h2>
                    CREATE YOUR POKEMON
                </h2>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="formulario" id="formulario">
                        {/* ..... Nombre ..... */}
                        <div className="formulario__grupo" id="grupo__name">
                            <label className="formulario__label">Name:</label>
                            <div className="formulario__grupo-input">
                            <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="text"    
                                    name="name" 
                                    placeholder="escribe el nombre del Pokemon"
                                    required
                                />
                                <i className="formulario__validacion-estado" ></i>    
                            </div>
                        </div>

                        {/* ..... Hp ..... */}
                        <div className="formulario__grupo" id="grupo__hp">
                            <label className="formulario__label">Hp:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="hp"
                                    id="hp"
                                    min="0"
                                    max="200"
                                    placeholder="120"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                        </div>

                        {/* ..... Imagen url ..... */}
                        <div className="formulario__grupo" id="grupo__image">
                            <label className="formulario__label">Image URL:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="url"
                                    name="image"
                                    id="image"
                                    placeholder="URL of the Pokemon image"
                                />
                                <i className="formulario__validacion-estado" ></i>
                            </div>
                        </div>

                        {/* ..... height ..... */}
                        <div className="formulario__grupo" id="grupo__height">
                            <label className="formulario__label">Height:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="height"
                                    id="height"
                                    min="0"
                                    max="200"
                                    placeholder="50"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                        </div>

                        {/* ..... weight ..... */}
                        <div className="formulario__grupo" id="grupo__weight">
                            <label className="formulario__label">Weight:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    min="0"
                                    max="9999"
                                    placeholder="350"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                        </div>
        
                        
                        {/* ..... attack ..... */}
                        <div className="formulario__grupo" id="grupo__attack">
                            <label className="formulario__label">Attack:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="attack"
                                    id="attack"
                                    min="0"
                                    max="200"
                                    placeholder="40"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                        </div>

                        {/* ..... defense ..... */}
                        <div className="formulario__grupo" id="grupo__defense">
                            <label className="formulario__label">Defense:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="defense"
                                    id="defense"
                                    min="0"
                                    max="200"
                                    placeholder="90"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                        </div>
        
                        {/* ..... speed ..... */}
                        <div className="formulario__grupo" id="grupo__speed">
                            <label className="formulario__label">speed:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="speed"
                                    id="speed"
                                    min="0"
                                    max="200"
                                    placeholder="120"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                        </div>
                        
                        {/* ..... Tipos ..... */}
                        <div className="formulario__grupo">
                            <div>
                                <label className="formulario__label">types: </label>
                                <select 
                                    className="formulario__input" 
                                    >
                                    <option>Select types</option>
                                </select>
                            </div>
                        </div>
        
                        {/* ..... Tipos seleccionados ..... */}
                        <div className="formulario__grupo">
                            <div>
                            <div className="formulario__label">
                                <label>types selected:</label>
                                <br/>
                                <div className="type-lateral">
                                    {types?.map((t, i) =>
                                    <div key={i} className="box-input-element">
                                        <span>{t.name}</span>
                                        <button className="ButtonXF" 
                                            type="reset"
                                        >X</button>
                                    </div>
                                    )}
                                </div>
                            </div>
                            </div>
                        </div>  
                    </div>
        
                    <div className="formulario__grupo-btn-enviar">
                        <button 
                        type="submit" 
                        className="btnCreate"
                        >Create Pokemon</button>
                        <p className="formulario__mensaje-exito" id="formulario__mensaje-exito"></p>
                    </div>
                </form>
            </div>
            <br/>
            <br/>
        </div>
    )
}