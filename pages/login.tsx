import React from "react";
// Next
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// Styles
import S from "../styles/Login.module.css";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [userMsg, setUserMsg] = React.useState("");

  const handleLoginWithEmail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const isEmailValid = emailRegex.test(email);
    if (email.trim().length > 0 && isEmailValid) {
      // route to dashboard
    } else {
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <div className={S.container}>
        <header className={S.header}>
          <div className={S.headerWrapper}>
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
          </div>
        </header>
        <main className={S.main}>
          <div className={S.mainWrapper}>
            <h1 className={S.signinHeader}>Sign In</h1>
            <input
              type="text"
              placeholder="Email address"
              className={S.emailInput}
              onChange={(e) => {
                setEmail(e.target.value);
                setUserMsg("");
              }}
            />
            <p className={S.userMsg}>{userMsg}</p>
            <button onClick={handleLoginWithEmail} className={S.loginBtn}>
              Sign In
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
