import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { emotionList } from "../../util/emotion";

import MyHeader from "../../components/Header";
import MyButton from "../../components/MyButton";


const Review = () => {
  const { id } = useParams();
  const reviewList = useContext(ReviewStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `리뷰 - ${id}번 째리뷰`;
  }, []);

  useEffect(() => {
    if (reviewList.length >= 1) {
      const targetReview = reviewList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetReview) {
        // 리뷰가 존재할 때
        setData(targetReview);
      } else {
        // 리뷰가 없을 때
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
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 리뷰`}
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
            <h4>리뷰</h4>
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
            <h4>오늘의 리뷰사진</h4>
            <div className="review_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Review;
