export const Blog = () => {
  return (
    <>
      <div>Blog page</div>
      <button
        onClick={(e) => {
          e.preventDefault();

          console.log("Clicked");

          fetch("/api/Test/abcd",
              {
                  credentials: "same-origin"
              })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => {
              console.log(error);
              console.log("failed to fetch");
            });
        }}
      >
        Fetch button
      </button>

      <button onClick={(e) => {
        e.preventDefault();

        // fetch()
      }}>
        Autho test button
      </button>
    </>
  )
}

export default Blog;
