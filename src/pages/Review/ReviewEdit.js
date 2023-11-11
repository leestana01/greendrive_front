import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewStateContext } from "../../App";
import ReviewEditor from "../../components/ReviewEditor";
import styled from "styled-components";

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

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const reviewList = useContext(ReviewStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `리뷰제목 - ${id}번 리뷰 수정`;
  }, []);

  useEffect(() => {
    if (reviewList.length >= 1) {
      const targetReview = reviewList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetReview) {
        setOriginData(targetReview);
      } else {
        alert("없는 리뷰입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, reviewList]);

  return (
    <div>
        <Container>
            <BodyWrapper>
            <Body>
            {originData && <ReviewEditor isEdit={true} originData={originData} />}
            </Body>
            </BodyWrapper>
            </Container>

    </div>
  );
};

export default Edit;
