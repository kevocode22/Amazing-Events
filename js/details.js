

let contentCards = [];




async function getDatafromAPI() { //Creo la función asincrona 
    await fetch("https://amazing-events.herokuapp.com/api/events") //consumo la API llamada mediante fetch
    .then(response => response.json()) 
    .then(json => api = json); 

    contentCards = api.events
    
getData()
function getData() {
    var idCard = 1
    contentCards.map(card =>card.id = idCard++)
    var id = location.search.split("?id=").filter(String)
    console.log(id)
    var selectedId = id
    console.log(selectedId)
    var details = contentCards.find((_id) =>{
        return _id.id == selectedId      
    })
    console.log(selectedId)
    var templateHtml = `    
    <div id="div1" class="d-flex pulse flex-wrap justify-content-center align-items-center p-3 bg-secondary bg-gradient sm md lg">

        <div id="div2" class="card-l m-3 sm">
        <div class="card raise mt-5 mb-5 bg-dark rounded" style="width: 20rem;">
        <img src="${details.image}" id="img-events" class="img-events card-img-top mt-3 pe-2 ps-2 bg-dark" style="height:30vh" alt="EventImage">
        <div class="card-body font bg-dark text-center">
        <h5 class="card-title">Name: ${details.name}</h5>
        <p class="card-text">Date: ${details.date}</p>
        <p class="card-text">Description: ${details.description}</p>
        <p class="card-text">Category: ${details.category}</p>
        <p class="card-text">Place: ${details.place}</p>
        <p class="card-text">Capacity: ${new Intl.NumberFormat().format(details.capacity)}</p>
        <p class="card-text">Assistance: ${new Intl.NumberFormat().format(details.assistance)}</p>
        <div class=" text-center">
        <p class="fw-bold">Price: $${new Intl.NumberFormat().format(details.price)}</p>
        <a href="/details.html?id=${details.id}"
        </div>
        </div>
        </div>
        `
    document.querySelector("#div1").innerHTML = templateHtml
}

}
getDatafromAPI()