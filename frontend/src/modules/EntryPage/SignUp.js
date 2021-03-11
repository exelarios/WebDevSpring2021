import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { UserInfoUpdate } from '../UserInfoContext'

function SignUp() {
    const [registerToken, setRegisterToken] = useState("")
    const updateUser = UserInfoUpdate();
    const history = useHistory();
    const [form, setForm] = useState({
        email: "ayylmao@cpp.edu",
        firstName: "Bob",
        lastName: "Smith",
        password: "password",
        profilePic: null
    });

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

    const submitRegistration = async e => {
        e.preventDefault()
        let registerResponse
        try {
            let payload = new FormData();
            payload.append("email", form.email);
            payload.append("firstName", form.firstName);
            payload.append("lastName", form.lastName);
            payload.append("password", form.password);
 
            registerResponse = await axios.post("http://localhost:5000/api/auth/register", payload,
            config)
            .then(response => {
                return response.data
            })

        } catch(error) {
            console.error(error.response);
        }
        updateUser(registerResponse)
        setRegisterToken(registerResponse.token)
        if(form.profilePic === null) {
            history.push("/home/store")
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form id="signUpForm" className="signForm">
                <label className="labelEntry" htmlFor="email">Email:</label>
                <input type="email" className="entryInput" name="email" onChange={(event) => handleOnChange(event)}></input>
                <label className="labelEntry" htmlFor="password">Password:</label>
                <input type="password" className="entryInput" name="password" onChange={(event) => handleOnChange(event)}></input>
                <label className="labelEntry" htmlFor="firstName">First Name:</label>
                <input className="entryInput" name="firstName" onChange={(event) => handleOnChange(event)}></input>
                <label className="labelEntry" htmlFor="lastName">Last Name:</label>
                <input className="entryInput" name="lastName" onChange={(event) => handleOnChange(event)}></input>
                <label id="labelForFile" htmlFor="file" className="uploadInput">Upload Profile Picture:</label>
                <input id="inputFile" name="profilePic" type="file" className="uploadInput" onChange={(event) => setForm({...form, [event.target.name]: event.target.files[0]})}></input>
                <button className="uploadItem entryButton linkMargin" onClick={submitRegistration}>Submit</button>
            </form>
        </>
    )
}

export default SignUp