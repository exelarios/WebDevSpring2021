import { UserInfo, PageFilterUpdate } from '../UserInfoContext'

function FilterBoxItem() {
    const { storeFilter } = UserInfo()
    const updateHomeFilter = PageFilterUpdate()

    const changeFilter = id => {
        let newArr = [...storeFilter]
        newArr[id].checked = !newArr[id].checked
        updateHomeFilter(newArr)
    }

    return (
        <section>
            {storeFilter.map(item => {
                return (
                    <label className="filterRows" style={{backgroundColor: (item.checked) ? "#588b60" : "#69a673"}} key={item.id}>
                        <input type="checkbox" value={item.category} onClick={() => changeFilter(item.id)}/>
                        <span className="customCheckbox"></span>
                        <p>{item.category}</p>
                    </label>
                )
            })}
        </section>
    )
}

export default FilterBoxItem;