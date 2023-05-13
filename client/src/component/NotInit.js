// Node module
import React from "react";

const NotInit = (props) => {
  // Component: Displaying election not initialize message.
  return (
    <div className="container-item info">
      <center>
        <h3>The election has not been initialize.</h3>
        {props.isAdmin ? (
                  <p>Set up the election.</p>
                ) : (
                  <p>Please wait..</p>
                )}
      </center>
    </div>
  );
};
export default NotInit;
