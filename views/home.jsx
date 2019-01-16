var React = require("react");
var Defaultcss = require('./defaultcss');

class Home extends React.Component {
  render() {
    return (
        <Defaultcss>
            <h1>Welcome To PokemonTCG Deck-Builder.</h1>
            <form method="GET" action={"/users/tweet/new"}>
                <input type="submit" className="tweet" value="Create Tweet"/>
            </form>
            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> Use navbar to navigate to users which are your follows and followers, to sign up and to login. You can check out your profile with your details. In order to see tweets in the home page please login. Check for cookie in chrome console to see if you are logged in or the welcome line above as you will see who you are logged in as. Thanks!
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

module.exports = Home;