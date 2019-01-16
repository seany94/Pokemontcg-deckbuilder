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

    var ajaxUrl = `https://api.pokemontcg.io/v1/cards?${input}&pageSize=230`;

    if(document.querySelector("section") == null){
        // var container = document.querySelector('.container')
        var pokemons = document.createElement("section");
        pokemons.setAttribute("id", "pokemons");
        document.querySelector('.gallery').appendChild(pokemons);

        // what to do when we recieve the request
        var responseHandler = function() {

            let jsonData = JSON.parse(this.responseText);

            for(let i = 0; i < jsonData.cards.length; i++){

            let pokeLarge = document.createElement('a');
            pokeLarge.setAttribute('data-toggle', 'modal');
            pokeLarge.setAttribute('data-target', '#exampleModal' + i);
            pokemons.appendChild(pokeLarge);

            let poke = document.createElement("img");
            poke.setAttribute("id", "pokeimg");
            poke.setAttribute("src", `${jsonData.cards[i].imageUrl}`);
            // poke.setAttribute("onclick", "enlarge(i)");
            pokeLarge.appendChild(poke);

            let modal = document.createElement("div");
            modal.setAttribute("class", "modal fade bd-example-modal-xl");
            modal.setAttribute("id", `exampleModal${i}`);
            modal.setAttribute("tabindex", "-1");
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-labelledby", 'myExtraLargeModalLabel');
            modal.setAttribute("aria-hidden", 'true');
            document.body.appendChild(modal);

            let modalLog = document.createElement("div");
            modalLog.setAttribute("class", "modal-dialog modal-xl");
            modalLog.setAttribute("role", "document");
            modal.appendChild(modalLog);

            let modalCon = document.createElement("div");
            modalCon.setAttribute("class", "modal-content");
            modalLog.appendChild(modalCon);

            let modalHead = document.createElement("div");
            modalHead.setAttribute("class", "modal-header");
            modalCon.appendChild(modalHead);

            let modalTitle = document.createElement("h5");
            modalTitle.setAttribute("class", "modal-title text-danger");
            modalTitle.setAttribute("id", "exampleModalLabel");
            modalTitle.innerHTML = 'Card Details'
            modalHead.appendChild(modalTitle);

            let modalBtn = document.createElement("button");
            modalBtn.setAttribute("type", "button");
            modalBtn.setAttribute("class", "close");
            modalBtn.setAttribute("data-dismiss", "modal");
            modalBtn.setAttribute("aria-label", "Close");
            modalHead.appendChild(modalBtn);

            let modalSpan = document.createElement("span");
            modalSpan.setAttribute("aria-hidden", "true");
            modalSpan.innerHTML = '&times;';
            modalBtn.appendChild(modalSpan);

            let modalBody = document.createElement("div");
            modalBody.setAttribute("class", "modal-body text-danger");
            modalBody.setAttribute("id", "content");
            modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> Name: ${jsonData.cards[i].name} <br> Type: ${jsonData.cards[i].types} <br> Stage: ${jsonData.cards[i].subtype} <br> Hp: ${jsonData.cards[i].hp} <br> Attacks: ${jsonData.cards[i].attacks}`
            modalCon.appendChild(modalBody);

            let modalFoot = document.createElement("div");
            modalFoot.setAttribute("class", "modal-footer");
            modalCon.appendChild(modalFoot);

            let modalBtnClose = document.createElement("button");
            modalBtnClose.setAttribute("type", "button");
            modalBtnClose.setAttribute("class", "btn btn-secondary");
            modalBtnClose.setAttribute("data-dismiss", "modal");
            modalBtnClose.innerHTML = 'Close';
            modalFoot.appendChild(modalBtnClose);

            let modalBtnView = document.createElement("button");
            modalBtnView.setAttribute("type", "submit");
            modalBtnView.setAttribute("class", "btn btn-primary");
            modalBtnView.innerHTML = 'View Profile';
            modalFoot.appendChild(modalBtnView);

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
        document.querySelector(".modal-content").removeChild(document.querySelector("#content"));
        document.body.removeChild(document.querySelector(".modal"));
    }
};