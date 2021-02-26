import React, { Component } from 'react'

class FilterBoxQuestion extends Component {
    render() {
        return (
            <section>
                <label className="filterRows">
                    <input type="checkbox" value="housing"/>
                    <span className="customCheckbox"></span>
                    <p>Housing</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="classes"/>
                    <span className="customCheckbox"></span>
                    <p>Classes</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="items"/>
                    <span className="customCheckbox"></span>
                    <p>Items</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="events"/>
                    <span className="customCheckbox"></span>
                    <p>Events</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="others"/>
                    <span className="customCheckbox"></span>
                    <p>Others</p>
                </label>
            </section>
        )
    }
}

export default  FilterBoxQuestion;