import React, { useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext';
import { API_URL } from '../MainPage';

function UploadItem () {
    const { token } = UserInfo()
    const history = useHistory()

    const nameRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const priceRef = useRef()

    const addItem = async () => {
        try {
            await axios.post(API_URL + '/api/items/add', {
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
        }
        catch (error) {
            console.error(error)
        }
    }

    const submitItem = (e) => {
        e.preventDefault()
        addItem()
        history.push("/home/store")
    };

    return (
        <>
            <div className="modalHeader">
                <h2>Upload Item</h2>
            </div>
            <div className="modalBody">
                <form onSubmit={submitItem} className="uploadForm">
                    <input type="text" className="uploadInput" placeholder="Item Title" ref={nameRef}></input>
                    <select className="uploadInput typeInput" defaultValue={'DEFAULT'} ref={categoryRef}>
                        <option id="optionPlaceholder" value="DEFAULT" disabled={true}>Item Type</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Lab Equipment">Lab Equipment</option>
                        <option value="Others">Others</option>
                    </select>
                    <input type="text" className="uploadInput" placeholder="Item Price" ref={priceRef}></input>
                    <label id="labelForFile" htmlFor="file" className="uploadInput">Insert Photo:</label>
                    <input id="inputFile" name="file" type="file" className="uploadInput"></input>
                    <textarea id="uploadDescription" className="uploadInput" placeholder="Item Description" ref={descriptionRef}></textarea>
                    <button type="submit"
                            className="uploadItem uploadModalButton siteButton">Upload
                    </button>
                </form>
            </div>
        </>
    )
}

export default UploadItem
