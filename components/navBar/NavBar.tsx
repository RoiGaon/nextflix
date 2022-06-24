import * as React from "react";
// Next
import Link from "next/link";
// Styles
import S from "./NavBar.module.css";

interface Props {
  userName: string;
}

const NavBar: React.FC<Props> = ({ userName }) => {
  return (
    <>
      <div className={S.container}>
        <div className={S.wrapper}>
          <Link href="/">
            <a className={S.logoLink}>
              <div className={S.logoWrapper}>Netflix</div>
            </a>
          </Link>
          <ul className={S.navItems}>
            <li className={S.navItem}>Home</li>
            <li className={S.navItem2}>My List</li>
          </ul>
          <nav className={S.navContainer}>
            <div>
              <button className={S.usernameBtn}>
                <p className={S.username}>{userName}</p>
              </button>
              <div className={S.navDropdown}>
                <div>
                  <a className={S.linkName}>Sign Out</a>
                  <div className={S.lineWrapper}></div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
