import React from 'react'
import { useParams } from 'react-router-dom';

const CasinoForDesk = () => {

    const {id}= useParams("id");
    // console.log(id)

  const token = localStorage.getItem("token");
  return (
    <>
        <iframe
        src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
        className="mobile_if"
        width="100%"
        title="mobile"
        allowFullScreen={true}></iframe>
      <iframe
        src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
        className="desktop_if"
        width="100%"
        title="desktop"
      />
    </>
  )
}

export default CasinoForDesk