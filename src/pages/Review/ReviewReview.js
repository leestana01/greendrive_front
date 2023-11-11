
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { emotionList } from "../../util/emotion";
import MyHeader from "../../components/MyHeader"; 
import MyButton from "../../components/MyButton"; 
import styled from "styled-components";
import Nav from "../../components/Nav";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #ffffff;
  -ms-overflow-style: none;
  max-width: 100%;
  justify-content: center;
  align-items: center;

  @media (hover: hover) {
    width: 100%;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Body = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 10px;
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  width: 393px;
  height: 852px;
`;
const Greeting = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ReviewReview = () => {
  const { id } = useParams();
  const reviewList = useContext(ReviewStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [userName, setUserName] = useState(""); // Added state for the user's name

  useEffect(() => {
    // Simulating fetching user data based on the user ID
    const fetchUserData = async () => {
      try {
        // Assuming you have an API endpoint to fetch user data
        const response = await fetch(`http://api.example.com/users/${id}`);
        const userData = await response.json();
        setUserName(userData.name); // Assuming the user's name is in the fetched data
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [id]);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `리뷰 - ${id}번 리뷰`;
  }, []);

  useEffect(() => {
    if (reviewList.length >= 1) {
      const targetReview = reviewList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetReview) {

        setData(targetReview);
      } else {
        alert("없는 리뷰입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, reviewList]);

  if (!data) {
    return <div className="ReviewPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);

    return (
    
      <div className="ReviewPage">
          <Container>
  <BodyWrapper>
         <Body>
          
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} `}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>${userName}님의 리뷰</h4>
            <div
              className={[
                "review_img_wrapper",
                `review_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>리뷰내용</h4>
            <div className="review_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
        </Body>
        <Nav />
     </BodyWrapper>
      </Container>
      </div>
    );
  }
};

export default ReviewReview;