import * as React from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Helpers
import { magic } from "lib/magic-client";
// Styles
import S from "./NavBar.module.css";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  const router = useRouter();

  React.useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic!.user.getMetadata();
        if (email) {
          setUserName(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);

  const handleSignout = async () => {
    try {
      await magic!.user.logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <>
      <div className={S.container}>
        <div className={S.wrapper}>
          <Link href="/">
            <a className={S.logoLink}>
              <div className={S.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="netflix logo"
                  width={128}
                  height={34}
                />
              </div>
            </a>
          </Link>
          <ul className={S.navItems}>
            <Link href="/">
              <a>
                <li className={S.navItem}>Home</li>
              </a>
            </Link>
            <Link href="/browse/my-list">
              <a>
                <li className={S.navItem2}>My List</li>
              </a>
            </Link>
          </ul>
          <nav className={S.navContainer}>
            <div>
              <button
                className={S.usernameBtn}
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <p className={S.username}>{userName}</p>
                <Image
                  src="/static/expand_more.svg"
                  alt="expand dropdown"
                  width={24}
                  height={24}
                />
              </button>
              {showDropDown && (
                <div className={S.navDropdown}>
                  <div>
                    <a className={S.linkName} onClick={handleSignout}>
                      Sign Out
                    </a>
                    <div className={S.lineWrapper}></div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
