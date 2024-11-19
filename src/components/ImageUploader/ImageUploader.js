import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import "./ImageUploader.scss";
import { FaCamera } from 'react-icons/fa';

function ImageUploader({ image, setImage }) {
  const { showNotification } = useContext(AppContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/bmp"];
      if (!validFormats.includes(file.type)) {
        showNotification("Please upload a PNG, JPG, or BMP image.", "error");
        return;
      }

      const maxSize = 1024 * 1024;
      if (file.size > maxSize) {
        showNotification("Image must be below 1024x1024 pixels.", "error");
        return;
      }

      showNotification("Image uploaded successfully!", "success");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <label className="image-uploader-label">Profile picture</label>
      <div className="custom-file-input">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image-upload"
          className="image-upload-input"
        />
        <label htmlFor="image-upload" className="image-upload-button">
          {image && (
            <>
              <img src={image} alt="Preview" className="image-preview" />
              <div className="overlay">
                <FaCamera className="overlay-icon" />
                <span className="overlay-text">Change Image</span>
              </div>
            </>
          )}
          {!image && "Upload Image"}
        </label>
      </div>
      <p className="image-requirements">
        Image must be below 1024x1024. <br /> Use PNG, JPG, or BMP format.
      </p>
    </div>
  );
}

export default ImageUploader;
