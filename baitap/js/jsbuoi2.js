var reader ="";
var table = document.getElementById("idtable").getElementsByTagName("tbody")[0];
function load_data() {
    let count = 1;
    let  item_list = JSON.parse(sessionStorage.getItem("item_list"));
    item_list.forEach(element => {
        let item = JSON.parse(element);
        addrow(item,count);
        count++;
    });

}

function addrow(item , count){
    
    let row = table.insertRow(count);
    let btnedit = document.createElement("button");
    let btndelete = document.createElement("button");
    let txtname = document.createElement("input");
    let cbb = document.createElement("select"); 

        let img = new Image();
        img.src = item._img;
        img.width = 200;
        img.height = 100;
       
        btnedit.className = "btn-primary";
        btnedit.innerHTML ="EDIT";
        btnedit.id = "btnedit"+count;  
        btnedit.onclick = item_edit;

        btndelete.className = "btn-danger";
        btndelete.innerHTML ="DELETE";
        btndelete.id = "btndelete"+count;
        btndelete.onclick = item_delete;

        txtname.setAttribute("type","text");
        txtname.readOnly=true;
        txtname.setAttribute("value",item._name);

        var array = ["Not Selected","Category1","Category2","Category3"];
        cbb.id="idcbb";
        for (let i = 0; i < array.length; i++) {
            let option = document.createElement("option");
            option.value = array[i];
            option.text = array[i];
            cbb.add(option);
        }
        cbb.value=item._category;
        cbb.disabled = true;

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.innerHTML = count;
        cell1.appendChild(txtname);
        cell2.appendChild(cbb);
        cell3.appendChild(img);
        cell4.appendChild(btnedit);
        cell4.appendChild(btndelete);
}

function readURL(input) {
    let img=document.getElementById("idimg");
        if (input.files && input.files[0]) {
            reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
                img.width = 150;
                img.height = 100;
            };
                reader.readAsDataURL(input.files[0]);
        }
}

function submit(){
    let name = document.getElementById("txtname").value;
    let category = document.getElementById("categories").value;
    let item_list = JSON.parse(sessionStorage.getItem("item_list"));
    let count;
    if(item_list == null) {
        item_list = [];
    }
    if(check(name,category)){
        const item = {
            _name : name,
            _category : category,
            _img : reader.result
        }
        item_list.push(JSON.stringify(item));
        sessionStorage.setItem("item_list",JSON.stringify(item_list));
        count=item_list.length;
        addrow(item , count);
        location.reload();
    }
}

function item_edit() {
    
}

function item_delete(){
    let item_list = JSON.parse(sessionStorage.getItem("item_list"));
    let index = this.id.replace("btndelete","");
    let row = table.rows[index];
    let itemname = row.cells[1].childNodes[0].value;

    table.deleteRow(index);
    for(let i = 0 ; i < item_list.length ; i++){
        let item = JSON.parse(item_list[i]);
        if(itemname === item._name) {
            item_list.splice(i,1);  
        }
    }
    sessionStorage.setItem("item_list",JSON.stringify(item_list));
    location.reload();
}
function check(name,category){
    var item_list;
    var item;
    let a = true;
    //check name
    if(name.length >= 10 || Number(name[0])){
        console.log(Number(name[0]));
        document.getElementById("name-warning").innerHTML = "Name is invalid";
        a = false;
    } 
    if(name.length < 1) {
        document.getElementById("name-warning").innerHTML = "Name is required";
        a =  false;
    }
    if(a == true) {
        document.getElementById("name-warning").innerHTML = null;
    }
    //check category
    if(category != "Not Selected"){
        document.getElementById("category-warning").innerHTML = null;
    } 
    if(category == "Not Selected"){
        document.getElementById("category-warning").innerHTML = "Category is required";
        a = false;
    }
    //check img
    item_list = JSON.parse(sessionStorage.getItem("item_list"));
    if(item_list != null) {
        item = item_list.map(x => JSON.parse(x)).filter(x => x._name == name);
        console.log(item);
        if(!item.toString() == ""){
            document.getElementById("name-warning").innerHTML = "Item has already exists";
            a = false;
        }
    }
    return a;
}