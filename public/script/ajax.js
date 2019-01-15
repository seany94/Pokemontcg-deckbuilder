window.onload = function(){

    var h1 = document.querySelector('h1');

    h1.innerText = "we loaded a js file! DOM manipulation!";

    var button = document.querySelector('#likesomething');

    button.addEventListener('click', function(){
        doAjax();
    });

};

var ajax = function(){

    var ajaxUrl = "http://localhost:3000/createlike";


    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", ajaxUrl);

    // send the request
    request.send();
};

var ajaxUrl = "http://localhost:3000/user/new";


// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", ajaxUrl);

// send the request
request.send();