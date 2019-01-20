var React = require("react");
var Defaultcss = require('./defaultcss');

class Decks extends React.Component{
    render(){
        return(
            <div>
                <div className="modal fade" id={"exampleModal" + this.props.list.name} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title text-danger" id="exampleModalLabel">WARNING!!!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body text-danger">
                            You are about to delete the deck name <strong>{this.props.list.name}</strong>. Are you sure about it? Click <strong>Close</strong> to return to profile or click <strong>Confirm</strong> to proceed with the deletion.
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <form method="POST" action={"/profile/deck/delete/" + this.props.list.name + "?_method=delete"}>
                                <button type="submit" value="Delete" className="btn btn-primary">Confirm</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                <div>
                    {this.props.list.name}
                    <br/>
                    <form method="GET" id="form" action={"/users/deck/" + this.props.list.name}>
                        <input type="submit" className="decks" value="View" />
                    </form>
                    <form method="GET" id="form" action={"/profile/deck/edit/" + this.props.list.name}>
                        <input type="submit" className="decks" value="Edit" />
                    </form>
                    <input type="submit" className="details" value="Delete" data-toggle="modal" data-target={"#exampleModal" + this.props.list.name}/>
                </div>
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
            <form method="GET" id="form" action="/profile">
                <div class="form-group">
                    <select name="sortby" class="form-control" id="exampleFormControlSelect1">
                      <option value="datecr">Date Created Ascending</option>
                      <option value="dateup">Date Updated Ascending</option>
                      <option value="nameasc">Name Ascending</option>
                      <option value="deckid">Deck ID Ascending</option>
                    </select>
                    <input type="submit" value="Sort" />
                </div>
            </form>
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