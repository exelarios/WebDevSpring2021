import React, { Component } from 'react'

class FilterBoxItem extends Component {
    render() {
        return (
            <section>
                <label className="filterRows">
                    <input type="checkbox" value="apparel"/>
                    <span class="customCheckbox"></span>
                    <p>Apparel</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="electronic"/>
                    <span class="customCheckbox"></span>
                    <p>Electronics</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="books"/>
                    <span class="customCheckbox"></span>
                    <p>Books</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="lab-equipment"/>
                    <span class="customCheckbox"></span>
                    <p>Lab Equipment</p>
                </label>
                <label className="filterRows">
                    <input type="checkbox" value="others"/>
                    <span class="customCheckbox"></span>
                    <p>Others</p>
                </label>
            </section>
        )
    }
}

export default FilterBoxItem;