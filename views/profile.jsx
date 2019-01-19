var React = require("react");
var Defaultcss = require('./defaultcss');

class Decks extends React.Component{
    render(){
        return(
            <div>
                <form method="GET" action={"/profile/deck/" + this.props.list.name}>
                {this.props.list.name}<span> </span>
                    <input type="submit" className="decks" value="View" />
                </form>
            </div>
            );
    }
}

class Details extends React.Component{
    render(){
        return(
            <div>
                <ul>{this.props.list.name} from {this.props.list.nationality}</ul>
                <ul><img src={this.props.list.photo_url} alt="broken link" height="270" width="270" /></ul>
            </div>
            );
    }
}

class Profile extends React.Component {
  render() {
    if(this.props.profile == undefined){
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
  else{
    const profile = this.props.profile.map( user => {
            return <Details list={user}></Details>;
        });
    const decks = this.props.decks.map( deck => {
            return <Decks list={deck}></Decks>;
            });
    return (
        <Defaultcss>
            <h3>This is {this.props.profile[0].name}'s profile</h3>
            {profile}
            <h5>Decks made by this user:-</h5>
            <ul>{decks}</ul>
            <form method="GET" action="/users">
                <input type="submit" className="new" value="Back" />
            </form>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Home" />
            </form>
        </Defaultcss>
    );
  }
}
}

module.exports = Profile;