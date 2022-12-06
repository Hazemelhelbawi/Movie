import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

export default function RoutLayout({userData , logout}) {
  return (
<>
<Navbar userData={userData} logout={logout}/>
<Outlet/>
</>

    )
}
