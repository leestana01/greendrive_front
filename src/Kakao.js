import React, { useState, useEffect } from "react";
import axios from "axios";

const { kakao } = window;

const BACKEND_URL = axios.create({
  baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

// InfoWindow를 저장할 상태
let openInfo = null;

const Kakao = ({
  searchPlace,
  isMapDetail,
  Mark,
  dataType,
  getParkingDetailInfo,
}) => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mark, setMark] = useState([]);
  const [pos, setPos] = useState([]);
  const [markers, setMarkers] = useState([]);

  //주차장 id로 상세정보 검색
  const searchParking = async (data) => {
    try {
      const response = await BACKEND_URL.get(`/spaces/${data}`);
      const items = response.data;
      return items;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /// 마커 클릭 이벤트 핸들러
  function handleMarkerClick(marker, id) {
    //promise data 가져오기
    const details = searchParking(id);
    const getData = () => {
      details.then((data) => {
        // console.log(data);
        if (openInfo !== null) {
          openInfo.close();
        }
        const infowindow = new kakao.maps.InfoWindow({
          content: data.parkName,
        });
        // title을 표시할 InfoWindow 생성
        infowindow.setContent(
          '<div style="padding:5px; word-break: keep-all; min-height: 45px;">' +
            '<p style="margin: 3px; font-weight: bold; font-size:14px;">' +
            data.parkName +
            '</p> <p style="margin: 5px; padding-bottom: 5px; font-size:11px;">' +
            data.address +
            "</p>" +
            "</div>"
        );

        // 클릭된 마커 주변에 InfoWindow 표시
        infowindow.open(map, marker);

        // InfoWindow 클릭 이벤트 리스너 추가
        kakao.maps.event.addListener(infowindow, "click", () => {
          // 여기에 인포윈도우 클릭 시 실행할 코드 작성
          console.log("인포윈도우 클릭 이벤트 발생");
        });

        // 열린 InfoWindow 상태 업데이트
        openInfo = infowindow;
      });
    };
    getData();
  }
  function handleLocationInfoWindow(id) {
    const details = searchParking(id);
    const getData = () => {
      details.then((data) => {
        getParkingDetailInfo(data);
      });
    };
    getData();
  }

  //웹 시작 시에만 실행되는 useEffect
  useEffect(() => {
    setMark(Mark);
    const container = document.getElementById("Map");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("현재 위치의 위도:", latitude);
        console.log("현재 위치의 경도:", longitude);
        const currentLocation = new kakao.maps.LatLng(latitude, longitude);
        setCurrentLocation(currentLocation);

        const options = {
          center: currentLocation,
          level: 8,
        };

        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap); // map 상태 업데이트
      });
    } else {
      console.log("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  }, []);

  // Mark 상태가 변경될 때(데이터 요청 주소가 변경될 때) 실행
  useEffect(() => {
    //모든 마커 삭제
    if (markers[0] !== null)
      for (let i = 0; i < markers.length; i++) markers[i].setMap(null);
    for (let i = 0; i < Mark.length; i++) {
      const markLocation = new kakao.maps.LatLng(
        Mark[i].latitude,
        Mark[i].longitude
      );

      setPos((prevPos) => [
        ...prevPos,
        {
          id: Mark[i].id,
          latlng: markLocation,
          type: Mark[i].type,
        },
      ]);
    }
  }, [Mark]);

  // 이펙트 후에 마커 생성
  useEffect(() => {
    //즐겨찾기 마커 이미지
    // var imageSrc =
    //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var imageSrc =
      dataType === 0
        ? `${process.env.PUBLIC_URL}/images/marker_blue.png`
        : dataType === 1
        ? `${process.env.PUBLIC_URL}/images/marker_red.png`
        : dataType === null
        ? "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png"
        : "";
    for (let i = 0; i < pos.length; i++) {
      if (pos[i].type === dataType || dataType === null) {
        //이미지 객체 생성
        const imageSize = new kakao.maps.Size(24, 35);
        //마커 이미지 객체 생성
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const marker = new kakao.maps.Marker({
          map: map,
          position: pos[i].latlng,
          title: pos[i].id,
          //마커 이미지를 즐겨찾기 마커 객체로 설정
          image: markerImage,
        });
        setMarkers((prevMarkers) => [...prevMarkers, marker]);

        // 마커를 클릭할 때 이벤트 핸들러 등록
        kakao.maps.event.addListener(marker, "click", () => {
          handleMarkerClick(marker, pos[i].id);
          handleLocationInfoWindow(pos[i].id);
        });
      }
    }
  }, [pos, map]);

  useEffect(() => {
    // 검색할 지역 이름
    const keyword = searchPlace;
    if (openInfo !== null) openInfo.close();
    if (keyword !== null || keyword !== "") {
      // 위치 검색 객체 생성
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, placesSearchCB, {
        radius: 1000,
      });
      // 키워드로 위치 찾기(지도 이동)
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색 결과에서 첫 번째 장소를 가져옴
          const place = data[0];
          map.setLevel(6, {
            anchor: new kakao.maps.LatLng(place.y, place.x),
          });
          // 검색된 장소의 좌표로 지도 이동
          const moveLatLng = new kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLng);
        }
      }
    }
  }, [searchPlace]);

  return (
    <div
      id="Map"
      style={{
        width: "100%",
        height: isMapDetail ? "100%" : "450px",
        zIndex: "0",
      }}
    ></div>
  );
};

export default Kakao;
