import React from "react";
interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of5: React.FC<stateProps> = ({ setState }) => {
  const click = (num: number) => {
    setState(num);
  };

  return (
    <div>
      <button onClick={() => click(1)}>사랑스러운</button>
      <button onClick={() => click(2)}>우아한</button>
      <button onClick={() => click(3)}>자연스러운</button>
      <button onClick={() => click(4)}>달콤한</button>
      <button onClick={() => click(5)}>자신감있는</button>
    </div>
  );
};

export default Survey1Of5;
