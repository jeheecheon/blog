export const Blog = () => {
  return (
    <>
      <div>Blog page</div>
      <button
        onClick={(e) => {
          e.preventDefault();

          console.log("Clicked");

          fetch("https://localhost:7130/api/Test/abcd")
            .then((response) => {
              console.log(response.statusText);
            })
            .catch((error) => {
              console.log(error);
              console.log("failed to fetch");
            });
        }}
      >Fetch button</button>
    </>
  )
}

export default Blog;
