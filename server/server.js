import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/generate", async (req, res) => {
  const { resume, jobDesc, pageCount } = req.body;

  const prompt = `
You are an expert resume optimizer and ATS consultant. Given the resume and job description below, generate:

1. A customized ${pageCount}-page resume optimized for 95%+ ATS score.
2. A matching professional cover letter.

--- RESUME ---
${resume}

--- JOB DESCRIPTION ---
${jobDesc}
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o", // Or "gpt-4-turbo" or "gpt-4"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const output = completion.data.choices[0].message.content;

    const [genResume, genCoverLetter] = output.split(/Cover Letter:/i);

    res.json({
      resume: genResume.trim(),
      coverLetter: genCoverLetter ? genCoverLetter.trim() : "Not generated"
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating content");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
