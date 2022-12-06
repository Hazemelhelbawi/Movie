import React from 'react'
import {Helmet} from "react-helmet";

export default function Profile({userData}) {
  return (
    <>
                <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
    <div className="container">
        <div className="d-flex  justify-content-center align-items-center pt-5 ">
            <div className='bg-gradient text-center border-0 rounded-2 px-4'>
            <h2 className='py-4'>
             Name : {userData.first_name} {userData.last_name}
        </h2>
        <h2 className='py-4'>
            Email : {userData.email}
        </h2>
        <h2 className='py-4'>
            Age : {userData.age}
        </h2>
            </div>
        </div>
    </div>
    </>
  )
}
