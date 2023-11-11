import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const ReviewItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/review/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="ReviewItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`emotion-${emotion}`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="review_date">{strDate}</div>
        <div className="review_content_preview">
          {content ? content.slice(0, 25) : ""} {/* content가 정의되어 있을 때에만 slice 메서드 사용 */}
        </div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(ReviewItem);