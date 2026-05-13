const express = require("express");

const path = require("path");

const { denyList } = require("./config/moderation");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Prompt Sanitizer Function
function sanitizePrompt(prompt) {

  // Lowercase Convert
  const lowerPrompt = prompt.toLowerCase();

  // Block Status
  let blocked = false;

  // Reasons Array
  let reasons = [];

  // Check All Deny Words
  denyList.forEach((word) => {
  const regex = new RegExp(`\\b${word}\\b`, "i");

  if (regex.test(lowerPrompt)) {

      blocked = true;

      reasons.push(word);

    }

  });

  // Safe Rewrite
  let sanitizedPrompt = prompt;

  if (blocked) {

    sanitizedPrompt =
      "safe futuristic anime avatar";

  }

  // Return Result
  return {

    sanitizedPrompt,

    blocked,

    reasons

  };

}


// Generate API
// =========================

app.post("/api/generate", (req, res) => {

  // User Prompt
  const { prompt } = req.body;

  // Sanitize Prompt
  const result = sanitizePrompt(prompt);

  // Timestamp
  const timestamp =
    new Date().toISOString();

  // =========================
  // SERVER LOGGING
  // =========================

  console.log("\n");

  console.log("========================");

  console.log("NEW GENERATION REQUEST");

  console.log("========================");

  console.log("\nTime:");
  console.log(timestamp);

  console.log("\nOriginal Prompt:");
  console.log(prompt);

  console.log("\nBlocked:");
  console.log(result.blocked);

  console.log("\nReasons:");
  console.log(
    result.reasons.length > 0
      ? result.reasons.join(", ")
      : "None"
  );

  console.log("\n");

  // =========================
  // BLOCKED RESPONSE
  // =========================

  if (result.blocked) {

    return res.json({

      blocked: true,

      sanitizedPrompt:
        result.sanitizedPrompt,

      reasons:
        result.reasons

    });

  }

  // =========================
  // SAFE RESPONSE
  // =========================

  res.json({

    blocked: false,

    sanitizedPrompt:
      result.sanitizedPrompt,

    imageUrl:
      "/placeholder.jpg"

  });

});

// =========================
// Report API
// =========================

app.post("/api/report", (req, res) => {

  const reportData = req.body;

  console.log("🚨 Report Received");

  console.log(reportData);

  res.json({

    success: true,

    message:
      "Report submitted successfully"

  });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});