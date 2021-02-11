import React, { Component } from 'react'

class UploadQuestion extends Component {
    render() {
        return (
            <form style={{display: (this.props.questionModal) ? "flex" : "none"}}>
                 <textarea id="questionText" className="uploadInput" placeholder="Type a Question"></textarea>
                 <select id="typeInput" className="uploadInput" defaultValue={'DEFAULT'}>
                    <option id="optionPlaceholder" value="DEFAULT" disabled={true}>Item Type</option>
                    <option value="Housing">Housing</option>
                    <option value="Classes">Classes</option>
                    <option value="Items">Items</option>
                    <option value="Events">Events</option>
                    <option value="Others">Others</option>
                </select>
                <button className="uploadItem">Send</button>
            </form>
        )
    }
}

export default UploadQuestion
