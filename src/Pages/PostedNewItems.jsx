import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function PostedNewItems() {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("xcitesporty-user"));

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/newsitems/getnewsbyuserid", {
        userid: user._id,
      });
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

  // delete news
  const deleteItem = async (newsid) => {
    setLoading(true);
    try {
      await axios.post("/api/newsitems/deletenewsitem", {
        newsid,
      });
      // setLoading(false);
      getData();
    } catch (error) {
      // console.log(error);

      setLoading(false);
    }
  };

  return (
    <LayOut>
      {loading && <Spinner />}

      {newsItems.length > 0 && (
        <div className="p-5">
          <h1 className="text-3xl mb-5 font-semibold underline">POSTED NEWS</h1>
          <table className="w-full border-2 border-black shadow p-10">
            <thead className="w-full ">
              <tr className="w-full">
                <th className="border border-black p-1 ">Id</th>
                <th className="border border-black p-1 ">Title</th>
                <th className="border border-black p-1">Posted On</th>
                <th className="border border-black p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => {
                return (
                  <tr>
                    <td className="border border-gray-500 p-2 ">{item._id}</td>
                    <td className="border border-gray-500 p-2 ">
                      {item.title}
                    </td>
                    <td className="border border-gray-500 p-2 ">
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className="border items-center border-gray-500  items-center p-2 ">
                      <div className="flex  justify-center space-x-2 pr-2 mt-2">
                        <button
                          className="px-5 py-1  bg-red-800 rounded text-sm text-white "
                          onClick={() => deleteItem(item._id)}
                        >
                          DELETE
                        </button>
                        <button
                          onClick={() => navigate(`/edit/${item._id}`)}
                          className="px-5 py-1  bg-green-800 rounded text-sm text-white "
                        >
                          EDIT
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </LayOut>
  );
}

export default PostedNewItems;
