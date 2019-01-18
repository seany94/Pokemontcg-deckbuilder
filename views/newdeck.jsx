var React = require("react");
var Defaultcss = require('./defaultcss');

class Newdeck extends React.Component {
  render() {
        return (
            <Defaultcss>
                <h3>Congratualtion your deck have been saved and uploaded to your profile! </h3>
                <br/>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Please Read!</strong><br /> You have successfully signed in on our website and have gain full access to registered user only privileges. The privileges are create deck, personilized profile of your own for you and other users to see and ability to rate other users' deck. That is all so enjoy your stay!
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
            </Defaultcss>
        );
      }
}

module.exports = Newdeck;