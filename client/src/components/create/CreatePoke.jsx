import React, { useState, useEffect } from "react";
import c from "./Create.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, clearHome, postPokemon } from "../../redux/actions";

const regexs = {
    name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,25}$/,
    image_url: /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*){0,255}$/,
    number: /^\d+$/
}

const validate = (input) => {
    let errors = {};

    if (!input.name) { errors.name = "Name is required" }
    if (!regexs.name.test(input.name.trim())) {
    errors.name = 'The name only accepts letters and must be between 3 and 25 characters' }

    if (!input.hp) { errors.hp = "HP is required" }
    if (input.hp < 0 || input.hp > 200) { errors.hp = 'Must be between 0 and 200' }
    if (!regexs.number.test(input.hp)) { errors.hp = 'The required field accepts only numbers' }

    if (!regexs.image_url.test(input.img)) { input.img && (errors.img = "Enter a valid URL or is going to be our default img") }

    if (!input.attack) { errors.attack = 'Attack is required' }
    if (input.attack < 0 || input.attack > 200) { errors.attack = 'Attack must be between 0 and 200' }
    if (!regexs.number.test(input.attack)) { errors.attack = 'The required field accepts only numbers' }

    if (!input.defense) { errors.defense = 'Defense is required' }
    if (input.defense < 0 || input.defense > 200) { errors.defense = 'Defense must be between 0 and 200' }
    if (!regexs.number.test(input.defense)) { errors.defense = 'The required field accepts only numbers' }

    if (!input.speed) { errors.speed = 'Speed is required' }
    if (input.speed < 0 || input.speed > 200) { errors.speed = 'Speed must be between 0 and 200' }
    if (!regexs.number.test(input.speed)) { errors.speed = 'The required field accepts only numbers' }

    if (!input.height) { errors.height = "Height is required" }
    if (input.height < 0 || input.height > 200) { errors.height = 'Height must be between 0 and 200' }
    if (!regexs.number.test(input.height)) { errors.height = 'The required field accepts only numbers' }

    if (!input.weight) { errors.weight = "Weight is required" }
    if (input.weight < 0 || input.weight > 9999) { errors.weight = 'Weight must be between 0 and 9999' }
    if (!regexs.number.test(input.weight)) { errors.weight = 'The required field accepts only numbers' }

    if (input.types.length === 0) { errors.types = 'At least one kind is required' }
    if (input.types.length > 2) { errors.types = 'You can only choose 2 types per pokemon' }
    return errors
}

export default function CreatePoke () {

    const dispatch = useDispatch();
    const { types } = useSelector(store => store);
    const history = useHistory();

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
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
    };

    const handleErrors = (e) => {
        handleChange(e);
        setErrors(validate(input));
    };

    const handleType = (e) => {
        if(e.target.value !== 'Select Type') {
            if(!input.types.includes(e.target.value)) {
                setInput({
                    ...input,
                    types: [...input.types, e.target.value],
                });
                setErrors(validate(input));
            }
        }
    }

    const handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter(e => e !== type)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!Object.keys(errors).length) {
            dispatch(postPokemon(input)).then(res => {
                history.push('/home');
            });
            alert ('YOUR POKEMON HAS BEEN SUCCESSFULLY CREARED');
        } else {
            alert ('MISSING DATA OR ERRORS IN DATA LOADING');
        }
    }

    useEffect(() => {
        !types.length && dispatch(getTypes());
        return () => {
            dispatch(clearHome());
        }
    }, [dispatch, types]);

    return (
        <div>
            <br/>
            <div className={c.divBtnCreate}>
                <button
                    onClick={() => {history.push('/home')}}
                    className={c.btnBackCreate}
                >Back to home!</button>
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
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
                                    className={c.formInput}
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder="Nombre del pokemon"
                                    required
                                />
                            </div>
                            {errors.name && ( <p className={c.inputError} >{errors.name}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Hp:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
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
                            {errors.hp && ( <p className={c.inputError}>{errors.hp}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Image URL:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
                                    className={c.formInput}
                                    type="url"
                                    name="img"
                                    value={input.img}
                                    id="image"
                                    placeholder="Enter the URL of an image or be created with a default image"
                                />
                            </div>
                            {errors.img && ( <p className={c.inputError} >{errors.img}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Height:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
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
                            {errors.height && ( <p className={c.inputError}>{errors.height}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Weight:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
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
                            {errors.weight && ( <p className={c.inputError}>{errors.weight}</p> )}
                        </div>
        
                        <div >
                            <label className={c.formLabel}>Attack:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
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
                            {errors.attack && ( <p className={c.inputError}>{errors.attack}</p> )}
                        </div>

                        <div >
                            <label className={c.formLabel}>Defense:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
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
                            {errors.defense && ( <p className={c.inputError}>{errors.defense}</p> )}
                        </div>
        
                        <div >
                            <label className={c.formLabel}>Speed:</label>
                            <div className={c.divFInput}>
                                <input
                                    // onChange={(e) =>handleChange(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleChange}
                                    onBlur={handleErrors}
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
                            {errors.speed && ( <p className={c.inputError}>{errors.speed}</p> )}
                        </div>

                        
                        <div>
                            <div>
                                <label className={c.formLabel}>Types: </label>
                                <select
                                    className={c.formInput}
                                    // onChange={(e) => handleType(e)}
                                    // onBlur={(e) => handleErrors(e)}
                                    onChange={handleType}
                                    onBlur={handleErrors}
                                >
                                    <option>Select Type</option>
                                    {
                                        types?.map((e, i) => (
                                            <option key={i} value={e.name}>{e.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {errors.types && ( <p className={c.inputError} >{errors.types}</p> )}
                        </div>


                        <div className={c.formLabel}>
                            <label>Types Selected:</label>
                            <br/>
                            <div className={c.typeLateral}>
                                {input.types?.map((e, i) =>
                                <div key={i} className={c.typeElement}>
                                    <span>{e}</span>
                                    <button
                                        className={c.btnDelete}
                                        type="reset"
                                        onBlur={() => handleErrors(e)}
                                        onClick={()=> handleDelete(e)}
                                    >X</button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
        
                    <div>
                        <button
                            disabled={Object.keys(errors).length ? true : false}
                            type="submit" 
                            className={c.btnCreate}
                        >Create Pokemon</button>
                    </div>
                </form>
            </div>
            <br/>
            <br/>
        </div>
    )
}