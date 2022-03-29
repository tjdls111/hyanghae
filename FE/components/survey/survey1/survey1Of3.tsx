import React from "react";

interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of3: React.FC<stateProps> = ({ setState }) => {
  const click = (num: number) => {
    setState(num);
  };

  return (
    <div>
      <button onClick={() => click(1)}>봄</button>
      <button onClick={() => click(2)}>여름</button>
      <button onClick={() => click(3)}>가을</button>
      <button onClick={() => click(4)}>겨울</button>
    </div>
  );
};

export default Survey1Of3;
