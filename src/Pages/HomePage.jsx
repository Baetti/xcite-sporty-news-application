import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
// import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/newsitems/getallnewsitems");
      setLoading(false);
      setNewsItems(result.data);
    } catch (error) {
      // console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <LayOut>
        {loading && <Spinner />}
        <div className="grid px-20 sm:px-5 mt-5">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="w-full h-10 border-2 rounded border-emerald-600 px-5"
            placeholder="Search News "
          />
        </div>
        {newsItems.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:mx-5 mx-20 my-5 ">
            {newsItems
              .filter((item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item) => {
                return (
                  <div
                    className="shadow-md p-3 border cursor-pointer"
                    onClick={() => navigate(`/newsdesc/${item._id}`)}
                  >
                    <h1 className="text-primary text-lg font-semibold">
                      {item.title}
                    </h1>
                    <p>{item.description}</p>
                    <div className="flex justify-end items-end flex-col">
                      <span className="text-gray-400 text-sm">
                        By: {item.postedBy.email}
                      </span>
                      <span className="text-gray-400 text-sm">
                        On: {item.createdAt.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </LayOut>
    </>
  );
}

export default HomePage;
