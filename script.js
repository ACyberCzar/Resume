document.getElementById("jobForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const resume = document.getElementById("resume").value;
  const jobDesc = document.getElementById("jobDesc").value;
  const pageCount = document.getElementById("pageCount").value;

  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ resume, jobDesc, pageCount })
  });

  const data = await response.json();
  document.getElementById("resumeOutput").textContent = data.resume;
  document.getElementById("coverLetterOutput").textContent = data.coverLetter;
});
