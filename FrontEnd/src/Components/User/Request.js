import React, { useState } from "react";
import axios from "axios";
import Header from "./UserHeader";
// import React, { useState } from 'react';

function Request() {
  const [nic, setNic] = useState("");
  const [no, setNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");


  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.onload = () => {
  //     if (xhr.status === 201) {
  //       const responseData = JSON.parse(xhr.responseText);
  //       console.log('Post successful:', responseData);
  //     } else {
  //       console.error('Error posting data:', xhr.statusText);
  //     }
  //   };
  //   xhr.onerror = () => {
  //     console.error('Network error occurred');
  //   };
  //   xhr.send(JSON.stringify(postData));
  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      NIC: nic,
      no: no,
      street: street,
      city: city,
    };
    // const [postData, setPostData] = useState({
    //   title: '',
    //   body: requestData,
    // });
  
    console.log("Sending request data:", requestData);
  
    try {


      var xhr = new XMLHttpRequest()

      // get a callback when the server responds
      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
      })
      // open the request with the verb and the url
      xhr.open('GET', 'https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/getAllRequests')
      // xhr.setRequestHeader('Authorization', 'Bearer your-access-token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader('Access-Control-Allow-Credentials',true );

//Access-Control-Allow-Credentials: true
      xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization');

      // Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization

      // send the request
      xhr.send()

      // const response = await axios.post(
        
      //   "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/newRequest",
      //   requestData,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",

      //       "Access-Control-Allow-Origin": "*",
      //        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      //     },
      //   }
      // );
      // const response = await fetch("https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/getAllRequests");
      // console.log("Response data:", response);
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };
  

  return (
    <div>
      <Header></Header>
      <div>
        <div>
          <main style={{backgroundColor:"#b31af01f"}}>
            <div className="container1">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                 
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Request letter
                      </h3>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="card-body">
                      <form method="post" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <label>NIC No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            
                          />
                        </div>
                        <hr/>
                        <label style={{marginLeft:"190px"}}>Address Details</label>
                        <div className="form-floating mb-3">
                          <label>No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            
                            required
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label>Street :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            
                            required
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label>City :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            
                            required
                          />
                        </div>

                      


                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn1"
                            
                            value="Request"
                          ></input>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
    </div>
  );
}

export default Request;
