import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Loading  from "../../assets/images/loading.gif";

const steps = [
  "What's your secret sauce?",
  "Who's your dream client?",
  "What's your story?",
  "What are your marketing goals?",
  "Are you currently using any marketing channels?",
  "What's your budget for marketing each month?",
  "How will you measure success?",
  "Who's your competition?",
  "What are your biggest roadblocks?",
  "How do you stay connected with clients after a project?"
];

const placeholders = [
  "What makes your freelance services stand out from the crowd? What unique skills or experiences do you bring to the table?",
  "Describe your ideal project or the type of client you'd love to work with most. What are their needs and challenges?",
  "What are the key things you want potential clients to know about you and your services? Why should they choose you?",
  "Are you looking to land more projects? Increase your hourly rate? Build a bigger network? Let's set some achievable targets.",
  "Do you have a website, social media presence, or anything else you're using to reach potential clients?",
  "Even a small budget can be effective with the right strategy!",
  "Are you looking for more inquiries, website traffic, or something else? Let's define what 'winning' looks like for your marketing efforts.",
  "Are there other freelancers offering similar services? What makes you stand out from the pack?",
  "Starting a marketing plan can feel daunting. What are the specific challenges you're facing?",
  "Building lasting relationships is key! Do you have a plan for keeping past clients happy and potentially working with them again?"
];

const Background = styled(Box)({
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to bottom, #000000, #434343)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white"
});

const StyledPaper = styled(Box)({
  padding: "20px",
  minWidth: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "transparent",
});

const ContinueButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  borderRadius: "20px",
  textTransform: "none",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

const DecorativeLine = styled(Box)({
  position: "absolute",
  bottom: "10%",
  left: "10%",
  right: "10%",
  height: "2px",
  background: "#fff",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.5);
  }
`;

const Icon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  width: "40px",
  height: "40px",
  background: "#fff",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  cursor: "pointer",
  animation: active ? `${bounce} 0.5s forwards` : "none",
  transform: active ? "scale(1.5)" : "scale(1)",
  transition: "transform 0.3s",
}));

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
});

const QuestionForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState(Array(steps.length).fill(""));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleContinue = async () => {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        const formattedAnswers = {
          question_and_answer: steps.map((question, index) => ({
            id: index + 1,
            question,
            answer: answers[index],
          })),
        };
  
        try {
          const reorderJson = (input) => {
            const desiredOrder = [
                "title",
                "executive_summary",
                "target_audience",
                "marketing_goals",
                "marketing_strategies",
                "content_marketing",
                "social_media_engagement",
                "industry_networking",
                "search_engine_optimization",
                "client_retention",
                "budget_allocation",
                "additional_recommendations"
            ];
        
            const orderedOutput = {};
            desiredOrder.forEach(key => {
                if (key in input) {
                    orderedOutput[key] = input[key];
                }
            });
      
            Object.keys(input).forEach(key => {
                if (!(key in orderedOutput)) {
                    orderedOutput[key] = input[key];
                }
            });
        
            return orderedOutput;
        };
          setLoading(true);
          const response = await fetch("http://localhost:8081/ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedAnswers),
          });
          const data = await response.json();
          const reorder = await reorderJson(data)
          navigate("/response", { state: { data:reorder } });
        } catch (error) {
          console.error("Error posting data:", error);
          setLoading(false);
        }
      }
    };

  const handleIconClick = (index) => {
    setActiveStep(index);
  };

  const icons = [
    "🍝", "💼", "🤔", "🫰", "🚀",
    "📺", "💸", "🙄", "🚧", "🫶"
  ];

  const displayIcons = () => {
    let displayedIcons = [];
    if (activeStep === 0) {
      displayedIcons = [icons[0], icons[1]];
    } else if (activeStep === icons.length - 1) {
      displayedIcons = [icons[activeStep - 1], icons[activeStep]];
    } else {
      displayedIcons = [icons[activeStep - 1], icons[activeStep], icons[activeStep + 1]];
    }
    return displayedIcons.map((icon, index) => (
      <Box
        key={index}
        onClick={() => handleIconClick(activeStep === 0 ? index : activeStep === icons.length - 1 ? activeStep - 1 + index : activeStep - 1 + index)}
        sx={{
          margin: "0 20px", 
          width: 60, 
          height: 60,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff", 
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          fontSize: "24px", 
          cursor: "pointer",
        }}
      >
        {icon}
      </Box>
    ));
  };  

  return (
    <Background>
      {loading && (
        <Overlay>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Submitting...
            </Typography>
            <img src={Loading} alt="Loading" style={{ width: "150px" }} />
          </Box>
        </Overlay>
      )}
      <StyledPaper>
        <Typography variant="h4" 
        gutterBottom
        sx={{ fontFamily: "League Spartan, sans-serif", 
          fontSize: { xs: "24px", md: "30px" },
            textAlign: "center",
        }}>
          {steps[activeStep]}
        </Typography>
        <TextField
          value={answers[activeStep]}
          onChange={handleChange}
          variant="outlined"
          placeholder={placeholders[activeStep]}
          fullWidth
          margin="normal"
          multiline
          rows={6} 
          InputProps={{
            style: {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              fontFamily: "Open Sauce, sans-serif",
              fontSize: { xs: "16px", md: "20px" },
              textAlign: "center",
            },
          }}
          InputLabelProps={{
            style: {
              color: "white",
              fontFamily: "Open Sauce, sans-serif",
              fontSize: { xs: "16px", md: "20px" },
              textAlign: "center",
            },
          }}
        />
        <ContinueButton onClick={handleContinue} disabled={loading}>
          {activeStep === steps.length - 1 ? "Finish" : "Continue"}
        </ContinueButton>
      </StyledPaper>
      <Box sx={{
  position: "absolute",
  bottom: "10%",
  left: "10%",
  right: "10%",
  display: "flex",
  justifyContent: "center"
}}>
  {displayIcons()}
</Box>
      {/* <DecorativeLine>
        {icons.map((icon, index) => (
          <Icon
            key={index}
            onClick={() => handleIconClick(index)}
            active={activeStep === index}
          >
            {icon}
          </Icon>
        ))}
      </DecorativeLine> */}
    </Background>
  );
};

export default QuestionForm;