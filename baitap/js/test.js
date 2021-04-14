function checkname() {
    let text, x = document.getElementById("txtname").value;
    let name = x.split('');    
    if ( name.length >= 10 || Number(name[0])) {
        text = "Name is invalid";
    }  else {
        text=""; }
    if ( x.length < 1 ) 
        text ="Name is required";
    document.getElementById("name-warning").innerHTML = text ;
}
function Valid2() { 
    let y,text2;
    y = document.getElementById("Category").value;
    if ( y = "0") {
        text2 = "Category is required";
    }
    document.getElementById("invalid2").innerHTML = text2 ;
}
let loadFile = function(event) {
    let reader = new FileReader();
    reader.onload = function(){
      let output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };