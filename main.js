const URL = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}



fetch(URL).then((resp) => resp.json()).then(function(data) {

    let temp ="";
    temp+= "<div class='container-fluid menuProductos'>";
    temp+="<div class='row'>";
    for (let i = 0; i < data.length; i++) {


       temp+= "<button type='button' class='btn btn-link' id=" + data[i].name+ " onclick='mostrar_data(this.id)' >" +data[i].name+" </button>"; 
       
    }
    temp+="</div'>";
    document.getElementById('menuProductos').innerHTML = temp;

});

function mostrar_data(alimento)
{
    
    fetch(URL).then((resp) => resp.json()).then(function(data) {
        let cards= "";
        for (let i = 0; i < data.length; i++) {
            if(data[i].name==alimento)
            {

                for (let j = 0; j < data[i].products.length; j++) {
                    
                    cards += "<div class='card'>"
                    cards += "<img class='card-img-top' src = '" + data[i].products[j].image + "'>";
                    cards += "<div class='card-body'>"
                    cards += "<h5 class='card-title'>Card Information</h5>"
        cards += "<p class='card-text'> "+ data[i].products[j].name +"</p>";
        cards += "<p class='card-text'> "+ data[i].products[j].description +"</p>";
        cards += "<p class='card-text'> "+ data[i].products[j].price +"</p>";
        cards += "<button type='button' class='btn btn-primary' > add To Car </button> ";
        cards += "</div>";
        cards += "</div>";

        document.getElementById('muestraProductos').innerHTML = cards;

                }
                
       
            }


        }  
    });


}