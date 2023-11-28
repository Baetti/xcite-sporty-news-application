import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";

function NewsDescription() {
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/newsitems/getnewsitembyid", {
        newsid: params.newsid,
      });
      setNewsItem(result.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const params = useParams();
  console.log(newsItem);
  return (
    <LayOut>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-5">
          <h1 className="my-3 text-3xl font-semibold">
            {newsItem !== null && newsItem.title}
          </h1>
          <h2 className="my-3 text-2xl">
            {newsItem !== null && newsItem.description}
          </h2>
          {newsItem !== null &&
            ReactHtmlParser(draftToHtml(JSON.parse(newsItem.content)))}
        </div>
      )}
    </LayOut>
  );
}

export default NewsDescription;
