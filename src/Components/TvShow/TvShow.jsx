import axios from "axios";
import { useEffect, useState } from "react";
import Items from "../Items/Items";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
export default function TvShow() {
  const [tv, setTv] = useState([]);

  let pageList = new Array(10).fill("hazem").map((ele, i) => i + 1);
  // console.log(pageList);

  async function getTrending(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=09d299943e382dc63582620d44c8b78f&page=${pageNumber}`
      // `https://api.themoviedb.org/3/trending/movie/day?api_key=09d299943e382dc63582620d44c8b78f&page=${pageNumber}`
    );
    setTv(data.results);
    console.log(data.results);
  }

  async function search(e) {
    console.log(e.target.value);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=09d299943e382dc63582620d44c8b78f&language=en-US&query=${e.target.value}&page=$&include_adult=false`
    );
    setTv(data.results);
    getTrending();
  }

  function Pagination(page) {
    getTrending(page);
  }


  useEffect(() => {
    getTrending(1);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TvShow Page</title>
      </Helmet>

      <div className="container">
        <div className="d-flex justify-content-center py-3">
          <input
            onChange={search}
            type="search"
            className="w-75 form-control bg-transparent text-white"
            placeholder="search"
          />
        </div>

        <div className="row py-5">
          {tv
            ?.filter((tv) => tv.poster_path !== null)
            .map((tv) => (
              <Items key={tv.id} data={tv} />
            ))}
        </div>

        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center pt-5"
        >
          <ul className="pagination d-flex">
            {pageList?.map((ele) => (
              <li
                className="page-item"
                onClick={() => Pagination(ele)}
                key={ele}>

                <Link className={`page-link bg-primary text-white mx-1`}>{ele}</Link>
              
              </li>
            ))}

          </ul>
        </nav>
      </div>
    </>
  );
}
