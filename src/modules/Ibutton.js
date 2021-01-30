function Ibutton() {
    
    function OpenItem(){
        alert("good");
      return;
    }

    return(
        <div class="ibutton">
            <button type="button" onClick={OpenItem}> I </button>
        </div>
    );
}

export default Ibutton;
    