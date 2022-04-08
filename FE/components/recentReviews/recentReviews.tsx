import React, { useEffect, useState } from "react";
import styles from "./recentReviews.module.css";
import ReviewSlider from "../ui/slider/reviewSlider";
import axios from "axios";

const RecentReviews: React.FC = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/perfume/review/recent")
      .then((res) => setReviews(res.data.reviewList));
  }, []);

  return (
    <div className={styles.container}>
      <ReviewSlider slideItems={reviews} />
    </div>
  );
};

export default RecentReviews;
