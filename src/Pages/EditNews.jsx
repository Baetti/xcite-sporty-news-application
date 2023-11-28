import React, { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import LayOut from "../components/LayOut";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useParams } from "react-router-dom";
function EditNews() {
  // Draft.js
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  // const[newsItem,setNewsItem]=useState(null)
  const navigate = useNavigate();

  const params = useParams();

  const user = JSON.parse(localStorage.getItem("xcitesporty-user"));

  // console.log(user);

  const save = async () => {
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        postedBy: {
          userid: user._id,
          email: user.email,
        },
        newsid: params.newsid,
      };
      await axios.post("/api/newsitems/editnewsitem", payload);
      setLoading(false);
      alert("News Edited Successfully");
      // toast.success("News Edited Successfully", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      navigate("/home");
    } catch (error) {
      // console.log(error);
      toast.error(`Please write the required contents:`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/newsitems/getnewsitembyid", {
        newsid: params.newsid,
      });
      setTitle(result.data.title);
      setDescription(result.data.description);
      setEditorState(() =>
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(result.data.content))
        )
      );
      setLoading(false);
    } catch (error) {
      // console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayOut>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">EDIT NEWS</h1>
      <div className="px-3 py-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full h-10 border-2 rounded border-emerald-600 px-2"
          placeholder="Title of the news "
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full  border-2 border-emerald-300 rounded my-2 px-2"
          name=""
          id=""
          rows="4"
        ></textarea>
      </div>
      <div className=" border-2 border-emerald-300 mx-3 rounded px-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorClassName="draft-editor"
        />
      </div>
      <div className="flex justify-end space-x-5 pr-3 mt-3">
        <button
          className="px-5 py-1  bg-red-800 rounded text-sm text-white"
          onClick={() => navigate("/home")}
        >
          BACK
        </button>
        <button
          onClick={save}
          className="px-5 py-1  bg-green-800 rounded text-sm text-white"
        >
          SAVE
        </button>
      </div>
      <ToastContainer />
    </LayOut>
  );
}

export default EditNews;
