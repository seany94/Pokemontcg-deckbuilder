window.onload = function(){

    if(document.querySelector('#pokecard') != null && document.querySelector('#traincard') != null && document.querySelector('#energycard') != null){
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
    }
    if(document.querySelector('#newdeck') != null){
        let inputVal = document.querySelectorAll('input')
        for(let i = 0; i < inputVal.length; i++){
            ajaxOutput(inputVal[i].value);
        }
    }
};

var ajaxOutput = function(input){

    var ajaxUrl = `https://api.pokemontcg.io/v1/cards?id=${input}`;

    var responseHandler = function() {
        let jsonData = JSON.parse(this.responseText);

        for(let i = 0; i < jsonData.cards.length; i++){

            let pokeLarge = document.createElement('a');
            pokeLarge.setAttribute('data-toggle', 'modal');
            pokeLarge.setAttribute('data-target', `#exampleModal${input}`);

            pokeLarge.addEventListener('click', function(){
                let modal = document.createElement("div");
                modal.setAttribute("class", "modal fade bd-example-modal-xl");
                modal.setAttribute("id", `exampleModal${input}`);
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
                modalTitle.setAttribute("class", "modal-title text-info");
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

                if(jsonData.cards[i].supertype == 'Pokémon'){
                    let attack = [];
                    let weaknesses = [];
                    let resistances = [];
                    let retreat = [];

                    if(jsonData.cards[i].hasOwnProperty('attacks')){
                        for(let j = 0; j < jsonData.cards[i].attacks.length; j++){
                            attack.push(jsonData.cards[i].attacks[j].cost);
                            attack.push(jsonData.cards[i].attacks[j].name, "---");
                        }
                    }

                    if(jsonData.cards[i].hasOwnProperty('weaknesses')){
                        for(let a = 0; a < jsonData.cards[i].weaknesses.length; a++){
                            weaknesses.push(jsonData.cards[i].weaknesses[a].type);
                        }
                    }
                    if(jsonData.cards[i].hasOwnProperty('resistances')){
                        for(let b = 0; b < jsonData.cards[i].resistances.length; b++){
                            resistances.push(jsonData.cards[i].resistances[b].type);
                        }
                    }
                    if(jsonData.cards[i].hasOwnProperty('retreatCost')){
                        for(let c = 0; c < jsonData.cards[i].retreatCost.length; c++){
                            retreat.push(jsonData.cards[i].retreatCost[c]);
                        }
                    }

                    if(jsonData.cards[i].hasOwnProperty('ability')){
                        let modalBody = document.createElement("div");
                        modalBody.setAttribute("class", "modal-body text-danger");
                        modalBody.setAttribute("id", "content");
                        modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].types} <br> <span class="text-info">Stage:</span> ${jsonData.cards[i].subtype} <br> <span class="text-info">Hp:</span> ${jsonData.cards[i].hp} <br> <span class="text-info">Poke-Body:</span> ${jsonData.cards[i].ability.name}. <br> ${jsonData.cards[i].ability.text} <br> <span class="text-info">Attacks:</span> ---, ${attack} <br> <span class="text-info">Weaknesses:</span> ${weaknesses} <br> <span class="text-info">Resistances:</span> ${resistances} <br> <span class="text-info">Retreat Cost:</span> ${retreat} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                        modalCon.appendChild(modalBody);
                    }
                    else{
                        let modalBody = document.createElement("div");
                        modalBody.setAttribute("class", "modal-body text-danger");
                        modalBody.setAttribute("id", "content");
                        modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].types} <br> <span class="text-info">Stage:</span> ${jsonData.cards[i].subtype} <br> <span class="text-info">Hp:</span> ${jsonData.cards[i].hp} <br> <span class="text-info">Attacks:</span> ---, ${attack}<br> <span class="text-info">Weaknesses:</span> ${weaknesses} <br> <span class="text-info">Resistances:</span> ${resistances} <br> <span class="text-info">Retreat Cost:</span> ${retreat} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                        modalCon.appendChild(modalBody);
                    }
                }
                else if(jsonData.cards[i].supertype == 'Trainer'){
                    let modalBody = document.createElement("div");
                    modalBody.setAttribute("class", "modal-body text-danger");
                    modalBody.setAttribute("id", "content");
                    modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].supertype} - ${jsonData.cards[i].subtype} <br> <span class="text-info">Rarity:</span> ${jsonData.cards[i].rarity} <br> <span class="text-info">Text:</span> ${jsonData.cards[i].text} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                    modalCon.appendChild(modalBody);
                }

                else if(jsonData.cards[i].supertype == 'Energy'){
                    let modalBody = document.createElement("div");
                    modalBody.setAttribute("class", "modal-body text-danger");
                    modalBody.setAttribute("id", "content");
                    modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].subtype} <br> <span class="text-info">Rarity:</span> ${jsonData.cards[i].rarity} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                    modalCon.appendChild(modalBody);
                }

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
                modalBtnView.setAttribute("id", "add" + i);
                modalBtnView.innerHTML = 'Add';
                modalFoot.appendChild(modalBtnView);
            });
            document.querySelector('#newdeck').appendChild(pokeLarge);

            let poke = document.createElement("img");
            poke.setAttribute("class", "pokesmimg");
            poke.setAttribute("id", `pokeimg${input}`);
            poke.setAttribute("src", `${jsonData.cards[i].imageUrl}`);
            pokeLarge.appendChild(poke);

            if(document.querySelector(".modal") !== null){
                document.body.removeChild(document.querySelector(".modal"));
            }
        }
    }
        // make a new request
        var request = new XMLHttpRequest();

        // listen for the request response
        request.addEventListener("load", responseHandler);

        // ready the system by calling open, and specifying the url
        request.open("GET", ajaxUrl);

        // request.setRequestHeader('Count', '200');

        // send the request
        request.send();
};

