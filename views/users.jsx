var React = require("react");
var Defaultcss = require('./defaultcss');

class Details extends React.Component{
    render(){
        return(
            <div className="users">
            <div className="modal fade" id={"exampleModal" + this.props.list.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-danger" id="exampleModalLabel">Reminder!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-danger">
                    Remember to sign in before going to other users profile in order to rate their decks. Click <strong>Close</strong> to return to menu or click <strong>View Profile</strong> to proceed to desired user's profile.
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <form method="GET" action={"/users/" + this.props.list.id}>
                        <button type="submit" className="btn btn-primary">View Profile</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
                <ul>
                    <li/>{this.props.list.name} from {this.props.list.nationality}
                    <li/><img src={this.props.list.photo_url} height="270" width="270" />
                    <li/><input type="submit" value="View Details" data-toggle="modal" data-target={"#exampleModal" + this.props.list.id}/>
                </ul>
            </div>
            );
    }
}

class Users extends React.Component {
  render() {
    const users = this.props.result.map( user => {
            return <Details list={user}></Details>;
        });
    return (
        <Defaultcss>
            <h3>Below is the is the whole list of users registered on our website</h3>
            <div className="usersbtn">
                <form method="GET" action="/">
                    <input type="submit" className="new" value="Back" />
                </form>
                <form method="GET" action="/user/deck">
                    <input type="submit" value="Create Deck"/>
                </form>
            </div>
            {users}
        </Defaultcss>
    );
}
}

module.exports = Users;