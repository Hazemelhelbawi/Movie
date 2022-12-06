import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Offline } from "react-detect-offline";
import DetectOffline from '../Detect Offline/DetectOffline';
import {Helmet} from "react-helmet";

import Items from '../Items/Items'
import Loader from '../Loader/Loader'
import './Home.css'
export default function Home() {
  const [isLoading, setLoading] = useState(true)
  const [Movies, setMovies] = useState([])
  const [tv, setTv] = useState([])
  const [person, setPerson] = useState([])


  async function getTrending(type,dest){
   let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=09d299943e382dc63582620d44c8b78f`)
   dest(data.results)
   setLoading(false)
  // console.log(data.results);
  }

  useEffect(() => {
    getTrending('movie',setMovies);
    getTrending('tv',setTv);
    getTrending('person',setPerson);
    // getTrending('tv',setTv);
  })
  
  return (
    <>
                <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>
    <div className="container">


      {isLoading && <Loader/>}
      {!isLoading && <> 
      
        <div className="row g-4 pt-5">
        <div className="col-md-4 ">
          <div className="content d-flex justify-content-center flex-column h-100  ">
            <h2 className='position-relative'>Trending <br /> Movies <br /> to watch now</h2>
            <p className='text-muted'>Watch them now on your app</p>
          </div>
        </div>
      {Movies?.filter((movie)=>movie.poster_path !==null).slice(0,10).map(movie =><Items key={movie.id} data={movie}/>)}
      </div>



      <div className="row g-4 py-5">
        <div className="col-md-4 ">
          <div className="content d-flex justify-content-center flex-column h-100  ">
            <h2 className='position-relative'>Trending <br /> TV <br /> to watch now</h2>
            <p className='text-muted'>Watch them now on your app</p>
          </div>
        </div>
      {tv?.filter((tv)=>tv.poster_path !==null).slice(0,10).map(tv =><Items key={tv.id} data={tv}/>)}
      </div>
      
      
      
      <div className="row g-4 py-5">
        <div className="col-md-4 ">
          <div className="content d-flex justify-content-center flex-column h-100  ">
            <h2 className='position-relative'>Trending <br /> People <br /> to watch now</h2>
            <p className='text-muted'>Watch them now on your app</p>
          </div>
        </div>
      {person?.filter((person)=>person.profile_path !==null).slice(0,10).map(person =><Items key={person.id} data={person}/>)}
      </div>
      
      </>}





 
    </div>
    <Offline> <DetectOffline/> </Offline>
    </>
  )
}

