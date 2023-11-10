import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchList = (mark, searchPlace) => {
  // const navigate = useNavigate();
  const [searchArea, setSearchArea] = useState([]);

  useEffect(() => {
    for (let i = 0; i < mark.length; i++){
      if (mark[i].address.includes(searchPlace)) {
        setSearchArea([...searchArea, mark[i]]);
      }
    }
  }, []);

  function gotoParkingDetails() {
    
  }

  return (
    <div>
      <ul>
        {searchArea.map((item, index) => (
              <li onClick={gotoParkingDetails} key={index} >
                <h5>{item.parkName}</h5>
                <p>{item.address}</p>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default SearchList