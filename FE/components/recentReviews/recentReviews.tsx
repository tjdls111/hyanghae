import React from "react";
import styles from "./recentReviews.module.css";
import ReviewSlider from "../ui/slider/reviewSlider";
import { DUMMY_DATA } from "./dummyData";

const RecentReviews: React.FC = () => {
  return (
    <div className={styles.container}>
      <ReviewSlider slideItems={DUMMY_DATA} />
    </div>
  );
};

export default RecentReviews;
