import React,{useState,useEffect} from "react";
import axios from "axios";
import GSHeader from "./GSHeader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ViewRequest() {
  const [data,setData] = useState([]);
  const [status,setStatus] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/sendRequest/getAllRequests", {
      headers: {
        // Add your headers here
        // For example, if you need to send an authorization token:
        Authorization: "Bearer yourAuthToken",
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  
  function updatePending(nic){
    setStatus("Pending")
    axios.put("http://localhost:9090/sendRequest/updateStatus",nic,status).then(() => {
        
    window.location.replace("/viewrequest");
  })
  .catch((err) => {
    alert(err);
  });
}

  function updateProcessing(nic){
    setStatus("Processing")
    axios.put("http://localhost:9090/sendRequest/updateStatus",nic,status).then(() => {
        
    window.location.replace("/viewrequest");
  })
  .catch((err) => {
    alert(err);
  });
}

  function updateMIR(nic){
    setStatus("More Info required")
    axios.put("http://localhost:9090/sendRequest/updateStatus",nic,status).then(() => {
        
    window.location.replace("/viewrequest");
  })
  .catch((err) => {
    alert(err);
  });
}

  function updateCompleted(nic){
    setStatus("Completed")
    axios.put("http://localhost:9090/sendRequest/updateStatus",nic,status).then(() => {
        
    window.location.replace("/viewrequest");
  })
  .catch((err) => {
    alert(err);
  });
}

  return (
    <div>
      <GSHeader></GSHeader>
      <div className="mt-5">
        
          <div className="add_btn mt-2 mb-2" style = {{marginRight: "50px"}}>
            
            
            <div className="row justify-content-center" ><h2 style={{ marginLeft: "100px" }}>Request List</h2></div>
            <br />
           
          </div>

         

          <table className="table" >
            <thead>
              <tr className="table-dark">
                <th scope="col">NIC</th>
                <th scope="col">Address</th>
                <th scope="col">Police Check</th>
                <th scope="col">Identity Check</th>
                <th scope="col">Address Check</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{
              data.map((Request) => (

              
          
                  <tr>
                    
                    <td>{Request.nic}</td>
                    <td>{Request.no}<br/>
                    {Request.street}
                    {Request.city}<br/></td>
                    <td> <button
                        className="btn">
                        <CheckCircleIcon/>
                      </button><input type="text" value="verified"></input></td>
                    <td><button
                        className="btn">
                        <CheckCircleIcon/>
                      </button><input type="text" value="verified"></input></td>
                    <td><button
                        className="btn">
                        <CheckCircleIcon/>
                      </button><input type="text" value="verified"></input></td>
                    <td className="d-flex justify-content-between" style={{marginTop:"20px"}}>
                        
                      <button
                        className="btn btn-danger"
                        onClick={updatePending(Request.nic)}
                        >Pending
                        
                        
                      </button>
                      
                      <button
                        className="btn btn-info"
                        onClick={updateProcessing(Request.nic)}
               
                      >
                        Processing
                      </button>
                      <br/><br/>
                      
                      <button
                      className="btn btn1"
                      onClick={updateMIR(Request.nic)} >
                        MIR
                      </button>
                      <br/>

                      <button
                      className="btn btn-success"
                      onClick={updateCompleted(Request.nic)}
                    
                       
                      >
                        Completed
                      </button>
                      <br/>
                      
                    </td>
                    <br/>
                  </tr>
                  ))}
              
            </tbody>
          </table>
        </div>
      </div>
     

  );
}
