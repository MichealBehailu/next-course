import React from "react";

interface Props {
  params: { slug?: string[] };
  searchParams: { sortOrder?: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      ProductPage {slug && slug.join("/")} {sortOrder}
    </div>
  );
};

export default ProductPage;

//the filename [[...slug]] the double bracket indicates it is optional plus it has a benfit to handle nested endpoints
