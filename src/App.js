import logo from "./logo.svg";
import styles from "./App.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, updatePost } from "./redux/posts";

function App() {
  const [isPostSaved, setIsPostSaved] = useState(false);
  const dispatch = useDispatch();
  const { loading, hasErrors, posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const handleSubmit = (e) => {
    if (formData.id) {
      // Update an existing post
      dispatch(updatePost(formData));
    } else {
      // Create a new post
      dispatch(createPost(formData));
    }
    setIsPostSaved(true);
  };
  const handleEdit = (post) => {
    setFormData({ title: post.title, body: post.body, id: post.id });

    // dispatch(
    //   updatePost({
    //     title: 'Emmanuel',
    //     body: "son of christ",
    //     id: 10,
    //   })
    // )
    console.log("mmm", post);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wow Blog</h1>
      <div className={styles.postsContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : hasErrors ? (
          <p>Error loading posts.</p>
        ) : (
          posts.slice(0, 10).map((post) => (
            <div key={post.id} className={styles.postCard}>
              <img
                src={`https://picsum.photos/300/200?random=${post.id}`}
                alt={post.title}
                className={styles.postImage}
              />
              <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.body}</p>
                <button className={styles.readMoreButton}>Read More</button>
                <button
                  className={styles.readMoreButton}
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
        <div>
          <form>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </label>
            <input
              type="text"
              name="body"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
            />
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <button
              onClick={handleSubmit}
              type="submit"
              value="Submit"
              className={styles.readMoreButton}
            >
              {formData.id ? "Update" : "Submit"}
            </button>
          </form>
          {isPostSaved && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid black",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "white",
                zIndex: "1000",
              }}
            >
              <h3>Post Saved!</h3>
              <p>
                Title: {formData.title}
                <br />
                Body: {formData.body}
                <br />
                id: {formData.id}
              </p>
              <button onClick={() => setIsPostSaved(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
