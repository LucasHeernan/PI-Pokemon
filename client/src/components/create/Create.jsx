import React from "react";
import { useCreate } from "./useCreate.js"
import c from "./Create.module.css";
import { Link } from "react-router-dom";


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

export default function Create() {

    const inicialForm = {
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: []
    };

    const { 
        form,
        errors,
        types,
        handleChange,
        handleError,
        handleSelect,
        handleDelete,
        handleSubmit
    } = useCreate(inicialForm, validate)

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
                
                <form onSubmit={handleSubmit}>
                    <div className={c.form}>
                        <div >
                            <label className={c.formLabel}>Name:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="text"
                                    name="name"
                                    value={form.name}
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
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="number"
                                    name="hp"
                                    value={form.hp}
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
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="url"
                                    name="img"
                                    value={form.img}
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
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="number"
                                    name="height"
                                    value={form.height}
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
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="number"
                                    name="weight"
                                    value={form.weight}
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
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="number"
                                    name="attack"
                                    value={form.attack}
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
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="number"
                                    name="defense"
                                    value={form.defense}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {errors.defense && ( <p className={c.inputError}>{errors.defense}</p> )}
                        </div>
        
                        <div >
                            <label className={c.formLabel}>speed:</label>
                            <div className={c.divFInput}>
                                <input
                                    onChange={handleChange}
                                    onBlur={handleError}
                                    className={c.formInput}
                                    type="number"
                                    name="speed"
                                    value={form.speed}
                                    min="0"
                                    max="200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {errors.speed && ( <p className={c.inputError}>{errors.speed}</p> )}
                        </div>
                        
                        {/* ..... TIPOS ..... */}
                        <div>
                            <div>
                                <label className={c.formLabel}>types: </label>
                                <select
                                    className={c.formInput}
                                    onChange={handleSelect}
                                >
                                <option disabled={form.types.length > 0}>Select Type</option>
                                    {
                                        types?.map((e, i) => (
                                            <option key={i} value={e.name}>{e.name}</option>
                                        ))
                                    }
                                </select>
                                
                            </div>
                            {errors.types && ( <p className={c.inputError} >{errors.types}</p> )}
                        </div>

                        {/* ..... TIPOS SELECCIONADOS ..... */}
                        <div>
                            <div>
                                <div className={c.formLabel}>
                                    <label>types selected:</label>
                                    <br/>
                                    <div className={c.typeLateral}>
                                        {form.types?.map((element, i) =>
                                        <div key={i} className={c.typeElement}>
                                            <span> {element} </span>
                                            <button
                                                type="reset"
                                                onClick={()=> handleDelete(element)}
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
// {errors.types && ( <p className={c.inputError} >{errors.types}</p> )}
// </div>