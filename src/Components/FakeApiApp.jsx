import PostContainer from "./PostContainer";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";

export default function FakeApiApp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setnewPost] = useState({ title: "", body: "" });

  const URL = "https://jsonplaceholder.typicode.com/posts";
  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error getting data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleChange = (e) => {
    setnewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.body) {
      setData([newPost, ...data]);
      setnewPost({
        title: "",
        body: "",
      });
    }
  };
  return (
    <>
      <div>
        <h1>Fake API App</h1>
        <PostForm
          newPost={newPost}
          HandleChange={HandleChange}
          HandleSubmit={HandleSubmit}
        />
        {loading ? <p>Loading...</p> : <PostContainer data={data} />}
      </div>
    </>
  );
}
