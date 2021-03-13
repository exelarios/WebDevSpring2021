import { UserInfo, HomeFilterUpdate } from '../UserInfoContext'

function FilterBoxItem() {
    const { homeFilter } = UserInfo()
    const updateHomeFilter = HomeFilterUpdate()

    const changeFilter = id => {
        let newArr = [...homeFilter]
        newArr[id].checked = !newArr[id].checked
        updateHomeFilter(newArr)
    }

    return (
        <section>
            {homeFilter.map(item => {
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