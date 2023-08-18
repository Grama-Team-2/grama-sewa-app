import React,{useState} from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import { checkStatus } from "../../api/UserRequests";

function Status() {
const [nic,setNic] = useState("");
const [status,setStatus] = useState("");
const [loading, setLoading] = useState(false);
const { httpRequest } = useAuthContext();

const handleSubmit = async (e) => { 
  e.preventDefault();
  try {
    setLoading(true);
    checkStatus.url =
      checkStatus.url + "/" + nic;
      const {data} = await httpRequest(checkStatus);
    setStatus(data);
    setLoading(false);
    console.log(status);
  } catch (err) {
    
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
                 
                  <div className="card shadow-lg border-0 rounded-lg ">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Request Status
                      </h3>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" class="img-fluid" alt="Phone image" />
                    </div>
                    <div className="card-body">
                    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" >
                  <div className="input-group" style={{marginLeft:"75px"}}>
                    
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type NIC here"
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
                    <div className="card p-4" style = {{backgroundColor:"#483248",color:"white",marginLeft:"100px",marginRight:"100px"}} >
          
            <h5>{status}</h5>
          
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
