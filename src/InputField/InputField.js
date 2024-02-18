import React from 'react';
import "./index.css"
export default function InputFeild({fetchData, inputValue, setInputValue, usersData}) {
  // let [inputValue, setInputValue] = React.useState("")
  let handleChange = (e) => {
    setInputValue(_ => e.target.value)
    fetchData(e.target.value, 1)
  }

  let searchIcon = <svg xmlns="http://www.w3.org/2000/svg" stroke='20' width="16" height="16" fill="#ba0c0c" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
      </svg>

  return (
    <div className="input-container" id={usersData.length > 0 ? "active" : ""}>
      <input value={inputValue} onChange={handleChange} className=" main-input"  placeholder='Search' />
      <div className="cursor-pointer">{searchIcon}</div>
    </div>
  )
}