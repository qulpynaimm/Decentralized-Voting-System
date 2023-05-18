import React from "react";

const AdminOnly = (props) => {
  return (
      <div
          style={{
              padding: '50px',
              backgroundColor: 'black',
              height: '640px'
          }}
      >
        <div className="container-item attention" style={{ borderColor: "tomato" }}>
          <center>
            <div style={{ margin: "17px" }}>
              <h1>{props.page}</h1>
            </div>
            <p>Admin access only.</p>
          </center>
        </div>
      </div>
  );
};

export default AdminOnly;
