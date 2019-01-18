var React = require("react");
var Defaultcss = require('./defaultcss');

class Deck extends React.Component {
  render() {
    if(this.props.user !== undefined){
        return (
            <Defaultcss>
                <h3>Welcome {this.props.user.name}. Let's begin building yourself a new deck! </h3>
                <br/>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Please Read!</strong><br /> You have successfully signed in on our website and have gain full access to registered user only privileges. The privileges are create deck, personilized profile of your own for you and other users to see and ability to rate other users' deck. That is all so enjoy your stay!
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="gallery">
                    <div id="pokecard">
                        Pokemon
                    </div>
                    <div id="traincard">
                        Trainer
                    </div>
                    <div id="energycard">
                        Energy
                    </div>
                </div>
                <div id="deck">
                    <form method="POST" action="/user/decks">
                        <input type="submit" id="save" value="Save Deck"/>
                        <div id="cards">
                        </div>
                    </form>
                </div>
            </Defaultcss>
        );
    }
    else{
        return (
            <Defaultcss>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Please Read!</strong><br /> Please go back and sign in before entering this page.
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
        </Defaultcss>
        );
    }
  }
}

module.exports = Deck;