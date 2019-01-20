var React = require("react");
var Defaultcss = require('./defaultcss');

class Cards extends React.Component{
    render(){
        return(
            <div className="inputhidden">
                <input type="submit" type="hidden" id="card" value={this.props.list.card_id} />
            </div>
            );
    }
}

class Editdeck extends React.Component {
  render() {
    if(this.props.user !== undefined){
        const deck = this.props.cards.map( card => {
            return <Cards list={card}></Cards>;
        });
        return (
            <Defaultcss>
                <h3>Welcome {this.props.user}. Go ahead and edit your deck and save it after you are happy with your changes. </h3>
                <br/>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Please Read!</strong><br /> You have successfully signed in on our website and have gain full access to registered user only privileges. The privileges are create deck, personilized profile of your own for you and other users to see and ability to rate other users' deck. That is all so enjoy your stay!
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="deckhead">
                    <h3>Deck name: {this.props.deck}
                        <div class="spinner-border text-warning float-right" role="status">
                        </div>
                    </h3>
                </div>
                <div className="gallery">
                    <h3>Cards List</h3>
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
                    <form method="POST" action={"/profile/deck/edit/" + this.props.deck}>
                        <input type="submit" id="edit" value="Edit Deck"/>
                        <div id="cards">
                            {deck}
                        </div>
                    </form>
                </div>
                <form method="GET" action="/profile">
                    <input type="submit" className="back" value="Back" />
                </form>
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

module.exports = Editdeck;