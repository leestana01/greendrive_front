import React, { useState, useEffect } from "react";

const { kakao } = window;

const Kakao = ({ searchPlace, isMapDetail }) => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const container = document.getElementById("Map");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("현재 위치의 위도:", latitude);
        console.log("현재 위치의 경도:", longitude);

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap); // map 상태 업데이트
      });
    } else {
      console.log("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  }, []);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("Map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px; font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div
      id="Map"
      style={{
        width: "100%",
        height: isMapDetail ? "100%" : "500px",
        zIndex: "0",
      }}
    ></div>
  );
};

export default Kakao;
