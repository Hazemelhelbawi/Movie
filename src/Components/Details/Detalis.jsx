import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Detalis() {
const [details, setDetails] = useState([])
  let {id,type} = useParams()
  console.log(id);
  async function getDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=09d299943e382dc63582620d44c8b78f`)
    setDetails(data)
    console.log(details);
  }

  useEffect(() => {
    getDetails()
  
  }, [])
  
  return (
      <>
            <Helmet>
                <meta charSet="utf-8" />
                {details.title?<title>{details?.title}</title>
                :<title>{details?.name}</title>}
            </Helmet>
     <div className="container py-5">


        <div className="row">
          <div className="col-md-6">
          {/* <img
            className="img-fluid"
            src={`https://image.tmdb.org/t/p/w500` + details?.poster_path }
            alt=""
          /> */}
          {details.poster_path?<img className="img-fluid" src={`https://image.tmdb.org/t/p/w500` + details.poster_path }/> 
        :<img className="img-fluid" src={`https://image.tmdb.org/t/p/w500` + details.profile_path }/> }



          </div>
          <div className="col-md-6">
            <div className="item">
              <h2>{details?.title}{details?.name}</h2>
              <p>{details?.tagline}{details?.place_of_birth}</p>
              <ul className='list-unstyled d-flex'>
                {details?.genres?.map(genre=><div className='bg-info p-3 mx-2 rounded-2'>{genre.name}</div>)}
              </ul>
              {type.mediaType==='person'?'':
              <p>Vote :{details?.vote_average}{details?.popularity}</p>}
               {type.mediaType==='person'?'':
              <p>Vote count :{details?.vote_count}</p>}
              {type.mediaType==='person'?'':
              <p>Popularty :{details?.popularity}</p>}
             {type.mediaType==='person'?'':
              <p>release data :{details?.release_date}</p>}
              <p className='text-muted'>{details?.overview}{details?.biography}</p>
            </div>
          </div>
        </div>
      </div>
      
      </>

    )
}
