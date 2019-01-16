window.onload = function(){
    var pokeButton = document.querySelector('#pokecard')

    pokeButton.addEventListener('click', function(){
        var input = 'supertype=pokemon'
        ajax(input);
    });

    var trainButton = document.querySelector('#traincard')

    trainButton.addEventListener('click', function(){
        var input = 'supertype=trainer'
        ajax(input);
    });

    var energyButton = document.querySelector('#energycard')

    energyButton.addEventListener('click', function(){
        var input = 'supertype=energy'
        ajax(input);
    });
};

var ajax = function(input){

    var ajaxUrl = `https://api.pokemontcg.io/v1/cards?${input}&pageSize=250`;

    if(document.querySelector("section") == null){
        // var container = document.querySelector('.container')
        var pokemons = document.createElement("section");
        pokemons.setAttribute("id", "pokemons");
        document.querySelector('.gallery').appendChild(pokemons);

        // var supporters = document.createElement("section");
        // supporters.setAttribute("id", "supporters");
        // var energy = document.createElement("section");
        // energy.setAttribute("id", "energy");

        // what to do when we recieve the request
        var responseHandler = function() {

            let jsonData = JSON.parse(this.responseText);

            for(let i = 0; i < jsonData.cards.length; i++){

            let poke = document.createElement("img");
            poke.setAttribute("id", "pokeimg");
            poke.setAttribute("src", `${jsonData.cards[i].imageUrl}`);
            pokemons.appendChild(poke)

            // console.log(jsonData.cards[i]);
            }
        };


        // make a new request
        var request = new XMLHttpRequest();

        // listen for the request response
        request.addEventListener("load", responseHandler);

        // ready the system by calling open, and specifying the url
        request.open("GET", ajaxUrl);

        // request.setRequestHeader('Count', '200');

        // send the request
        request.send();
        }
    else if(document.querySelector("section").hasChildNodes()){
        document.querySelector(".gallery").removeChild(document.querySelector(".gallery").lastChild);
    }
};