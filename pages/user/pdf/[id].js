import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {Pdf1 , Pdf2 , Pdf3} from "/components/pdf";

const Pdf = ({ id }) => {
  let componentToRender = null;

  if (id == 1) {
    componentToRender = <Pdf1 />;
  } else if (id == 2) {
    componentToRender = <Pdf2 />;
  } else if (id == 3) {
    componentToRender = <Pdf3 />;
  } else {
    componentToRender = <div>No PDF component found for id: {id}</div>;
  }
  
  return (
      <>
       {componentToRender}
    </>
   )
}

export default Pdf;
export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}
