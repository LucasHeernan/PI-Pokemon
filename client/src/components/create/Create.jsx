import React, { useState, useEffect } from "react";
import "./create.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, clearFilter, clearAll } from "../../redux/actions";

export default function Create() {

    const dispatch = useDispatch();
    const { types } = useSelector(store => store);

    const [err, setErr] = useState({});
    const [input, setInput] = useState({
        name: "",
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        img: "",
        types: []
    });

    
    const regexs = {
        name: /^[ A-Za-z_@./#&+-]{3,20}$/,
        image_url: /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*){0,255}$/,
        number: /^\d+$/
    }

    function validate(input) {
        let err = {};

        if (!input.name) { err.name = "Name is required" }
        if (!regexs.name.test(input.name.trim())) {
        err.name = 'The name must be text type and must be between 3 and 20 characters' }

        if (!input.hp) { err.hp = "HP is required" }
        if (input.hp < 0 || input.hp > 200) { err.hp = 'Must be between 0 and 200' }
        if (!regexs.number.test(input.hp)) { err.hp = 'The required field accepts only numbers' }

        if (!regexs.image_url.test(input.img)) { err.img = "Enter a valid URL or is going to be our default img" }

        if (!input.attack) { err.attack = 'Attack is required' }
        if (input.attack < 0 || input.attack > 200) { err.attack = 'Attack must be between 0 and 200' }
        if (!regexs.number.test(input.attack)) { err.attack = 'The required field accepts only numbers' }

        if (!input.defense) { err.defense = 'Defense is required' }
        if (input.defense < 0 || input.defense > 200) { err.defense = 'Defense must be between 0 and 200' }
        if (!regexs.number.test(input.defense)) { err.defense = 'The required field accepts only numbers' }

        if (!input.speed) { err.speed = 'Speed is required' }
        if (input.speed < 0 || input.speed > 200) { err.speed = 'Speed must be between 0 and 200' } 
        if (!regexs.number.test(input.speed)) { err.speed = 'The required field accepts only numbers' }

        if (!input.height) { err.height = "Height is required" }
        if (input.height < 0 || input.height > 200) { err.height = 'Height must be between 0 and 200' } 
        if (!regexs.number.test(input.height)) { err.height = 'The required field accepts only numbers' }

        if (!input.weight) { err.weight = "Weight is required" }
        if (input.weight < 0 || input.weight > 9999) { err.weight = 'Weight must be between 0 and 9999' }
        if (!regexs.number.test(input.weight)) { err.weight = 'The required field accepts only numbers' }

        if (input.types.length === 0) { err.types = 'At least one kind is required' }
        if (input.types.length === 1 || input.types.length === 2) { err.types = '' }
        if (input.types.length > 2) { err.types = 'You can only choose 2 types per pokemon' } 
        return err
    }

    function handleChange(e) {
        setInput({
           ...input,
           [e.target.name]: e.target.value
        });
        setErr(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input));
        setInput({
            name: "",
            hp: null,
            attack: null,
            defense: null,
            speed: null,
            height: null,
            weight: null,
            img: "",
            types: []
        });
    }

    function handleSelect(e) {
        if (e.target.value !== 'SELECT') {
            if (input.types.length > 2) {
                setErr(validate(input));
            } else {
                setInput({
                ...input,
                types: [...input.types, e.target.value],
                });
                setErr(validate(input));
            }
        }
    }

    useEffect(() => {
        types.length < 2 && dispatch(getTypes());
        return () => {
            dispatch(clearFilter());
            dispatch(clearAll());
        }
    }, [dispatch, types])

    return (
        <div>
            <br/>
            <div className="divBtnCreate">
                <Link to="/home">
                    <button className="btnBackCreate">Back to home!</button>
                </Link>
            </div>
            <div>
                <br/>
                <h2 className="h2">
                    CREATE YOUR POKEMON
                </h2>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="formulario">
                        <div className="formulario__grupo">
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
                            {err.name && ( <p className="formulario__input-error"  >{err.name}</p> )}
                        </div>

                        <div className="formulario__grupo">
                            <label className="formulario__label">Hp:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="hp"
                                    min="0"
                                    max="200"
                                    placeholder="120"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                            {err.hp && ( <p className="formulario__input-error">{err.hp}</p> )}
                        </div>

                        <div className="formulario__grupo">
                            <label className="formulario__label">Image URL:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="url"
                                    name="img"
                                    id="image"
                                    placeholder="URL of the Pokemon image"
                                />
                                <i className="formulario__validacion-estado" ></i>
                            </div>
                            {err.img && ( <p className="formulario__input-error" >{err.img}</p> )}
                        </div>

                        <div className="formulario__grupo">
                            <label className="formulario__label">Height:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="height"
                                    min="0"
                                    max="200"
                                    placeholder="50"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                            {err.height && ( <p className="formulario__input-error">{err.height}</p> )}
                        </div>

                        <div className="formulario__grupo">
                            <label className="formulario__label">Weight:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="weight"
                                    min="0"
                                    max="9999"
                                    placeholder="350"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                            {err.weight && ( <p className="formulario__input-error">{err.weight}</p> )}
                        </div>
        
                        <div className="formulario__grupo">
                            <label className="formulario__label">Attack:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="attack"
                                    min="0"
                                    max="200"
                                    placeholder="40"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                            {err.attack && ( <p className="formulario__input-error">{err.attack}</p> )}
                        </div>

                        <div className="formulario__grupo">
                            <label className="formulario__label">Defense:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="defense"
                                    min="0"
                                    max="200"
                                    placeholder="90"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                            {err.defense && ( <p className="formulario__input-error">{err.defense}</p> )}
                        </div>
        
                        <div className="formulario__grupo">
                            <label className="formulario__label">speed:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="formulario__input"
                                    type="number"
                                    name="speed"
                                    min="0"
                                    max="200"
                                    placeholder="120"
                                    required
                                />
                                <i className="formulario__validacion-estado"  ></i>
                            </div>
                            {err.speed && ( <p className="formulario__input-error">{err.speed}</p> )}
                        </div>
                        
                        <div className="formulario_flex">
                            <div id="types">
                                <label onChange={e => handleSelect(e)}>
                                <option value={'SELECT'}>Select types</option>
                                    {   
                                        types?.map((e, i) => (
                                            <label key={i}><input type="checkbox" value={e.name}/>{e.name}</label>
                                        ))
                                    }
                                </label>
                            </div>
                            {err.types && ( <p className="formulario__input-error" >{err.types}</p> )}
                        </div>
                    </div>
        
                    <div className="formulario__grupo-btn-enviar">
                        {/* <Link to='/home'> */}
                            <button 
                            type="submit" 
                            className="btnCreate"
                            >Create Pokemon</button>
                            <p className="formulario__mensaje-exito" id="formulario__mensaje-exito"></p>
                        {/* </Link> */}
                    </div>
                </form>
            </div>
            <br/>
            <br/>
        </div>
    )
}
