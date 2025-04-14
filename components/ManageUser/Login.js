import styles from "../../styles/ManageUser.module.css";
import InputPassword from "../common/InputPassword";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducers/user";

export default function Login() {
  const [email, emailSetter] = useState(
    process.env.NEXT_PUBLIC_MODE === "development"
      ? "nickrodriguez@kineticmetrics.com"
      : ""
  );
  const [password, passwordSetter] = useState(
    process.env.NEXT_PUBLIC_MODE === "development" ? "test" : ""
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const userReducer = useSelector((state) => state.user.value);

  console.log(process.env.NEXT_PUBLIC_MODE);
  useEffect(() => {
    if (userReducer.token) {
      // Redirect if token exists
      router.push("/articles/news-org-api-requests");
    }
  }, [userReducer]); // Run effect if token changes

  const sendPasswordBackToParent = (passwordFromInputPasswordElement) => {
    passwordSetter(passwordFromInputPasswordElement);
  };

  const handleClickLogin = async () => {
    console.log(
      "Login ---> API URL:",
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`
    );
    console.log("- handleClickLogin 👀");
    console.log("- email:", email);

    const bodyObj = { email, password };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      }
    );

    console.log("Received response:", response.status);

    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok) {
      // if (resJson.user.isAdminForKvManagerWebsite) {
      console.log(resJson);
      resJson.email = email;
      dispatch(loginUser(resJson));
      router.push("/articles/news-org-api-requests");
      // } else {
      //   alert("You are not authorized to login.");
      // }
    } else {
      const errorMessage =
        resJson?.error || `There was a server error: ${response.status}`;
      alert(errorMessage);
    }
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.divLeft}>
          <img
            className={styles.imgNewsNexusLogo}
            src="/images/logoWhiteBackground.png"
            alt="NewsNexus Logo"
          />
          <h1 className={styles.h1PageTitle}>Login</h1>

          <div className={styles.divForm}>
            <div className={styles.divEmailAndPassword}>
              <div className={styles.divInputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  className={styles.inputEmail}
                  onChange={(e) => emailSetter(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className={styles.divInputGroup}>
                <label htmlFor="password">Password</label>
                <InputPassword
                  sendPasswordBackToParent={sendPasswordBackToParent}
                  value={password}
                />
              </div>
            </div>

            <div className={styles.divButtonAndLinks}>
              <div className={styles.divResetPassword}>
                <a href="/forgot-password">Forgot Password</a>
              </div>
              <button
                className={styles.btnSubmit}
                onClick={() => {
                  console.log("Submitted email:", email);
                  console.log("Submitted password:", password);
                  handleClickLogin();
                  // You can call your submit logic or dispatch here
                }}
              >
                Login
              </button>
              <div className={styles.divRegister}>
                <p>
                  Don't have an account yet? <a href="/register">Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divRight}>
          <img
            className={styles.imgKmLogo}
            src="/images/kmLogo_square1500.png"
            alt="Km Logo"
          />
        </div>
      </main>
    </div>
  );
}
