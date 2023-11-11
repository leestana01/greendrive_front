import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewDispatchContext } from "./../App.js";
import { useDropzone } from 'react-dropzone';
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import Dropzone from 'react-dropzone'; // Updated import
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const ReviewEditor = ({ isEdit, originData }) => {

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [selectedFile, setSelectedFile] = useState(null); // setSelectedFile 추가

  const { onCreate, onEdit, onRemove } = useContext(ReviewDispatchContext);
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "리뷰를 수정하시겠습니까?" : "새로운 리뷰를 작성하시겠습니까?")) {
      if (!isEdit) {
        onCreate(date, content, emotion, selectedFile);
      } else {
        onEdit(originData.id, date, content, emotion, selectedFile);
      }
    }

    navigate("/ReviewShow", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/ReviewShow", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="ReviewEditor">
      <MyHeader
        headText={isEdit ? "리뷰 수정하기" : "새 리뷰 작성하기"}
        leftChild={
          <MyButton text={"< "} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4> 방문한 날짜 </h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>이 장소는 어땠나요?</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>내용을 입력해주세요</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="내용을 입력해주세요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>파일 첨부</h4>
          <div className="input_box">
            <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop a file here, or click to select a file</p>
                </div>
              )}
            </Dropzone>
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReviewEditor;
