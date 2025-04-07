import { useEffect, useState } from "react";
import { updateStroyThumbnail } from "../apis/story";
import { createToast } from "../lib/utils";

function ImageHandler({ storyId, setImageFile, newStory, imageURL }) {
  const [file, setFile] = useState({
    url: null,
    name: null,
    type: null,
    raw: null, // Store raw file for upload
  });
  const [URL, setURL] = useState(null);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleChange(e) {
    const fileData = e.target.files?.[0];
    if (fileData) {
      if (fileData.type.startsWith("image/")) {
        const objectURL = window.URL.createObjectURL(fileData);
        setFile({
          url: objectURL,
          name: fileData.name,
          type: fileData.type,
          raw: fileData, // Store raw file for upload
        });
        setError(null);
        if (!newStory) setImageFile(fileData);
      } else {
        setError("Please select an image file.");
        setFile({ url: null, name: null, type: null, raw: null });
      }
    }
  }

  useEffect(() => {
    if (imageURL) {
      setURL(imageURL);
    }
  }, [imageURL]);

  useEffect(() => {
    if (file.url) {
      setURL(file.url);
    }

    return () => {
      if (file.url) {
        window.URL.revokeObjectURL(file.url);
      }
    };
  }, [file.url]);

  async function uploadImage() {
    if (!file.raw) {
      setError("No file selected for upload.");
      return;
    }

    try {
      setUploading(true);
      const response = await updateStroyThumbnail(storyId, file.raw);
      if (response.status === 200) {
        console.log("Upload successful:", response.data);
        setURL(response.data.data.imageURL);
        setFile({ name: null, raw: null, type: null, url: null });
        createToast("Image uploaded successfully!", "success");
      }
    } catch (error) {
      if (error.response.status === 401) {
        createToast("You are not authorized to perform this action", "warning");
        return;
      }
      if (error.response.status === 401) {
        createToast("Cloudinary Issue", "error");
        return;
      }
      console.log(error);
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="size-fit flex flex-col gap-4 items-center justify-center max-w-full">
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center w-full px-4 py-2 bg-white dark:bg-neutral-300 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-400 focus-within:outline-none focus-within:ring-2 focus-within:border-transparent transition duration-300 ease-in-out"
      >
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          onChange={handleChange}
        />
        <div className="flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <span className="text-sm font-medium text-gray-600">
            {file.name ? file.name : "Choose an image for the thumbnail"}
          </span>
        </div>
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {URL && (
        <div
          className="relative inline-block"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img
            src={URL}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200 hover:backdrop-blur-xs"
          />
          {hover && storyId && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <button
                className="border border-green-50 px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition duration-75 ease-in"
                onClick={uploadImage}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageHandler;
