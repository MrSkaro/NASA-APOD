import React from 'react'

export default function Footer(props) {
  const { handleToggleModal, shuffle, data } = props
  return (
    <footer>
        <div className="bgGradient"></div>
        <div className="title">
          <h1>APOD Project</h1>
            <h2>{data?.title}</h2>
        </div>
        <div className="buttons">
          <button onClick={shuffle}>
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button onClick={handleToggleModal}>
            <i className="fa-solid fa-circle-info"></i>
          </button>
        </div>
    </footer>
  )
}
