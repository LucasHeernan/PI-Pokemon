import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon, clearFilter, getAllPokemons} from "../../redux/actions";

export const useCreate = (initialForm, validate) => {

    const dispatch = useDispatch();
    const { types } = useSelector(state => state);
    const history = useHistory();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
        setErrors(validate(form));
    };

    const handleError = (e) => {
        handleChange(e);
        setErrors(validate(form));
    };

    const handleSelect = (e) => {
        if(e.target.value !== 'Select Type') {
            if(!form.types.includes(e.target.value)) {
                setForm({
                    ...form,
                    types: [...form.types, e.target.value],
                });
                setErrors(validate(form));
            }
        }
    }

    const handleDelete = (type) => {
        setForm({
            ...form,
            types: form.types.filter(e => e !== type)
        })
    }

    useEffect(() => {
        types.length < 2 && dispatch(getTypes());
        return () => {
            dispatch(clearFilter());
        }
    }, [dispatch, types])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(form))
        if(!form.types.length){
            alert('Need to add at least one type of Pokemon')
        } else {
            if (Object.keys(errors).length < 1) {
                dispatch(postPokemon(form))
                    .then((res) => {
                        history.push('/home')
                        dispatch(getAllPokemons());
                })
                alert ("Your pokemon has been successfully created");
            } else {
                alert ('Missing data or errors in data loading')
            }
        }
    }

    return {
        form,
        errors,
        types,
        handleChange,
        handleError,
        handleSelect,
        handleDelete,
        handleSubmit
    };
};