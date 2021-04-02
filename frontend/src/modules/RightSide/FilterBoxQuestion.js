import React, { } from 'react'
import { UserInfo, PageFilterUpdate } from '../UserInfoContext'

function FilterBoxQuestion() {
    const { blogFilter } = UserInfo()
    const updateBlogFilter = PageFilterUpdate()

    const changeFilter = id => {
        let newArr = [...blogFilter]
        newArr[id].checked = !newArr[id].checked
        updateBlogFilter(newArr)
    }

    return (
        <section>
            {blogFilter.map(item => {
                return (
                    <label className="filterRows" key={item.id}>
                        <input type="checkbox" value={item.category} onClick={() => changeFilter(item.id)}/>
                        <span className="customCheckbox"></span>
                        <p>{item.category}</p>
                    </label>
                )
            })}
        </section>
    )
}

export default FilterBoxQuestion;