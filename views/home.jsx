var React = require("react");
var Defaultcss = require('./defaultcss');

class Home extends React.Component {
  render() {
    if(this.props.user !== undefined){
        return (
            <Defaultcss>
                <h3>Welcome To PokemonTCG Deck-Builder {this.props.user.name}. </h3>
                <form method="GET" action="/user/deck">
                    <input type="submit" value="Create Deck"/>
                </form>
                <br/>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Please Read!</strong><br /> You have successfully signed in on our website and have gain full access to registered user only privileges. The privileges are create deck, personilized profile of your own for you and other users to see and ability to rate other users' deck. That is all so enjoy your stay! Click on the 3 different tabs below of cards to see database of cards on our server.
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="gallery">
                    <h3>Cards</h3>
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
            </Defaultcss>
        );
    }
    else{
        return (
            <Defaultcss>
                <h3>Welcome To PokemonTCG Deck-Builder Guest. </h3>
                <form method="GET" action="/user/deck">
                    <input type="submit" className="tweet" value="Create Deck"/>
                </form>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Please Read!</strong><br /> Remember to sign up if you still have not done so. It is the only way to gain access to all awesome registered user only features. You will never regret it!
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
            </Defaultcss>
        );
    }
  }
}

module.exports = Home;