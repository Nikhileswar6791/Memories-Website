import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import Posts from "../Posts/Posts";
const Form = ({ AllPosts, setAllPosts }) => {
  const [postMessage, setpostMessage] = useState({
    title: "",
    description: "",
  });

  const handleChange2 = (e) => {
    console.log(postMessage);
    const value_now = {
      title: postMessage.title,
      description: e.target.value,
    };
    console.log(e.target.value);
    setpostMessage((postMessage) => ({
      ...postMessage,
      ...value_now,
    }));
  };

  const addpost = async (e) => {
    // e.preventDefault();
    if (postMessage.title) {
      await axios
        .post("http://localhost:5000/addPost", postMessage)
        .then((res) => setAllPosts(res.data));
    }
  };
  const uploadImage = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const base64_file = await convertBase64(file);
    console.log(base64_file);
    const value_now = {
      title: base64_file,
      description: postMessage.description,
    };
    console.log(value_now);
    setpostMessage((postMessage) => ({
      ...postMessage,
      title: base64_file,
    }));
    console.log(postMessage);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <div className="Form">
        <form>
          {/* <div className="form-group first">
            <label for="exampleFormControlInput1">Title</label>
            <input
              type="file"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title"
              onChange={(e) => uploadImage(e)}
              value={postMessage.title}
            />
          </div> */}
          <div class="mb-3 first">
            <label for="formFile" className="form-label">
              File
            </label>
            <input
              onChange={(e) => uploadImage(e)}
              className="form-control"
              type="file"
              id="formFile"
            />
          </div>

          <div className="form-group second">
            <label for="exampleFormControlTextarea1">Note</label>
            <textarea
              className="form-control "
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Description"
              onChange={handleChange2}
              value={postMessage.description}
            ></textarea>
          </div>
          <div className="button">
            <button
              type="submit"
              class="btn btn-primary mb-2"
              onClick={addpost}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <Posts AllPosts={AllPosts} setAllPosts={setAllPosts} />
    </div>
  );
};

export default Form;
