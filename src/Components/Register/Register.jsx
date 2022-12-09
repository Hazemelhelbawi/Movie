import axios from 'axios';
import Joi from 'joi';
import {Helmet} from "react-helmet";
import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [loading,setLoading]=useState(true)
    const [errorMsg,setErrorMsg]=useState('')
    const [validationError,setvalidationError]=useState([])
    let navigate = useNavigate()
let [user,setUser]=useState({
    first_name:"",
    last_name:"",
    age:'',
    email:"",
    password:""

})
function getUserInfo(e){
console.log(e.target.value);
let currentUser = {...user};
currentUser[e.target.name]=e.target.value
setUser(currentUser)
console.log(currentUser);
}

async function register(e) {
    setLoading(false)
    e.preventDefault()
    if(validationUser()){
   let {data}= await axios.post('https://sticky-note-fe.vercel.app/signup',user)
    let respone = data        
    
    if (respone.message=='success'){
        navigate('/login')
    }
    else{
        setLoading(true)
        setErrorMsg(respone.errors)
    }
}
}



console.log(errorMsg);

function validationUser(){
    let schema = Joi.object({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        age: Joi.number().min(15).max(60).required(),

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
                <title>SignUp</title>
            </Helmet>
        <div className="container">
            <div className='w-75 mx-auto'>
                <div className='my-4'>
                <h3>Registeration form</h3>
                </div>
                    {errorMsg?<div className="alert alert-danger">
                    {errorMsg?.email?.message}
                </div>:'' }
                <form onSubmit={(e)=>register(e)} >
                    <div className="form-group">
                        <label className='mt-3' htmlFor="first_name">First Name :</label>
                        <input onChange={(e)=>getUserInfo(e)} className='form-control' type="text" id='first_name' name='first_name' />
                      <div className='text-danger'>
                        {validationError.filter((ele)=>ele.context.label=='first_name')[0]?.message}
                    </div>
                    </div>
                    <div className="form-group">
                        <label className='mt-3' htmlFor="last_name">Last Name :</label>
                        <input  onChange={(e)=>getUserInfo(e)} className='form-control' type="text" id='last_name' name='last_name' />
                        <div className='text-danger'>

                        {validationError.filter((ele)=>ele.context.label=='last_name')[0]?.message}

                    </div>
                    </div>
                    <div className="form-group">
                        <label className='mt-3' htmlFor="age">Age :</label>
                        <input  onChange={(e)=>getUserInfo(e)} className='form-control' type="number" id='age' name='age' />
                        <div className='text-danger'>

                        {validationError.filter((ele)=>ele.context.label=='age')[0]?.message}

                    </div>
                    </div>

                    <div className="form-group">
                        <label className='mt-3' htmlFor="email">Email :</label>
                        <input  onChange={(e)=>getUserInfo(e)} className='form-control' type="text" id='email' name='email' />
                        <div className='text-danger'>

                        {validationError.filter((ele)=>ele.context.label=='email')[0]?.message}

                    </div>
                    </div>
                    <div className="form-group">
                        <label className='mt-3' htmlFor="password">Password :</label>
                        <input  onChange={(e)=>getUserInfo(e)} className='form-control' type="password" id='password' name='password' />
                        <div className='text-danger'>

                        {validationError.filter((ele)=>ele.context.label=='password')[0]?.message}

                    </div>
                    </div>
                    <div className='my-3'>
                    <button className=' d-flex ms-auto btn btn-info'>{loading?`SignUp`:<i className='fas fa-spinner fa-spin'></i>}</button>

                    </div>
                </form>
            </div>
        </div>
        
        </>

    )
}



