//-------------------------Input Search--------------------------------
let val= ""
var inputText = document.querySelector("#searchBox")
inputText.addEventListener("keyup", search)
function search(event) {
var val = event.target.value    
var datosPlantilla = data.eventos
var datos = datosPlantilla.filter(events => events.name.toLowerCase().includes(val.toLowerCase()))

displayCard(datos)
}

//-----------------------Función para mostrar las cartas----------------

function displayCard(datos) {

    var cards = ""
    if (datos.length !== 0) {
    for (i = 0; i < datos.length; i++){

    cards += ` <div class="card raise mt-5 mb-5 bg-dark rounded" style="width: 20rem;">
    <img src="${datos[i].image}" id="img-events" class="img-events card-img-top mt-3 pe-2 ps-2 bg-dark" style="height:30vh" alt="EventImage">
    <div class="card-body font bg-dark">
    <h5 class="card-title">Name: ${datos[i].name}</h5>
    <p class="card-text">Date: ${datos[i].date}</p>
    <p class="card-text">Description: ${datos[i].description}</p>
    <p class="card-text">Category: ${datos[i].category}</p>
    <div class="d-flex justify-content-between align-items-center">
    <p class="fw-bold">Price: $${datos[i].price}</p>
    <a href="/details.html?id=${datos[i].id}"
    class="btn bg-danger text-white pulse">See more</a>
    </div>
    </div>
    </div>
    `;
    } 
}else{cards = ` <img src="/Images/noresults.webp" id="img-events" class="" style="height:80vh" alt="NothingFound">`
    }//Imprime un alerta de datos no encontrados del input
    document.querySelector(".containercards").innerHTML = cards;
}




//--------------------------Checkbox--------------------------------

//CREO LOS CHECKBOX, LOS IMPRIMO EN PANTALLA 

function crearCheckbox(){
var inputCheckbox = document.getElementById("check-bar")
var todosLosCheck = data.eventos.map(cat => cat.category) // Reccorro el array data.eventos y separo la propiedad Category que necesito para filtrar los check
var newCheckboxes = new Set(todosLosCheck)
var checkBoxesFilter = [...newCheckboxes]//Guardo el dato obtenido de la var newCheckboxes en una nueva var checkBoxesFilter

var inputCheckB = ""
checkBoxesFilter.forEach(c=>{  //Recorro el array checkBoxes con un parametro nombrado como "c"

    inputCheckB += `
    <div class="form-check">
    <input class="form-check-input m-1" type="checkbox" value="${c}" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
    ${c}
    </label>
</div>
    `
})

inputCheckbox.innerHTML = inputCheckB//Imprimo en HTML los checkbox de la planilla de datos


var id = 1
data.eventos.map(event =>event.id = id++)
}
crearCheckbox()


var checkboxSelected = []
var checkbox = document.querySelectorAll('input[type=checkbox]') //Guardo los checkbox creados dinamicamente en una variable
checkbox.forEach(check => check.addEventListener("click", (event)=> {
    var checked = event.target.checked
    if (checked) { //Establezco un condicional que verifica si la propiedad/atributo checked del elemento html, es true o false, es decir si esta tildado o no el checkbox
        checkboxSelected.push(event.target.value) //Si esta tildado lo empujo lo guardo dentro de la variable local declarada anteriormente
        filterArray()
    //LLamo y les paso el parametro a la funcion que se ocupara del filtrado dl array
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value) 
        //Este metodo lo utilizo para quitar del array en checkbox deschequeado
        filterArray()//LLamo y les paso el parametro a la funcion que se ocupara del filtrado dl array

    }//En el caso que el checkbox sea destildado es decir pase de true a false, le  aplico a la varible checkboxSelected un filtros en el cual 
}))


//---------------Función de Filtrado----------------
function filterArray() {
    let datos = []
    if (checkboxSelected.length > 0 && val !== ""){
        checkboxSelected.map(category => {
            datos.push(...data.eventos.filter(cat => cat.name.toLowerCase().includes(textSearch.trim().toLowerCase())&&
                cat.category == category))
        
        })
    }
        else if (checkboxSelected.length > 0 && val === "") {
        checkboxSelected.map(category => datos.push(...data.eventos.filter(cat => cat.name && cat.category == category)))
        }   
        else if (checkboxSelected.length == 0 && val !== "") {
            datos.push(...data.eventos.filter(datos => datos.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
        }
     else{
        datos.push(...data.eventos)
    }  

displayCard(datos);
}

filterArray()

