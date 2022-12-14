import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Joi from 'joi';

export default function Login({ saveUser }) {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const [validationError,setvalidationError]=useState([])

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function getUserInfo(e) {
    console.log(e.target.value);
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
    console.log(currentUser);
  }

  async function register(e) {
    setLoading(false);
    e.preventDefault();
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signin",
      user
    );
    let respone = data;
    console.log(respone);
    if (respone.message === "success") {
      localStorage.setItem("token", data.token);
      saveUser();
      navigate("/");
    } else {
      setLoading(true);
      setErrorMsg(respone.message);
    }
  }


  console.log(errorMsg);

  function validationUser(){
    let schema = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    });
    let res =schema.validate(user,{abortEarly:false})
    if(res.error){
        console.log(res);
        setvalidationError(res.error.details)
        return false
    }else{
        return true
    }
}



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="container">
        <div className="w-75 mx-auto">
          <div className="my-4">
            <h3>Login form</h3>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <form onSubmit={(e) => register(e)}>
            <div className="form-group">
              <label className="mt-3" htmlFor="email">
                Email :
              </label>
              <input
                onChange={(e) => getUserInfo(e)}
                className="form-control"
                type="text"
                id="email"
                name="email"
              />
              <div className="text-danger">
                {
                  validationError.filter(
                    (ele) => ele.context.label === "email"
                  )[0]?.message
                }
              </div>
            </div>
            <div className="form-group">
              <label className="mt-3" htmlFor="password">
                Password :
              </label>
              <input
                onChange={(e) => getUserInfo(e)}
                className="form-control"
                type="password"
                id="password"
                name="password"
              />
              <div className="text-danger">
                {
                  validationError.filter(
                    (ele) => ele.context.label === "password"
                  )[0]?.message
                }
              </div>
            </div>
            <div className="my-3">
              <button className=" d-flex ms-auto btn btn-info">
                {loading ? (
                  `SignIn`
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
