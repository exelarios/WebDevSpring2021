import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { UserInfoUpdate } from '../UserInfoContext'

function SignUp() {
    const [registerToken, setRegisterToken] = useState("")
    const updateUser = UserInfoUpdate();
    const history = useHistory();
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        profilePic: null
    });
    const [formError, setFormError] = useState({
        email: true,
        firstName: true,
        lastName: true,
        password: true
    });
    const [errors, setErrors] = useState({});

    const config = { 
        headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + registerToken
        } 
    };

    useEffect(() => {
        if(registerToken !== "" && form.profilePic !== null) {
            submitPicture()
        }
    }, [registerToken])

    const handleOnChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
        setFormError({...formError, [event.target.name]: event.target.value.length <= 0})
    }

    async function submitPicture() {
        let payload = new FormData();
        payload.append("picture", form.profilePic);
        for (var [key, value] of payload.entries()) { 
            console.log(key, value);
        }

        await axios.put("http://localhost:5000/api/users/picture/", payload,
        config)
        .then(response => {
            console.log(response)
            history.push("/home/store")
        }, (error) => {
            console.error(error)
        })
    }

    const checkPayload = (payload, key, error) => {
        payload.append(key, form[key]);
        if(formError[key]) {
            error[key] = "Field is Empty"
        }
    }

    const submitRegistration = async e => {
        e.preventDefault()
        let keys = ["email", "firstName", "lastName", "password"];
        let Errors = {};
        try {
            let payload = new FormData();
            keys.forEach(element => checkPayload(payload, element, Errors))
            await axios.post("http://localhost:5000/api/auth/register", payload,
            config)
            .then(response => {
                updateUser(response.data)
                setRegisterToken(response.data.token)
                if(form.profilePic === null) {
                    history.push("/home/store")
                }
            }, (error) => {
                console.log(Errors.email)
                setErrors(Errors);
                console.error(error)
            })
        } catch(error) {
            console.error(error.response);
        }
/*      updateUser(registerResponse)
        setRegisterToken(registerResponse.token) */
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form id="signUpForm" className="signForm">
                <label className="labelEntry" htmlFor="email">Email:</label>
                <input type="email" className="entryInput" name="email" onChange={(event) => handleOnChange(event)}></input>
                <h3 className="errorMessage">{errors.email}</h3>
                <label className="labelEntry" htmlFor="password">Password:</label>
                <input type="password" className="entryInput" name="password" onChange={(event) => handleOnChange(event)}></input>
                <h3 className="errorMessage">{errors.password}</h3>
                <label className="labelEntry" htmlFor="firstName">First Name:</label>
                <input className="entryInput" name="firstName" onChange={(event) => handleOnChange(event)}></input>
                <h3 className="errorMessage">{errors.firstName}</h3>
                <label className="labelEntry" htmlFor="lastName">Last Name:</label>
                <input className="entryInput" name="lastName" onChange={(event) => handleOnChange(event)}></input>
                <h3 className="errorMessage">{errors.lastName}</h3>
                <label id="labelForFile" htmlFor="file" className="uploadInput">Upload Profile Picture:</label>
                <input id="inputFile" name="profilePic" type="file" className="uploadInput" onChange={(event) => setForm({...form, [event.target.name]: event.target.files[0]})}></input>
                <button className="uploadItem entryButton linkMargin" onClick={submitRegistration}>Submit</button>
            </form>
        </>
    )
}

export default SignUp