var ajax = function(input, type){

    var ajaxUrl = `https://api.pokemontcg.io/v1/cards?${input}&pageSize=700`;

    if(document.querySelector("section") == null){
        // let pokeSearch = document.createElement('input');
        // pokeSearch.setAttribute('class', 'form-control');
        // pokeSearch.setAttribute('onkeyup', 'search()');
        // pokeSearch.setAttribute('placeholder', 'Search');
        // document.querySelector('.gallery').appendChild(pokeSearch)

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

                pokeLarge.addEventListener('click', function(){
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
                    modalTitle.setAttribute("class", "modal-title text-info");
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

                    if(jsonData.cards[i].supertype == 'Pokémon'){
                        let attack = [];
                        let weaknesses = [];
                        let resistances = [];
                        let retreat = [];

                        if(jsonData.cards[i].hasOwnProperty('attacks')){
                            for(let j = 0; j < jsonData.cards[i].attacks.length; j++){
                                attack.push(jsonData.cards[i].attacks[j].cost);
                                attack.push(jsonData.cards[i].attacks[j].name, "---");
                            }
                        }

                        if(jsonData.cards[i].hasOwnProperty('weaknesses')){
                            for(let a = 0; a < jsonData.cards[i].weaknesses.length; a++){
                                weaknesses.push(jsonData.cards[i].weaknesses[a].type);
                            }
                        }
                        if(jsonData.cards[i].hasOwnProperty('resistances')){
                            for(let b = 0; b < jsonData.cards[i].resistances.length; b++){
                                resistances.push(jsonData.cards[i].resistances[b].type);
                            }
                        }
                        if(jsonData.cards[i].hasOwnProperty('retreatCost')){
                            for(let c = 0; c < jsonData.cards[i].retreatCost.length; c++){
                                retreat.push(jsonData.cards[i].retreatCost[c]);
                            }
                        }

                        if(jsonData.cards[i].hasOwnProperty('ability')){
                            let modalBody = document.createElement("div");
                            modalBody.setAttribute("class", "modal-body text-danger");
                            modalBody.setAttribute("id", "content");
                            modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].types} <br> <span class="text-info">Stage:</span> ${jsonData.cards[i].subtype} <br> <span class="text-info">Hp:</span> ${jsonData.cards[i].hp} <br> <span class="text-info">Poke-Body:</span> ${jsonData.cards[i].ability.name}. <br> ${jsonData.cards[i].ability.text} <br> <span class="text-info">Attacks:</span> ---, ${attack} <br> <span class="text-info">Weaknesses:</span> ${weaknesses} <br> <span class="text-info">Resistances:</span> ${resistances} <br> <span class="text-info">Retreat Cost:</span> ${retreat} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                            modalCon.appendChild(modalBody);
                        }
                        else{
                            let modalBody = document.createElement("div");
                            modalBody.setAttribute("class", "modal-body text-danger");
                            modalBody.setAttribute("id", "content");
                            modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].types} <br> <span class="text-info">Stage:</span> ${jsonData.cards[i].subtype} <br> <span class="text-info">Hp:</span> ${jsonData.cards[i].hp} <br> <span class="text-info">Attacks:</span> ---, ${attack}<br> <span class="text-info">Weaknesses:</span> ${weaknesses} <br> <span class="text-info">Resistances:</span> ${resistances} <br> <span class="text-info">Retreat Cost:</span> ${retreat} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                            modalCon.appendChild(modalBody);
                        }
                    }
                    else if(jsonData.cards[i].supertype == 'Trainer'){
                        let modalBody = document.createElement("div");
                        modalBody.setAttribute("class", "modal-body text-danger");
                        modalBody.setAttribute("id", "content");
                        modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].supertype} - ${jsonData.cards[i].subtype} <br> <span class="text-info">Rarity:</span> ${jsonData.cards[i].rarity} <br> <span class="text-info">Text:</span> ${jsonData.cards[i].text} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                        modalCon.appendChild(modalBody);
                    }

                    else if(jsonData.cards[i].supertype == 'Energy'){
                        let modalBody = document.createElement("div");
                        modalBody.setAttribute("class", "modal-body text-danger");
                        modalBody.setAttribute("id", "content");
                        modalBody.innerHTML = `<img src='${jsonData.cards[i].imageUrlHiRes}'> <span class="text-info">Name:</span> ${jsonData.cards[i].name} <br> <span class="text-info">Type:</span> ${jsonData.cards[i].subtype} <br> <span class="text-info">Rarity:</span> ${jsonData.cards[i].rarity} <br> <span class="text-info">Series:</span> ${jsonData.cards[i].series} <br> <span class="text-info">Set:</span> ${jsonData.cards[i].set}`
                        modalCon.appendChild(modalBody);
                    }

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
                    modalBtnView.setAttribute("id", "add" + i);
                    modalBtnView.innerHTML = 'Add';
                    modalFoot.appendChild(modalBtnView);

                    // Add pokemon to deck container
                    if(document.querySelector('#deck') != null){
                        var addButton = document.querySelector('#add' + i)

                        addButton.addEventListener('click', function(){
                            let pokeAdd = document.createElement("img");
                            pokeAdd.setAttribute("class", "pokesmimg");
                            pokeAdd.setAttribute("id", "pokeimgadd" + i);
                            pokeAdd.setAttribute("src", `${jsonData.cards[i].imageUrl}`);
                            document.querySelector('#cards').appendChild(pokeAdd);

                            let pokeInput = document.createElement("input");
                            pokeInput.setAttribute("type", "hidden");
                            pokeInput.setAttribute("class", "pokeval");
                            pokeInput.setAttribute("id", "pokeinput" + i);
                            pokeInput.setAttribute("name", "card");
                            pokeInput.setAttribute("value", `${jsonData.cards[i].id}`);
                            document.querySelector('#cards').appendChild(pokeInput);

                            // Delete pokemon from deck container
                            if(document.querySelector('#cards').hasChildNodes()){
                                var delButton = document.querySelector('#pokeimgadd' + i)

                                delButton.addEventListener('click', function(){
                                    document.querySelector('#cards').removeChild(document.querySelector('#pokeimgadd' + i))
                                });
                            }
                        });
                    }
                });
                pokemons.appendChild(pokeLarge);

                let poke = document.createElement("img");
                poke.setAttribute("class", "pokesmimg");
                poke.setAttribute("id", "pokeimg" + i);
                poke.setAttribute("src", `${jsonData.cards[i].imageUrl}`);
                pokeLarge.appendChild(poke);

                if(document.querySelector(".modal") !== null){
                    document.body.removeChild(document.querySelector(".modal"));
                }
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