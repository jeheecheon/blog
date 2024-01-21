import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store'

export const TestPage = () => {
  const [value, setValue] = useState('');
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();

          window.location.replace("/api/oauth/sign-in?provider=google");
        }}
      >Google Sign in</button>

      <ReactQuill theme="snow" value={value} onChange={(val) => {
        console.log(val);
        setValue(val);
      }} />
      <img src='https://photos.app.goo.gl/1Ytb33jYad4Mb7u86' />
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

export default TestPage