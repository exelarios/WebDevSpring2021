import React, { Component } from 'react'

class FilterBoxItem extends Component {
    render() {
        return (
            <section>
                <label className="filterRows">
                    <input type="checkbox" value="apparel"/>
                    <span className="customCheckbox"></span>
                    <p>Apparel</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="electronic"/>
                    <span className="customCheckbox"></span>
                    <p>Electronics</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="books"/>
                    <span className="customCheckbox"></span>
                    <p>Books</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="lab-equipment"/>
                    <span className="customCheckbox"></span>
                    <p>Lab Equipment</p>
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

export default FilterBoxItem;