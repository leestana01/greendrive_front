import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviewList }) => {
  const navigate = useNavigate();

  return (
    <div className="ReviewList">
      <div className="menu_wrapper">
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"리뷰쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {reviewList.map((it) => (
        <ReviewItem key={it.id} {...it} />
      ))}
    </div>
  );
};

ReviewList.defaultProps = {
  reviewList: [],
};

export default ReviewList;
