import React, { useState, useEffect } from "react";
import c from "./Create.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, clearFilter, clearAll } from "../../redux/actions";

export default function Create() {

    const dispatch = useDispatch();
    const { types } = useSelector(store => store);

    const [err, setErr] = useState({});
    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: []
    });

    
    const regexs = {
        name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,25}$/,
        image_url: /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*){0,255}$/,
        number: /^\d+$/
    }

    function validate(input) {
        let err = {};

        if (!input.name) { err.name = "Name is required" }
        if (!regexs.name.test(input.name.trim())) {
        err.name = 'The name only accepts letters and must be between 3 and 25 characters' }

        if (!input.hp) { err.hp = "HP is required" }
        if (input.hp < 0 || input.hp > 200) { err.hp = 'Must be between 0 and 200' }
        if (!regexs.number.test(input.hp)) { err.hp = 'The required field accepts only numbers' }

        if (!regexs.image_url.test(input.img)) { input.img && (err.img = "Enter a valid URL or is going to be our default img") }

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
            <div className={c.divBtnCreate}>
                <Link to="/home">
                    <button className={c.btnBackCreate}>Back to home!</button>
                </Link>
            </div>
            <div>
                <br/>
                <h2 className={c.h2}>
                    CREATE YOUR POKEMON
                </h2>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={c.form}>
                        <div >
                            <label className={c.formLabel}>Name:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder="Nombre del pokemon"
                                    required
                                />
                            </div>
                            {err.name && ( <p className={c.inputError} >{err.name}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Hp:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="number"
                                    name="hp"
                                    value={input.hp}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {err.hp && ( <p className={c.inputError}>{err.hp}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Image URL:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="url"
                                    name="img"
                                    value={input.img}
                                    id="image"
                                    placeholder="Enter the URL of an image or be created with a default image"
                                />
                            </div>
                            {err.img && ( <p className={c.inputError} >{err.img}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Height:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="number"
                                    name="height"
                                    value={input.height}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {err.height && ( <p className={c.inputError}>{err.height}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Weight:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="number"
                                    name="weight"
                                    value={input.weight}
                                    min="0"
                                    max="9999"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {err.weight && ( <p className={c.inputError}>{err.weight}</p> )}
                        </div>
        
                        <div >
                            <label className={c.formLabel}>Attack:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="number"
                                    name="attack"
                                    value={input.attack}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {err.attack && ( <p className={c.inputError}>{err.attack}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Defense:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="number"
                                    name="defense"
                                    value={input.defense}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {err.defense && ( <p className={c.inputError}>{err.defense}</p> )}
                        </div>
        
                        <div >
                            <label className={c.formLabel}>speed:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className={c.formInput}
                                    type="number"
                                    name="speed"
                                    value={input.speed}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {err.speed && ( <p className={c.inputError}>{err.speed}</p> )}
                        </div>
                        
                        {/* ..... TIPOS ..... */}
                        <div>
                            <div>
                                <label className={c.formLabel}>types: </label>
                                <select
                                    className={c.formInput}
                                    onChange={(e) => handleSelect(e)}
                                >
                                <option disabled={input.types.length > 0}>Select Type</option>
                                    {
                                        types?.map((e, i) => (
                                            <option key={i}><input value={e.name}/>{e.name}</option>
                                        ))
                                    }
                                </select>
                                
                            </div>
                            {err.types && ( <p className={c.inputError} >{err.types}</p> )}
                        </div>

                        {/* ..... TIPOS SELECCIONADOS ..... */}
                        <div>
                            <div>
                                <div className={c.formLabel}>
                                    <label>types selected:</label>
                                    <br/>
                                    <div className={c.typeLateral}>
                                        {input.types?.map((element, i) =>
                                        <div key={i} className={c.typeElement}>
                                            <span> {element} </span>
                                            <button
                                                type="reset"
                                                // onClick={ ()=> handleDeleteTypes(element) }
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
                            className={c.btnCreate}
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


// {/* ..... TIPOS ..... */}
// <div>
// <div>
//     <label  onChange={e => handleSelect(e)}>
//     <option value={'SELECT'}>Select types</option>
//         {
//             types?.map((e, i) => (
//                 <label key={i}><input type="checkbox" value={e.name}/>{e.name}</label>
//             ))
//         }
//     </label>
// </div>
// {err.types && ( <p className={c.inputError} >{err.types}</p> )}
// </div>