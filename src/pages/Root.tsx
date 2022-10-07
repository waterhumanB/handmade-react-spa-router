import React from "react";
import { useRouter } from "../hooks/useRotuer";

const Root = () => {
  const { push } = useRouter();
  return (
    <div>
      <h1>Root</h1>
      <button onClick={() => push("/about")}>Go About</button>
    </div>
  );
};

export default Root;
