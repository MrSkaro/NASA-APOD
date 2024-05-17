import React from 'react'

export default function Content(props) {
  const { data } = props

  return (
    <div className="imgContainer">
        <img src={data?.hdurl} alt={data.title || "bgImg"} className="bgImg" />
    </div>
  )
}
