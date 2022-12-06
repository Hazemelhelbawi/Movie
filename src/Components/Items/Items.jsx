import React from "react";
import { Link } from "react-router-dom";
export default function Items({ data }) {
  return (
    <>

      
        <div className="col-md-2 position-relative">
        <div className="items position-relative overflow-hidden">
          
        {data.poster_path?<img className="img-fluid" src={`https://image.tmdb.org/t/p/w500` + data.poster_path }/> 
        :<img className="img-fluid" src={`https://image.tmdb.org/t/p/w500` + data.profile_path }/> }
         <Link to={`/details/`+data.id +'/'+data.media_type}>
         <div className="overlay">
            {data.overview?<h6 className="p-1 text-white">{data.overview?.split(" ").splice(0,20).join(" ")}</h6>
            :<h6 className="p-1 text-white">{data.known_for_department}</h6>}
            {/* // <h6 className="p-1 text-white">{data.overview?.split(" ").splice(0,20).join(" ")}</h6> */}
          </div>
         </Link>       
        </div>
        <h6 className="text-center py-1">{data.title} {data.name}</h6>
        {data.vote_average?<div className="vote bg-info p-2 position-absolute top-0 end-0">{data.vote_average?.toFixed(1)}</div>:''}
      </div>
      
  
   
    </>
  );
}
