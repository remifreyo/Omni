import React, { useRef } from 'react'

const FileInputButton = ({ onFileSelected }) => {
  const hiddenFileInput = useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      onFileSelected(selectedFile)
    }
  }

  return (
    <>
      <button className="custom-file-button" onClick={handleClick}>
        Upload a file
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default FileInputButton
