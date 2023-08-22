/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useState,useEffect} from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import { checkStatus } from "../../api/UserRequests";

function Status() {
const [nic,setNic] = useState("");
const [request,setRequests] = useState([]);
const [loading, setLoading] = useState(false);
const { httpRequest } = useAuthContext();
const [senderId, setSenderId] = useState("");
const { getDecodedIDToken } = useAuthContext();

const fetchUserData = async () => {
  try {
    const { sub } = await getDecodedIDToken();
    setSenderId(sub);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchUserData();
}, []);

const handleSubmit = async (e) => { 
  e.preventDefault();
  try {
    checkStatus.url  = "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/status";
    setLoading(true);
    checkStatus.url = checkStatus.url + "/" + nic+"/"+senderId;
    const {data} = await httpRequest(checkStatus);
      
    setRequests(data);
    setLoading(false);
    console.log(data);

  } 
  catch (err) {
    window.alert('Please Enter A Correct NIC !!!');
    console.log(err);
    setLoading(false);
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
                  <br/>
                  <br/>
                 
                  <div className="card shadow-lg border-0 rounded-lg ">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Request Status
                      </h3>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" class="img-fluid" alt="Phone image" />
                    </div>
                    <div className="card-body">
                    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" >
                  <div className="input-group" style={{marginLeft:"70px"}}>
                    
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type NIC No here"
                      aria-label="Search for..."
                      aria-describedby="btnNavbarSearch"
                      onChange={(e) => setNic(e.target.value)}
                    />
                    <input
                      type="button"
                      className="btn1"
                      id="btnNavbarSearch"
                      value="Search"
                      onClick={handleSubmit}
                      
                      
                    ></input>
                  </div>
                </form>
                <br/>
                <br/>
                <br/>
                <div className="form-floating mb-3" style={{marginLeft:"50px"}}>
                          Identity Verification Status 
                          
                          <input className="textBox"
                          
                          type="text"
                          value={request.identityVerificationStatus}
                          readOnly
                          style={{
                            backgroundColor:
                              request.identityVerificationStatus === true
                                ? "#7fff00" : request.identityVerificationStatus === false ? "red"
                                : "white",
                                marginLeft:"50px",
                                width: "150px"
                                
                          }}
                        />
                        </div>
                        <br/>

                        <div className="form-floating mb-3" style={{marginLeft:"50px"}}>
                          Address Verification Status 
                         
                          <input
                            className="textBox"
                            type="text"
                            readOnly
                            value={request.addressVerificationStatus}
                            style={{
                              backgroundColor:
                                request.addressVerificationStatus === true
                                  ? "#7fff00" : request.addressVerificationStatus === false ? "red"
                                  : "white",
                                  marginLeft:"43px",
                                  width: "150px"
                                  
                            }}
                            
                            
                          />
                        </div>
                        <br/>

                        <div className="form-floating mb-3" style={{marginLeft:"50px"}}>
                          Police Verification Status 
                          
                         
                          <input
                            className="textBox"
                            type="text"    
                            value={request.policeVerificationStatus}
                            readOnly
                            style={{
                              backgroundColor:
                                request.policeVerificationStatus === true
                                  ? "#7fff00" : request.policeVerificationStatus === false ? "red"
                                  : "white",
                                  marginLeft:"57px",
                                  width: "150px"
                                  
                            }}
                            
                          />
                        </div>
                        <br/>

                        <div className="form-floating mb-3" style={{marginLeft:"50px"}}>
                          Validation Status 
                          <input
                            className="textBox"
                            type="text"    
                            value={request.validationResult}
                            readOnly
                            style={{
                              backgroundColor:
                                request.validationResult === "REJECTED"
                                  ? "red" : request.validationResult === "PENDING" ? "#0abab5"
                                  : request.validationResult === "COMPLETED" ? "#7fff00" :"white",
                                  marginLeft:"115px",
                                  width: "150px"
                                  
                            }}
                            
                          />
                          
                          
                        </div>
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

export default Status;
