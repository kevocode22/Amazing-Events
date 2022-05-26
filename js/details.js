function getData() {
    var idCard = 1
    data.eventos.map(card =>card.id = idCard++)
    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    var id = data.eventos.find((id) =>{
        return id.id == selectedId        
    })
    var templateHtml = `
    <div id="div1" class="d-flex pulse flex-wrap justify-content-center align-items-center p-3 bg-secondary bg-gradient sm md lg">

        <div id="div2" class="card-l m-3 sm"  >
        <img style="height:60vh; width:100%" src="${id.image}" alt="Image of event">
        </div>

    <div id="div3" class="bg-dark text-white p-1 text-center sm" style="height:60vh;">
            <h4 class="bg-danger">${id.name}</h4>
            <p class="p-0">Capacity: ${id.capacity}</p>
            <p class="p-0">Category: ${id.category}</p>
            <p class="card-text">Date: ${id.date}</p>
            <p class="card-text">Description: ${id.description}</p>
            <p class="card-text">Place: ${id.place}</p>
            <p class="card-text">Capacity: ${id.capacity}</p>
            <p class="card-text">Assistance: ${id.assistance}
            <a class="btn d-flex justify-content-center justify-content-space-between bg-danger text-white pulse font-weight-bold">Price: $${id.price}</a>
            </p>
            
            </div>
    </div>
    `
    document.querySelector("#div1").innerHTML = templateHtml
}

getData()