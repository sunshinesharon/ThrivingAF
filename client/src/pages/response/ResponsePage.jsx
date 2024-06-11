import React, { useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";

const ResponsePage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [feedback, setFeedback] = useState("");
  const [vote, setVote] = useState(null); // null, 'up', 'down'

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission logic here
    console.log({ vote, feedback });
    setFeedback(""); // Clear the feedback field after submission
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(data.title || "Marketing Plan", 10, 10);
    doc.setFontSize(12);

    const addSection = (title, content) => {
      doc.addPage();
      doc.text(title, 10, 10);
      if (Array.isArray(content)) {
        content.forEach((item, index) => {
          doc.text(item, 10, 20 + index * 10);
        });
      } else {
        doc.text(content, 10, 20);
      }
    };

    for (const key in data) {
      if (key !== "title") {
        const sectionTitle = key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
        addSection(sectionTitle, data[key]);
      }
    }

    doc.save("marketing_plan.pdf");
  };

  const renderContent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: "20px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {data.title || "Marketing Plan"}
      </Typography>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Executive Summary
        </Typography>
        <Typography variant="body1" paragraph>
          {data.executive_summary}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #000000, #434343)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        padding: "20px",
        paddingTop: "60px", // Add padding to the top
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          overflowY: "auto",
          maxHeight: "75vh",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Typography variant="h4" gutterBottom>
            {data.title || "Marketing Plan"}
          </Typography>
          <IconButton onClick={handleDownload} sx={{ color: "white" }}>
            <DownloadIcon />
          </IconButton>
        </Box>

        {renderContent()}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "10px",
          }}
        >
          <TextField
            label="Provide your feedback"
            multiline
            variant="outlined"
            value={feedback}
            onChange={handleFeedbackChange}
            sx={{
              flexGrow: 1,
              backgroundColor: "transparent",
              color: "white",
              "& .MuiInputBase-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <IconButton onClick={handleSubmitFeedback} sx={{ color: "white", marginLeft: "10px" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <IconButton color={vote === "up" ? "primary" : "default"} onClick={() => setVote(vote === "up" ? null : "up")}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          color={vote === "down" ? "secondary" : "default"}
          onClick={() => setVote(vote === "down" ? null : "down")}
        >
          <ThumbDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResponsePage;