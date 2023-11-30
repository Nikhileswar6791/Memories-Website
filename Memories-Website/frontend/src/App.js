import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import axios from "axios";
const App = () => {
  const [AllPosts, setAllPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((res) => setAllPosts(res.data));
  }, []);

  return (
    <div>
      <Header />
      <Form AllPosts={AllPosts} setAllPosts={setAllPosts} />
    </div>
  );
};
export default App;
