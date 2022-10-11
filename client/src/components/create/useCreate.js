import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions";

export const useForm = (initialForm, validateForm) => {

    const dispatch = useDispatch();
    const { types } = useSelector(state => state);
    const history = useHistory();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleError = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSelect = (e) => {
        if(e.target.value !== 'Select Type') {
            if(!form.types.includes(e.target.value)) {
                setForm({
                    ...form,
                    types: [...form.types, e.target.value],
                });
                setErrors(validateForm(form));
            }
        }
    }

    const handleDelete = (e) => {
        setForm({
            ...form,
            types: form.types.filter(e => e !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const  handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validateForm(form))
        if(!form.types.length){
            alert('Need to add at least one type of Pokemon')
        } else {
            if (Object.keys(errors).length === 0) {
                alert ("submitting form");
                dispatch(postPokemon(form))
                    .then((res) => {
                    console.log(res)
                    history.push('/home')
                    alert(res)
                })
            } else {
                alert ('missing data or errors in data loading')
            }
        }
    }

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleError,
        handleSelect,
        handleDelete,
        handleSubmit,
    };
};