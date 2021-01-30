function FilterBox() {
    return (
      <div>
        <div class="filter-box">
          <input type="checkbox" value="apparel"/>
          <label>Apparel</label>
          <hr/>
          <input type="checkbox" value="electronic"/>
          <label>Electronics</label>
          <hr/>
          <input type="checkbox" value="books"/>
          <label>Books</label>
          <hr/>
          <input type="checkbox" value="lab-equipment"/>
          <label>Lab Equipment</label>
          <hr/>
          <input type="checkbox" value="others"/>
          <label>Others</label>
        </div>
      </div>
    );
  }

  export default FilterBox