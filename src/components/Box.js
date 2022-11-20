import React, { useState } from "react";

const Box = () => {
  const [disLike, setdisLike] = useState("");

  const [dislike, setDislike] = useState(false);

  const Change = () => {
    setdisLike("disLike");
  };

  const onClickLike = () => {
    setDislike(!dislike);
  };
  return (
    <div
      style={{
        margin: 10,
        padding: 10,
      }}
    >
      {/* <button onClick={() => props.onClickToConsoleSomething()}>ShowConsole</button> */}
      {/* <button onClick = {() => props.onClickToShowUserName()} >ShowName</button> */}
      {/* <button onClick={() => setUsername("Heello")}>set username</button> */}
      <img
        src="https://th.bing.com/th/id/R.0a34d4755a3790da11bf4813378c949e?rik=%2fZZcRC1aRiTCQA&pid=ImgRaw&r=0"
        style={{ width: 400 }}
      />
      <button className={dislike ? "btn btn-primary btn-sm" : "btn btn-danger btn-sm"} onClick={onClickLike}>
        {dislike ? "Like" : "Dislike"}
      </button>
    </div>
  );
};

export default Box;
