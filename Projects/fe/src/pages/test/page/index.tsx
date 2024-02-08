import { useState } from 'react';
export const TestPage = () => {
  const [selectedImage, setSelectedImage] = useState<FileList | null>(null);
  return (
    <>
      <img
        alt="not found"
        src={selectedImage ?  URL.createObjectURL(selectedImage[0]) : ''}
      />

      <input type='file'
        onChange={(event) => {
          if (event.target.files !== null) {
            console.log(URL.createObjectURL(event.target.files[0]))
            setSelectedImage(event.target.files);
          }
        }}
      />
    </>
  )
}

export default TestPage