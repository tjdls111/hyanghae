import React from "react";
import styles from "./responsiveNav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../reducers/hooks";

const navItemData = [
  {
    id: "navItem01",
    name: "Home",
    path: "/home",
  },
  {
    id: "navItem02",
    name: "PERFUMES",
    path: "/perfumes",
  },
  {
    id: "navItem02",
    name: "Recommeded",
    path: "/survey",
  },
  {
    id: "navItem02",
    name: "About",
    path: "/about",
  },
];

type handler = () => void;

const ResponsiveNav: React.FC<{
  mobileNavOpen: boolean;
  mobileNavCloseHandler: handler;
}> = ({ mobileNavOpen, mobileNavCloseHandler }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return (
    <nav
      className={`${styles.navContainer} ${
        mobileNavOpen && styles.mobileNavActive
      }`}
    >
      <button onClick={mobileNavCloseHandler} className={styles.navCloseButton}>
        X
      </button>
      {isAuthenticated || (
        <div className={styles.mobileAuthGuide}>
          <Link href="/login">
            <button className={`${styles.mobileLoginButton}`}>LOG IN</button>
          </Link>
          <Link href="/signup">
            <button className={styles.mobileSignupButton}>JOIN US</button>
          </Link>
        </div>
      )}
      {isAuthenticated && <div className={styles.mobileAuthGuide}></div>}

      <ul className={styles.navigation}>
        {navItemData.map((navItem) => {
          return (
            <li key={navItem.id} className={styles.navItem}>
              <Link href={navItem.path}>
                <a
                  className={`${styles.navLink} ${
                    router.pathname === navItem.path && styles.navLinkActive
                  }`}
                >
                  {navItem.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ResponsiveNav;
