import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { emotionList } from "../../util/emotion";
import MyHeader from "../../components/MyHeader";
import MyButton from "../../components/MyButton";
import styled from "styled-components";
import Nav from "../../components/Nav";
import { async } from "q";
import axios from "axios";

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
  const [imageData, setImageData] = useState();
  const [content, setContent] = useState();
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const SERVER = process.env.REACT_APP_SERVER;

  const fetchData = async () => {
    try {
      await axios.get(`${SERVER}/reviews/${id}`).then((response) => {
        setData(response.data);
        setImageData(data.image.data);
        setContent(data.content);
        setName(data.name);
        setDate(data.date);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();

    return (
    
      <div className="ReviewPage">
          <Container>
  <BodyWrapper>
         <Body>
          
        <MyHeader
          headText={date}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
            />
          }
        />
        <article>
          <section>
            <h4>{name}님의 리뷰</h4>
            <div>
              <img src={`data:image/png;base64,${imageData}`} />
            </div>
          </section>
          <section>
            <h4>리뷰내용</h4>
            <div className="review_content_wrapper">
              <p>{content}</p>
            </div>
          </section>
        </article>
        </Body>
        <Nav />
     </BodyWrapper>
      </Container>
    </div>
  );
};

export default ReviewReview;
