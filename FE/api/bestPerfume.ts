import axios from "axios";

export const getBestPerfumes = async function () {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + "/perfume/list",
    { params: { page: 0, size: 10, sort: "likeCnt,DESC" } }
  );
  return response.data;
};
