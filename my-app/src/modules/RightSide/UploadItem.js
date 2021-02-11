import React, { Component } from 'react'

class UploadItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() {
        return (
            <form style={{display: (this.props.itemModal) ? "flex" : "none"}}>
                <input type="text" className="uploadInput" placeholder="Item Title"></input>
                <select className="uploadInput typeInput" defaultValue={'DEFAULT'}>
                    <option id="optionPlaceholder" value="DEFAULT" disabled={true}>Item Type</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Others">Others</option>
                </select>
                <input type="text" className="uploadInput" placeholder="Item Price"></input>
                <label id="labelForFile" htmlFor="file" className="uploadInput">Insert Photo:</label>
                <input id="inputFile" name="file" type="file" className="uploadInput"></input>
                <textarea id="uploadDescription" className="uploadInput" placeholder="Item Description"></textarea>
                <button className="uploadItem uploadModalButton siteButton">Upload</button>
            </form>
        )
    }
}

export default UploadItem
