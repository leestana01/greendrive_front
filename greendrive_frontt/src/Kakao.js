import React, { useState, useEffect } from "react";
import axios from "axios";

const { kakao } = window;

const BACKEND_URL = axios.create({
  baseURL: "http://api.greendrive.kro.kr/spaces", //백엔드 서버 주소
});

const Kakao = ({ searchPlace, isMapDetail }) => {
  const [currentMap, setCurrentMap] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const [mark, setMark] = useState([]);

  //데이터 불러오기
  const initBookmark = async () => {
    try {
      const response = await BACKEND_URL.get("");
      const items = response.data;
      setMark(items);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //웹 시작 시에만 실행되는 useEffect
  useEffect(() => {
    initBookmark();
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("Map");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("현재 위치의 위도:", latitude);
        console.log("현재 위치의 경도:", longitude);
        setLatlng(new kakao.maps.LatLng(latitude, longitude));

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const newMap = new kakao.maps.Map(container, options);
        setCurrentMap(newMap); // map 상태 업데이트

        //위치 검색 객체 생성
        const ps = new kakao.maps.services.Places();
        //키워드로 위치 찾기
        ps.keywordSearch("전기차", placesSearchCB, {
          location: latlng,
          radius: 500,
        });

        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            //LatLngBounds(): 좌표계에서 사각영역 정보를 표현하는 객체를 생성
            // 인자를 주지 않으면 빈 영역을 생성한다.
            let bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              //extend(): 인수로 주어진 좌표를 포함하도록 영역 정보 확장
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            //setBounds: 사각형 영역 지정
            newMap.setBounds(bounds);
          }
        }
        //마커 생성 및 마커 클릭시 정보 출력
        function displayMarker(place) {
          //마커 생성
          let marker = new kakao.maps.Marker({
            map: newMap,
            //place의 y,x값을 받아와서 표시
            position: new kakao.maps.LatLng(place.y, place.x),
          });
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px; font-size:12px; word-break: keep-all; min-height: 35px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(newMap, marker);
          });
        }
      });
    } else {
      console.log("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  }, []);

  //검색창에 검색 시 실행되는 useEffect
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("Map");
    const options = {
      center: new kakao.maps.LatLng(37.4020923, 127.100207),
      level: 3,
    };
    //지도 객체 생성
    const map = new kakao.maps.Map(container, options);

    //위치 검색 객체 생성
    const ps = new kakao.maps.services.Places();
    //키워드로 위치 찾기
    ps.keywordSearch(searchPlace + "전기차", placesSearchCB, {
      useMapCenter: true,
      radius: 100,
    });

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        //LatLngBounds(): 좌표계에서 사각영역 정보를 표현하는 객체를 생성
        // 인자를 주지 않으면 빈 영역을 생성한다.
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          //extend(): 인수로 주어진 좌표를 포함하도록 영역 정보 확장
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        //setBounds: 사각형 영역 지정
        map.setBounds(bounds);

        // data.forEach((place) => {
        //   const latlng = new window.kakao.maps.LatLng(place.y, place.x);
        //   const marker = new window.kakao.maps.Marker({
        //     position: latlng,
        //     map: map,
        //   });

        //   const radius = 100;
        //   const center = map.getCenter();
        //   const pos = marker.getPosition();
        //   const poly = new kakao.maps.Polyline({
        //     path: [center, pos],
        //   });

        //   const dist = poly.getLength(); // m 단위로 거리 리턴

        //   // 100m 이내의 주차장만 표시
        //   if (dist < radius) {
        //     marker.setMap(map);
        //   } else {
        //     marker.setMap(null);
        //   }
        // });
      }
    }

    //마커 생성 및 마커 클릭시 정보 출력
    function displayMarker(place) {
      //마커 생성
      let marker = new kakao.maps.Marker({
        map: map,
        //place의 y,x값을 받아와서 표시
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px; font-size:12px; word-break: keep-all; min-height: 35px;">' +
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
