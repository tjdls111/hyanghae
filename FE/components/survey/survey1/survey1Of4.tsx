import React from "react";

interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of4: React.FC<stateProps> = ({ setState }) => {
  const click = (num: number) => {
    setState(num);
  }
  
  return <div>
    <button onClick={() => click(1)}>데이트용</button>
    <button onClick={() => click(2)}>면접용</button>
    <button onClick={() => click(3)}>데일리용</button>

  </div>;
};

export default Survey1Of4;
