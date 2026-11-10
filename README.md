# COS 106 – Introduction to Web Technologies: Term Project (20 Marks)

## Project Title
**Design and Develop a Responsive Student Portfolio and Academic Management Website**

### Student Information
* **Student Name:** Favour Adedokun
* **Matriculation Number:** 301898902
* **Degree Programme:** B.Sc. Software Engineering
* **Institution:** MIVA Open University
* **Academic Session:** 2024/2025

---

## 🌟 Project Overview
This project is a multi-page, responsive academic portfolio and student management web platform built strictly using **HTML5, CSS3, and Vanilla JavaScript**. It showcases Favour Adedokun's academic profile, educational background, technical projects (including live apps **Mega** and **Callerio**), and features an interactive **Academic Planner** and a validated **Contact Form**.

The theme is styled with an aesthetic, girlie, and modern feel (soft rose, lilac, warm berry, and clean white cards), while maintaining high academic and technical standards.

---

## 📁 Project File Structure
```
portfolio-assignment/
├── index.html              # Root entrypoint (redirects seamlessly to html/index.html)
├── html/
│   ├── index.html          # Page 1: Homepage (Name, photo, bio, multimedia, layout)
│   ├── about.html          # Page 2: About Me (Education, career aspirations, skills, timetable table)
│   ├── projects.html       # Page 3: Projects (Mega, Callerio, and MIVA StudyHub with live links)
│   ├── planner.html        # Page 4: Interactive Academic Planner (Add, complete, delete tasks)
│   └── contact.html        # Page 5: Contact Page (Form with client-side JavaScript validation)
├── css/
│   └── style.css           # External CSS stylesheet (Flexbox, Grid, animations, media queries)
├── js/
│   ├── main.js             # Shared navigation script (hamburger menu, dynamic footer year)
│   ├── planner.js          # Academic planner logic (arrays, DOM manipulation, localStorage)
│   └── contact.js          # Form validation (required checks, email regex, digits-only phone)
└── assets/
    ├── images/             # Real student photo (favour-adedokun.jpg) & project mockups
    └── media/              # Multimedia files (welcome-audio.wav & video presentation poster)
```

---

## ✅ Rubric & Technical Requirements Met

### 1. Functional Requirements
* **Homepage (`index.html`)**:
  * Real student photograph and full name (Favour Adedokun).
  * Warm, personal welcome message.
  * Consistent navigation menu with active page highlighting.
  * Brief biography and academic metadata strip.
  * Audio welcome note player (`<audio>`) and video presentation card (`<video>`).
* **About Me Page (`about.html`)**:
  * Educational background timeline (MIVA Open University B.Sc. Software Engineering).
  * Career aspirations & 3-year milestones.
  * Technical skills categorized with custom badges.
  * Hobbies and interests.
  * Current semester academic course timetable table (`<table>` with `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`).
* **Projects Page (`projects.html`)**:
  * **Mega Chatting App**: Real-time messaging platform with live Vercel link (`https://mega-frontend-zeta.vercel.app`).
  * **Callerio Video Calling App**: WebRTC video calling platform with live Vercel link (`https://callerio.vercel.app/login`).
  * **MIVA Academic Hub & CGPA Tracker**: Academic calculator and revision organizer.
* **Academic Planner Page (`planner.html`)**:
  * Interactive task management system built with vanilla JavaScript.
  * **Add tasks**: Inputs for Task title, Course code, Due date, and Priority.
  * **Mark tasks as completed**: Checkbox dynamically strikes through completed tasks and recalculates status.
  * **Delete tasks**: Confirmation prompt and deletion from DOM and memory.
  * **Status counters**: Real-time tally of Total, Pending, and Completed tasks.
  * **Filters**: Filter tasks by All, Pending, or Completed.
  * **LocalStorage Persistence**: Saved tasks persist across browser reloads.
* **Contact Page (`contact.html`)**:
  * Form containing: Full Name, Email Address, Phone Number, and Message.
  * **JavaScript Validation**:
    * No field is empty.
    * Email address format validated with standard regex pattern (`user@domain.ext`).
    * Phone number validation ensures **only numeric digits** are entered.
    * Real-time dynamic error clearing on user input.

### 2. Technical Requirements
* **HTML**: Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`), forms, tables, images with `alt` text, hyperlinks, lists (`<ul>`, `<ol>`), and multimedia elements (`<audio>` and `<video>`).
* **CSS**: Single external stylesheet (`css/style.css`), CSS variables (`:root`), Flexbox, CSS Grid, mobile-responsive navigation with hamburger toggle, smooth hover transitions, and mobile media queries (`@media (max-width: 900px)` and `@media (max-width: 768px)`).
* **JavaScript**: Event listeners, DOM manipulation, form validation, dynamic list rendering, array methods (`filter`, `map`, `forEach`, `unshift`), and `localStorage`.

---

## 🚀 How to Host and Submit

### Option 1: Deploy to Vercel (Recommended)
1. Run `npx vercel` in the project root directory, or
2. Push this folder to your GitHub repository: `https://github.com/adedokunfavouroyinade/portfolio-assignment`
3. Log in to [Vercel](https://vercel.com), click **Add New Project**, import the GitHub repository, and click **Deploy**.
4. Submit your Vercel deployment link along with the GitHub repository link.

### Option 2: Deploy with GitHub Pages (Free)
1. Create a repository on GitHub (e.g. `cos106-portfolio`).
2. Push your files to the `main` branch.
3. In the repository, go to **Settings** > **Pages**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your website will be live at `https://adedokunfavouroyinade.github.io/cos106-portfolio/`.

