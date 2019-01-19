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
                    <strong>Please Read!</strong><br /> You have succesfully saved your deck on our database! Your deck is also assigned to your profile page too. Do let the cards render before enlarging them individually to see them.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="gallery">
                    <h3>Deck name: {this.props.deck}</h3>
                    <div class="spinner-border text-warning float-right" role="status">
                    </div>
                </div>
                <div id="newdeck">
                    {deck}
                </div>
            </Defaultcss>
        );
      }
}

module.exports = Newdeck;