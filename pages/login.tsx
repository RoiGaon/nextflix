import React from "react";
// Next
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Helpers
import { magic } from "lib/magic-client";
// Styles
import S from "../styles/Login.module.css";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [userMsg, setUserMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleComplete = () => setIsLoading(false);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const isEmailValid = emailRegex.test(email);
    if (email.trim().length > 0 && isEmailValid) {
      // log in a user by their email
      try {
        setIsLoading(true);
        const didToken = await magic!.auth.loginWithMagicLink({ email });
        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        console.log("Something went wrong logging in ", error);
        setIsLoading(false);
      }
    } else {
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
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
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
