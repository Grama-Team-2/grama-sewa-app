import React, { useState, useEffect } from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";
// import { slackNotify } from "../../api/slackNotify";

import { slackNotify } from "../../api/SlackNotify";

//slackNotify
function Contact() {
  const [message, setMessage] = useState("");
  const [no, setNo] = useState("");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { httpRequest } = useAuthContext();

  const handleSubmit = async (e) => {
    // const history = useHistory();
    e.preventDefault();
    try {
      setLoading(true);
      // const NIC = 1212
      // const no = 10
      // const street = "main"
      // const city = "Galle"

      slackNotify.url = slackNotify.url + "/" + message;
      const { data } = await httpRequest(slackNotify);
      setRequests(data);
      setLoading(false);
      // history.push('/');
      window.location.replace("/user/me");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  return (
    <div>
      <Header/>
      <div>
        <div>
          <main style={{ backgroundColor: "#b31af01f" }}>
            <div className="container1">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />

                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Contact Us
                      </h3>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        className="img-fluid"
                        alt="Phone image"
                      />
                    </div>
                    <div className="card-body">
                      <form method="post" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <label>Type your message here :</label>
                          <br />
                          <br />
                          <textarea
                            className="form-control"
                            rows={10}
                            cols={40}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn1"
                            value="Send"
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

export default Contact;
