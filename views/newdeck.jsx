var React = require("react");
var Defaultcss = require('./defaultcss');

class Cards extends React.Component{
    render(){
        return(
            <div>
                <input type="submit" type="hidden" id="cards" value={this.props.list.card_id} />
            </div>
            );
    }
}

class Newdeck extends React.Component {
  render() {
    const deck = this.props.cards.map( card => {
            return <Cards list={card}></Cards>;
        });
        return (
            <Defaultcss>
                <h3>Congratulation your deck have been saved and uploaded to your profile! </h3>
                <br/>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Please Read!</strong><br /> You have successfully signed in on our website and have gain full access to registered user only privileges. The privileges are create deck, personilized profile of your own for you and other users to see and ability to rate other users' deck. That is all so enjoy your stay!
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="gallery">
                    <h3>Deck name: {this.props.deck}</h3>
                </div>

                <div id="newdeck">
                    <div className="overlay">
                        {deck}
                    </div>
                </div>
            </Defaultcss>
        );
      }
}

module.exports = Newdeck;