const URL = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}


let countCarrito=0;
let productosCarrito={};



fetch(URL).then((resp) => resp.json()).then(function(data) {

    let temp ="";
    temp+= "<div class='container-fluid menuProductos'>";
    temp+="<div class='row'>";
    for (let i = 0; i < data.length; i++) {


       temp+= "<button type='button' class='btn btn-link' id='" + data[i].name+ "' onclick='mostrar_data(this.id)' >" +data[i].name+" </button>"; 
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
                cards+= "<h1 class='text-center'>"+alimento+"</h1>";
                cards+= "<div class='container-fluid' id='cartas'>";
                cards += "<div class='row'>";

                for (let j = 0; j < data[i].products.length; j++) {

                    cards += "<div class='card'>"
                    cards += "<img class='card-img-top' src = '" + data[i].products[j].image + "'>";
                    cards += "<div class='card-body'>"
                    cards += "<h5 class='card-title'>" + data[i].products[j].name +"</h5>"
                    cards += "<p class='card-text'> "+ data[i].products[j].description +"</p>";
                    cards += "<p class='card-text'>$ "+ data[i].products[j].price +"</p>";
                    cards+= "<button type='btn' class='btn btn-dark' id='" + data[i].products[j].name+ "' onclick='addToCart(this.id,"+data[i].products[j].price +")'> add to cart </button>"; 
                    cards += "</div>";
                    cards += "</div>";
                }
                cards += "</div>";
                cards += "</div>";
                document.getElementById('muestraProductos').innerHTML = cards;
            }


        }  
    });


}

function addToCart(pedido,numerito)
{
    if(!productosCarrito[pedido])
    {
        productosCarrito[pedido]=[numerito,1]

    }
    else{
        productosCarrito[pedido][1]++

    }
    countCarrito++;
    document.getElementById('count').innerHTML = countCarrito+" Items";  
}

function mostrameCarrito()
{

    let tablaStr="";

    tablaStr+="<div id='tituloProductos'><h1 class='text-center'>Order detail</h1></div>";
    tablaStr+="<table class='table table-striped' style='width: 100%;'>";

    tablaStr+= "<tr><th>Item</th>"
    tablaStr+= "<th>Qty.</th>"
    tablaStr+= "<th>Description</th>"
    tablaStr+= "<th>Unit Price</th>"
    tablaStr+= "<th>Amount</th>"
    tablaStr+= "<th>Modify</th></tr>"
    let item=1
    let totalPrice=0
    Object.keys(productosCarrito).forEach(element => {
        tablaStr += "<tr>";
        tablaStr+= "<th>"+item+"</th>"
        tablaStr+= "<th>"+productosCarrito[element][1]+"</th>"
        tablaStr+= "<th>"+element+"</th>"
        tablaStr+= "<th>"+productosCarrito[element][0]+"</th>"
        tablaStr+= "<th>"+productosCarrito[element][0]*productosCarrito[element][1]+"</th>"
        totalPrice+=productosCarrito[element][0]*productosCarrito[element][1]
        tablaStr += "<th> <button type='button' class='btn btn-dark' id='" + element+ "' onclick='aumentar(this.id)'> + </button> "
        tablaStr +=  "<button type='button' class='btn btn-dark' id='" + element + "' onclick='disminuir(this.id)'> - </button> </th></tr>"
        item++;
    })
    
    tablaStr+="<tr><div class='col-8'>" 
    tablaStr+="<th>Total: $ "+totalPrice+ "</th></div>"
    tablaStr+="<th> </th>"
    tablaStr+="<th>  </th>"
    tablaStr+="<th> </th>"
    tablaStr+="<th>  </th>"
    tablaStr +="<div class='col-8'><th><button type='button' class=' btn-danger' onclick='cancel(this.id)'> Cancel </button>"
    tablaStr +="<button type='button' class=' btn-outline-danger' onclick='confirm(this.id)'> Confirm order  </button></div></th></tr>"

    document.getElementById('muestraProductos').innerHTML = tablaStr;  
}

function aumentar(element)
{
    productosCarrito[element][1]++;
    mostrameCarrito()
    countCarrito++;
    document.getElementById('count').innerHTML = countCarrito+" Items";  


}
function confirm()
{
   console.log(productosCarrito)

}

function YesModal()
{
    productosCarrito={};
    modal.style.display = "none"
    mostrameCarrito();
    countCarrito=0
    document.getElementById('count').innerHTML = countCarrito+" Items";  

}
function NoModal()
{
    modal.style.display = "none"
}
function cancel()
{
    document.getElementById("modal").style.display = "block";

   

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
   
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    


}
function disminuir(element)
{
    productosCarrito[element][1]--;
    countCarrito--;
    mostrameCarrito()
    document.getElementById('count').innerHTML = countCarrito+" Items";  

}