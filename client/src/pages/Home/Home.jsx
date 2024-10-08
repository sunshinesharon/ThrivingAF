import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeGif from "../../assets/images/taf.gif";
import GoogleIcon from "../../assets/images/google-icon.png";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase";
import Header from "../../components/Header";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post("/api/send-code", { email });
      if (response.status === 200) {
        navigate(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        alert("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error sending code:", error);
      alert("Error sending code. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("token", token);
        navigate("/question");
      })
      .catch((error) => {
        console.log(error);
        alert("Error signing in with Google. Please try again.");
      });
  };

  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <div className="app__image-section">
          <img src={HomeGif} alt="Thriving As Freelancers" />
        </div>
        <div className="app__text-section">
          <h1 className="app__title">Market like a Boss</h1>
          <p className="app__subtitle">
            Let's get your Marketing Plan Thriving!
          </p>
          <button className="app__google-button" onClick={handleGoogleSignIn}>
            <img
              src={GoogleIcon}
              alt="Google Icon"
              className="app__google-icon"
            />
            Continue with Google
          </button>
          <p className="app__or">or</p>
          <input
            type="email"
            placeholder="work@email.com"
            className="app__email-input"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="app__email-button"
            disabled={!isEmailValid(email)}
            onClick={handleEmailSubmit}
          >
            Continue with email
          </button>
          <p className="app__terms">
            By signing up, you agree to the <a href="#">Terms of Use</a>,{" "}
            <a href="#">Privacy Notice</a>, and <a href="#">Cookie Notice</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
