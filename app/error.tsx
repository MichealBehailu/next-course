"use client"; //must to see this component on the client side orelse there will be error
//this act as a root error handling 
import React from "react";

interface Props {
  error: Error;
  Reset : () => void;
}
const ErrorPage = ({ error, Reset}: Props) => {
  return (
    <>
      <div>An unexpected error occured.</div>
      <button className="btn" onClick={()=>Reset()}>Retry</button>
    </>
  );
};

export default ErrorPage;
