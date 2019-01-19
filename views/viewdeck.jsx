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

class Viewdeck extends React.Component {
  render() {
    const deck = this.props.cards.map( card => {
            return <Cards list={card}></Cards>;
        });
        return (
            <Defaultcss>
                <h3>You are looking at {this.props.user.name}'s deck </h3>
                <br/>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Please Read!</strong><br />  Do let the cards render before enlarging them individually to see them.
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
                <form method="GET" action="/">
                    <input type="submit" className="new" value="Home" />
                </form>
            </Defaultcss>
        );
      }
}

module.exports = Viewdeck;