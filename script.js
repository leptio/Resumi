// Theme Toggle (Dark/Light) with persistence
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  htmlEl.classList.add(storedTheme);
}
else {
  // if no stored theme, use system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}
updateToggleIcon();

themeToggle.addEventListener('click', () => {
  htmlEl.classList.toggle('dark');
  const isDark = htmlEl.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateToggleIcon();
});
function updateToggleIcon() {
  if (htmlEl.classList.contains('dark')) {
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
}

// Form submission: generate resume preview
const form = document.getElementById('resume-form');
const preview = document.getElementById('resume-preview');

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Personal info
  document.getElementById("previewName").textContent =
    document.getElementById("inputName").value;
  document.getElementById("previewTitle").textContent =
    document.getElementById("inputTitle").value;
  document.getElementById("previewSummary").textContent =
    document.getElementById("inputSummary").value;

  // Clear old preview jobs and populate dynamic jobs
  const expSection = document.getElementById("experiencePreview");
  expSection.innerHTML = `
    <h2 class="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-3">
      Experience
    </h2>
  `;

  document.querySelectorAll(".job-block").forEach(block => {
    const titleInput = block.querySelector('input[placeholder="Job Title"]');
    const companyInput = block.querySelector('input[placeholder="Company"]');
    const yearsInput = block.querySelector('input[placeholder="Years"]');
    const descInput = block.querySelector('textarea');

    const title = titleInput ? titleInput.value.trim() : "";
    const company = companyInput ? companyInput.value.trim() : "";
    const years = yearsInput ? yearsInput.value.trim() : "";
    const desc = descInput ? descInput.value.trim() : "";

    if (title || company || years || desc) {
      const jobEl = document.createElement("div");
      jobEl.className = "relative border-l-4 border-cyan-500 dark:border-cyan-400 pl-6 mb-6";
      jobEl.innerHTML = `
        <div class="absolute -left-2 top-2 w-4 h-4 bg-cyan-500 dark:bg-cyan-400 rounded-full"></div>
        <h4 class="font-semibold text-lg">${title}</h4>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">${company} ${years}</p>
        <p class="text-gray-700 dark:text-gray-300">${desc}</p>
      `;
      expSection.appendChild(jobEl);
    }
  });

  // Education
  document.getElementById("previewEdu1Degree").textContent =
    document.getElementById("inputEdu1Degree").value;
  document.getElementById("previewEdu1School").textContent =
    document.getElementById("inputEdu1School").value;
  document.getElementById("previewEdu1Years").textContent =
    document.getElementById("inputEdu1Years").value;

  document.getElementById("previewEdu2Degree").textContent =
    document.getElementById("inputEdu2Degree").value;
  document.getElementById("previewEdu2School").textContent =
    document.getElementById("inputEdu2School").value;
  document.getElementById("previewEdu2Years").textContent =
    document.getElementById("inputEdu2Years").value;

  // Skills
  const skillsContainer = document.getElementById("skillsPreview");
  skillsContainer.innerHTML = "";
  const skills = document.getElementById("inputSkills").value.split(",");
  skills.forEach((skill) => {
    if (skill.trim()) {
      const span = document.createElement("span");
      span.textContent = skill.trim();
      span.className =
        "px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm";
      skillsContainer.appendChild(span);
    }
  });

  // Show preview
  preview.classList.remove("opacity-0", "pointer-events-none");
});





const jobsContainer = document.getElementById("jobs-container");
const addJobBtn = document.getElementById("addJobBtn");
let jobCount = 0;
const maxJobs = 10;

function createJobBlock(index) {
  const jobDiv = document.createElement("div");
  jobDiv.className = "job-block border border-gray-300 dark:border-gray-600 rounded-md p-4 relative space-y-2";

  jobDiv.innerHTML = `
    <button type="button" class="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700">✕</button>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Job Title" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600" />
      <input type="text" placeholder="Company" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      <input type="text" placeholder="Years" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600" />
      <textarea placeholder="Description" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"></textarea>
    </div>
  `;

  const delBtn = jobDiv.querySelector("button");
  delBtn.addEventListener("click", () => {
    jobDiv.remove();
    jobCount--;
  });

  jobsContainer.appendChild(jobDiv);
}

addJobBtn.addEventListener("click", () => {
  if (jobCount >= maxJobs) return;
  jobCount++;
  createJobBlock(jobCount);
});

// initialize with one job
jobCount++;
createJobBlock(jobCount);


const experienceSection = document.querySelector("#resume-preview > div:nth-of-type(3)");
experienceSection.innerHTML = `
  <h2 class="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-3">Experience</h2>
`;

for (let i = 1; i <= jobCount; i++) {
  const title = document.getElementById(`inputJob${i}Title`).value;
  const company = document.getElementById(`inputJob${i}Company`).value;
  const years = document.getElementById(`inputJob${i}Years`).value;
  const desc = document.getElementById(`inputJob${i}Desc`).value;

  if (!title && !company && !desc) continue;

  const jobHTML = `
    <div class="relative border-l-4 border-cyan-500 dark:border-cyan-400 pl-6 mb-6">
      <div class="absolute -left-2 top-2 w-4 h-4 bg-cyan-500 dark:bg-cyan-400 rounded-full"></div>
      <h4 class="font-semibold text-lg">${title}</h4>
      <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">${company} — ${years}</p>
      <p class="text-gray-700 dark:text-gray-300">${desc}</p>
    </div>
  `;
  experienceSection.innerHTML += jobHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const pdfBtn = document.getElementById("downloadPDF");
  const pngBtn = document.getElementById("downloadPNG");
  const resume = document.getElementById("resume-preview");

  function prepareResumeForExport() {
    resume.style.opacity = "1";
    resume.style.pointerEvents = "auto";
  }

  pdfBtn.addEventListener("click", () => {
    console.log("pdfbuttonclick");
    prepareResumeForExport();
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'resume.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(resume)
      .save();
  });

  pngBtn.addEventListener("click", () => {
    console.log("pngbuttonclick");
    prepareResumeForExport();
    html2canvas(resume, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "resume.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
});

