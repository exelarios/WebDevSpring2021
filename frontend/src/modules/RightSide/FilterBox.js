function FilterBox() {
    return (
      <div id="filterBox">
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="apparel"/>
            <label>Apparel</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="electronic"/>
            <label>Electronics</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="books"/>
            <label>Books</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="lab-equipment"/>
            <label>Lab Equipment</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="others"/>
            <label>Others</label>
          </div>
      </div>
    );
  }

  export default FilterBox