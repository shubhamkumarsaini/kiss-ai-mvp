// =========================
// Elements
// =========================

const generateBtn =
  document.getElementById("generateBtn");

const promptInput =
  document.getElementById("prompt");

const sanitizedPrompt =
  document.getElementById("sanitizedPrompt");

const statusText =
  document.getElementById("status");

const previewImage =
  document.getElementById("previewImage");

const reportBtn =
  document.getElementById("reportBtn");


// =========================
// Generate Button Click
// =========================

generateBtn.addEventListener("click", async () => {

  // User Input
  const userPrompt =
    promptInput.value.trim();

  // Empty Check
  if (!userPrompt) {

    statusText.innerText =
      "Please enter a prompt";

    return;
  }

  try {

    // Loading Status
    statusText.innerText =
      "Generating...";

    // API Request
    const response = await fetch(
      "/api/generate",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          prompt: userPrompt
        })

      }
    );

    // JSON Data
    const data =
      await response.json();

    console.log("API Response:", data);

    // =========================
    // Sanitized Prompt
    // =========================

    sanitizedPrompt.innerText =
      data.sanitizedPrompt;


    // =========================
    // BLOCKED RESPONSE
    // =========================

    if (data.blocked) {

      statusText.innerText =
        `Blocked ❌ (${data.reasons.join(", ")})`;

      // Placeholder image hi dikhao
      previewImage.src =
        "placeholder.jpg";

    }

    // =========================
    // SAFE RESPONSE
    // =========================

    else {

      statusText.innerText =
        "Safe ✅";

      // Image Show
      previewImage.src =
        data.imageUrl;

    }

  }

  // =========================
  // ERROR
  // =========================

  catch (error) {

    console.log(error);

    statusText.innerText =
      "Server Error ❌";

  }

});

// =========================
// Report Button
// =========================

reportBtn.addEventListener("click", async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "/api/report",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          issue:
            "User reported generated content",

          timestamp:
            new Date()

        })

      }
    );

    const data =
      await response.json();

    console.log(data);

    alert("Report submitted");

  }

  catch (error) {

    console.log(error);

    alert("Report failed");

  }

});