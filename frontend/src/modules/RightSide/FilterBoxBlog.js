function FilterBoxBlog() {
    return (
      <div id="filterBox">
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="housing"/>
            <label>Housing</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="classes"/>
            <label>Classes</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="items"/>
            <label>Items</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="events"/>
            <label>Events</label>
          </div>
          <div className="filterRows">
            <input className="customCheckbox" type="checkbox" value="others"/>
            <label>Others</label>
          </div>
      </div>
    );
  }

  export default FilterBoxBlog