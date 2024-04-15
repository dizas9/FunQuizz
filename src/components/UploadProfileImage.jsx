import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { DEV_URL } from "../API";

export default function UploadProfileImage({ avater }) {
  const [img, setImg] = useState();
  const [click, setClick] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileInputRef = useRef(null);

  // function handleImgUpload(e) {
  //   e.preventDefault();
  //   setUploadMsg("Image Uploading");
  //   const formDataSend = new FormData();
  //   formDataSend.append("image", fileInputRef.current.files[0]);

  //   axios
  //     .post(`${DEV_URL}/api/user/imageUpload`, formDataSend)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         navigate("/login", { state: { msg: res.data.message } });
  //         setUploadMsg("Image Upload Success");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setUploadMsg("Try again");
  //     });
  // }

  // function handleEditButtonClick() {
  //   fileInputRef.current.click();
  //   setClick(true);
  // }
  // function handleSubmit(e) {
  //   setClick(false);
  //   handleImgUpload(e);
  // }

  useEffect(() => {
    setImg(avater);
  }, [avater]);

  return (
    <>
      <div className="flex flex-col gap-2 items-center ">
        <img
          src={`${DEV_URL}/images/${img}`}
          alt=""
          className="w-20 border-2 rounded-full p-1"
        />
        {/* <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <input
              type="file"
              name="image"
              accept="img/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const selectImage = e.target.files[0];
                const imgUrl = URL.createObjectURL(selectImage);
                setImg(imgUrl);
                setFormData({ image: selectImage });
              }}
            />
            <button
              onClick={handleEditButtonClick}
              className="flex gap-1 items-center bg-red-500 font-Noto rounded-md p-1 text-white text-sm"
              type="button"
            >
              <span className="">Edit</span>
              <FaRegEdit color="white" />
            </button>
          </label>

          {click && (
            <>
              <button
                type="submit"
                className="bg-green-500 text-white text-sm font-Noto px-4 p-1 rounded-md "
              >
                Submit
              </button>
            </>
          )}
          <p className="">{uploadMsg}</p>
        </form> */}
      </div>
    </>
  );
}
