"use client"; //because we are handling onclick downthere
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string; //for storing the public id //used for the src in the image
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && ( //checking if there is public id if there is we will render the uploaded image
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="A Cloudinary image"
        />
      )}
      <CldUploadWidget
        uploadPreset="gdbybt2f"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
        }}
        onSuccess={(result, widget) => {
          if (result.event !== "success") return; //return nothing
          const info = result.info as CloudinaryResult; // or if there is no interface we can just write as {public_id : string}
          setPublicId(info.public_id); //setting the public id
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
