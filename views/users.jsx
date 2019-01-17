var React = require("react");
var Defaultcss = require('./defaultcss');

class Details extends React.Component{
    render(){
        return(
            <div>
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
                    Remember to sign in before going to other users profile in order to rate their decks. Click <strong>close</strong> to return to menu or click <strong>confirm</strong> to proceed to desired user's profile.
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
                <ul>{this.props.list.name} <span> </span>
                    <input type="submit" value="View Details" data-toggle="modal" data-target={"#exampleModal" + this.props.list.id}/>
                </ul>
                <ul><img src={this.props.list.photo_url} alt="broken link" height="270" width="270" /><br/><span>{this.props.list.photo_url}</span></ul>
                <ul>{this.props.list.nationality}</ul>
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
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
            {users}
        </Defaultcss>
    );
}
}

module.exports = Users;