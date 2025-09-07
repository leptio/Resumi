// Theme Toggle (Dark/Light) with persistence
console.log("initiated");

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
  document.getElementById("previewEmail").textContent =
    document.getElementById("inputEmail").value;
  document.getElementById("previewAddressOne").textContent =
    document.getElementById("inputAddressOne").value;
  document.getElementById("previewAddressTwo").textContent =
    document.getElementById("inputAddressTwo").value;
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
        <div class="absolute -left-[10px] top-0 w-4 h-4 bg-cyan-500 dark:bg-cyan-400 rounded-full transform -translate-y-1/4"></div>
        <h4 class="font-semibold text-lg">${title}</h4>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">${company} ${years}</p>
        <p class="text-gray-700 dark:text-gray-300">${desc}</p>
      `;
      expSection.appendChild(jobEl);
    }
  });

  // Clear old preview universities and populate dynamic universities
  const schoolSection = document.getElementById("schoolPreview");
  schoolSection.innerHTML = `
    <h2 class="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-3">
      Education
    </h2>
  `;

  document.querySelectorAll(".school-block").forEach(block => {
    const degreeInput = block.querySelector('input[placeholder="Degree (e.g. B.Sc. in CS)"]');
    const schoolInput = block.querySelector('input[placeholder="School"]');
    const schoolYearsInput = block.querySelector('input[placeholder="Years"]');

    const degree = degreeInput ? degreeInput.value.trim() : "";
    const school = schoolInput ? schoolInput.value.trim() : "";
    const schoolYears = schoolYearsInput ? schoolYearsInput.value.trim() : "";

    if (degree || school || schoolYears) {
      const schoolEl = document.createElement("div");
      schoolEl.className = "relative border-l-4 border-purple-500 dark:border-purple-400 pl-6 mb-6";
      schoolEl.innerHTML = `
        <div class="absolute -left-[10px] top-0 w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full transform -translate-y-1/4"></div>
        <h4 class="font-semibold text-lg">${degree}</h4>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">${school} ${schoolYears}</p>
      `;
      schoolSection.appendChild(schoolEl);
    }
  });

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

const schoolsContainer = document.getElementById("schools-container");
const addSchoolBtn = document.getElementById("addSchoolBtn");
let schoolCount = 0;
const maxSchools = 10;

function createSchoolBlock(index) {
  const schoolDiv = document.createElement("div");
  schoolDiv.className = "school-block border border-gray-300 dark:border-gray-600 rounded-md p-4 relative space-y-2";
  schoolDiv.innerHTML = `
    <button type="button" class="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700">✕</button>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Degree (e.g. B.Sc. in CS)" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600" />
      <input type="text" placeholder="School" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
      <input type="text" placeholder="Years" class="px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600" />
  `;

  const delBtn = schoolDiv.querySelector("button");
  delBtn.addEventListener("click", () => {
    schoolDiv.remove();
    schoolCount--;
  });

  schoolsContainer.appendChild(schoolDiv);
}

addSchoolBtn.addEventListener("click", () => {
  if (schoolCount >= maxSchools) return;
  schoolCount++;
  createSchoolBlock(schoolCount);
});

// initialize with one school
schoolCount++;
createSchoolBlock(schoolCount);

const experienceSection = document.querySelector("#resume-preview > div:nth-of-type(6)");
experienceSection.innerHTML = `
  <h2 class="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-3">Experience</h2>
`;


console.log("content loaded");
const pdfBtn = document.getElementById("downloadPDF");
const pngBtn = document.getElementById("downloadPNG");
const resume = document.getElementById("resume-preview");

function prepareResumeForExport() {
  resume.style.opacity = "1";
  resume.style.pointerEvents = "auto";
}

const { jsPDF } = window.jspdf;

pdfBtn.addEventListener("click", () => {
  const originalWidth = resume.style.width;
  resume.style.width = (resume.offsetWidth * 1.8) + "px";
  console.log("pdfbuttonclick");
  prepareResumeForExport();
  const rect = resume.getBoundingClientRect();
  const resumeWidth = rect.width;
  const resumeHeight = rect.height;
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a2"
  });

  pdf.html(resume, {
    callback: function (doc) {
      doc.save("resume.pdf");
      resume.style.width = originalWidth;
    },
    x: 10,
    y: 10,
    html2canvas: { scale: 1 } // optional, but does not rasterize text
  });
});

const element = document.getElementById("resume-preview");




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


