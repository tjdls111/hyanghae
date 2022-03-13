import React from "react";
import { useRouter } from "next/router";

const Redirect = () => {
  const router = useRouter();

  console.log(router.query.token);

  return (
    <div>
      <h1>소셜 로그인 Redirect URL</h1>
    </div>
  );
};

export default Redirect;
