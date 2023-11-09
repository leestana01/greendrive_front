import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewStateContext } from "../../App";
import ReviewEditor from "../../components/ReviewEditor";

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
      {originData && <ReviewEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
