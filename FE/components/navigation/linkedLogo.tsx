import React from "react";
import Link from "next/link";
import styles from "./linkedLogo.module.css";
import Image from "next/image";
import letterLogo from "../../public/logos/letterLogo.png";

const LinkedLogo: React.FC = () => {
  return (
    <Link href="/home">
      <div className={styles.logoWrapper}>
        <Image className={styles.logoImage} layout="fill" src={letterLogo} />
      </div>
    </Link>
  );
};

export default LinkedLogo;
