import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: number };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  //here am also destructuring the params too to grab the id

  if(id > 10) notFound()
  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;
