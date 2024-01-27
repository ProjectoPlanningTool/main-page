import { useState } from "react";
import { message, Spin } from "antd";
import Logo from "../src/assets/projectologo.png";
import Hero from "../src/assets/react.svg";
// import Draw from "../src/assets/test.svg";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card.jsx";
import Carousel from "./Carousel.jsx";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure the email is not empty
    if (!email) {
      message.error({
        content: "Please enter your email address",
        style: {
          color: "red",
        },
      });
      return;
    }

    if (!isEmailValid(email)) {
      message.error({
        content: "Please enter a valid email address",
        style: {
          color: "red",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://154gq2lpa4.execute-api.ap-south-1.amazonaws.com/sendMail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMail: "yogender.singh4343@gmail.com",
          }),
        }
      );

      if (response.ok) {
        message.success({
          content: "Successfully joined beta queue!",
          style: {
            color: "green",
          },
        });
        setEmail("");
      } else if (response.status === 400) {
        message.error("Not a Valid Email.");
      } else {
        message.error("Failed to join beta. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Stop loading, whether successful or not
    }
  };

  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png" />
      ),
    },
  ];

  return (
    <>
      <div className="pageContainer">
        <div className="logoContainer">
          <img src={Logo} alt="mainLogo" />
          Projectó.cloud
        </div>
        <div className="flex-group">
          <div className="group1">
            <div className="card">
              {/* <Card className="innnerCard">
                <img src={Draw} alt="" />
                Enable users to effortlessly create ER Diagrams
              </Card>
              <Card className="innnerCard">
                <img src={Draw} alt="" />
                Effortlessly create well-documented project plans
              </Card>
              <Card className="innnerCard">
                <img src={Draw} alt="" />
                Provide valuable support in creating engaging blog content
              </Card> */}
              <Carousel
                cards={cards}
                height="500px"
                width="100%"
                margin="0 auto"
                offset={200}
                showArrows={false}
              />
            </div>
            <div className="desc">
              Elevate your project management experience with our comprehensive
              Project Planning Tools, seamlessly integrated into the world's
              first 3-in-1 feature project hosted on your personal subdomain
            </div>
          </div>
          <div className="group2">
            <img src={Hero} alt="" />
            <form onSubmit={handleSubmit} className="projectoForm">
              <span className="spn">Get private beta access</span>
              <input
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Join Beta</button>
            </form>
            {loading && (
              <Spin
                size="large"
                indicator={
                  <img src={Logo} alt="customLoader" className="customLoader" />
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
