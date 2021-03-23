import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserInfo, RefreshStore } from '../UserInfoContext';
import { API_URL } from '../MainPage';
import LoadingAnimation from '../../5.svg'

function UploadItem () {
    const { token } = UserInfo()
    const [itemId, setItemId] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const refreshStore = RefreshStore()
    const nameRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const priceRef = useRef()

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        picture: null
    });

    const config = {
        headers: {
            "Content-Type": 'multipart/form-data',
            Authorization: "Bearer " + token
        }
    }

    useEffect(() => {
        if(itemId !== "" && form.picture !== null) {
            submitPicture()
        }
    }, [itemId])

    async function submitPicture() {
        let payload = new FormData();
        payload.append("images", form.picture);

        await axios.put(`http://localhost:5000/api/items/${itemId}/upload`, payload,
        config)
        .then(() => {
            setLoading(false)
            refreshStore()
            history.push("/home/store")
        }, (error) => {
            console.error(error)
        })
    }

    const addItem = async () => {
        setLoading(true)
        try { 
            await axios.post('http://localhost:5000/api/items/add', {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                category: categoryRef.current.value,
                price: priceRef.current.value
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                console.log(response)
                setItemId(response.data.item.id)
            })
        }
        catch (error) {
            console.error(error)
        }
        if(form.picture === null) {
            refreshStore()
            history.push("/home/store")
        }
    }

    const submitItem = (e) => {
        e.preventDefault()
        addItem()
    };

    return (
        <>
            {loading ? (
                <div className="uploadLoadingScreen">
                    <img src={LoadingAnimation}></img>
                    Loading...
                </div>
            ) : (
                <>
                    <div className="modalHeader">
                        <h2>Upload Item</h2>
                    </div>
                    <div className="modalBody">
                        <form onSubmit={submitItem} className="uploadForm">
                            <input type="text" name="name" className="uploadInput" placeholder="Item Title"  ref={nameRef}></input>
                            <select className="uploadInput typeInput" name="category" defaultValue={'DEFAULT'} ref={categoryRef} >
                                <option id="optionPlaceholder" value="DEFAULT" disabled={true}>Item Type</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Books">Books</option>
                                <option value="Lab Equipment">Lab Equipment</option>
                                <option value="Others">Others</option>
                            </select>
                            <input type="text" className="uploadInput" name="price" placeholder="Item Price" ref={priceRef} ></input>
                            <label id="labelForFile" htmlFor="picture" className="uploadInput">Insert Photo:</label>
                            <input id="inputFile" name="picture" type="file" className="uploadInput" onChange={(event) => setForm({...form, [event.target.name]: event.target.files[0]})}></input>
                            <textarea id="uploadDescription" name="description"className="uploadInput" placeholder="Item Description" ref={descriptionRef}></textarea>
                            <button type="submit"
                                    className="uploadItem uploadModalButton siteButton">Upload
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}

export default UploadItem
