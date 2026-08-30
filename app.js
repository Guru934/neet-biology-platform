// Bloom: NEET Biology Study Companion
// Track NCERT readings, practice sessions, mistakes, and revision schedule.
// To add a NotebookLM link, paste the URL inside the quotes for each chapter.
// Example: [11, "The Living World", false, "https://notebooklm.google.com/..."],
const STORAGE = "bloom-neet-bio-v1";
const chapters = [
  [11, "The Living World", false, "https://notebook.google.com/notebook/3a93fdd1-5169-4a54-aac7-ee4fe21443fd"],
  [11, "Biological Classification", false, "https://notebook.google.com/notebook/c6a1d13d-58fd-48ff-a8e2-82f5578f6762"],
  [11, "Plant Kingdom", false, "https://notebook.google.com/notebook/83ad8c20-c7c1-4181-93e4-b376deed3d04"],
  [11, "Animal Kingdom", false, "https://notebook.google.com/notebook/e0bdf9d5-376b-4aea-a294-6d0088c7cbd0"],
  [11, "Morphology of Flowering Plants", false, "https://notebook.google.com/notebook/4ee3dd06-19ba-4665-9f8e-5107653d5811"],
  [11, "Anatomy of Flowering Plants", false, "https://notebook.google.com/notebook/115f2676-abb4-4cfe-8bb4-b1cf7d92a1ee"],
  [11, "Structural Organisation in Animals", false, "https://notebook.google.com/notebook/8745fccd-5ebe-4604-bf27-ef2e3e364791"],
  [11, "Cell: The Unit of Life", true, "https://notebook.google.com/notebook/6633e95e-f28d-43df-bb96-0646e9585b74"],
  [11, "Biomolecules", true, "https://notebook.google.com/notebook/8bf7e679-f0df-4fba-a669-6596f2bc0c7e"],
  [11, "Cell Cycle and Cell Division", true, "https://notebook.google.com/notebook/1d2231ef-2675-4bfc-80c6-aa8419196547"],
  [11, "Photosynthesis in Higher Plants", true, "https://notebook.google.com/notebook/052a2d37-3f47-47cf-b65a-95890e75e249"],
  [11, "Respiration in Plants", false, "https://notebook.google.com/notebook/a6ff0eb3-6f19-43fb-ac61-3301e5d43240"],
  [11, "Plant Growth and Development", false, "https://notebook.google.com/notebook/6d6aaea9-d8d2-4968-8fcf-254f99ae2303"],
  [11, "Breathing and Exchange of Gases", true, "https://notebook.google.com/notebook/9c5dc047-80aa-4b1f-8bf1-4abe66844e36"],
  [11, "Body Fluids and Circulation", true, "https://notebook.google.com/notebook/93b46073-3351-48c0-ab05-2336a3d04e88"],
  [11, "Excretory Products and Their Elimination", true, "https://notebook.google.com/notebook/13a4382f-5cae-4515-ac48-3863cd940775"],
  [11, "Locomotion and Movement", false, "https://notebook.google.com/notebook/b26baf5d-b80a-4b9e-b1af-3589be0bb7ee"],
  [11, "Neural Control and Coordination", true, "https://notebook.google.com/notebook/4abd4322-0fc4-49ff-98e8-6f0d85fc3d45"],
  [11, "Chemical Coordination and Integration", true, "https://notebook.google.com/notebook/d6272f90-1cf2-49ec-8423-f6ec763cd310"],
  [12, "Sexual Reproduction in Flowering Plants", true, "https://notebook.google.com/notebook/da1d6ec3-32ab-46b6-a7c2-9b7248a4f062"],
  [12, "Human Reproduction", true, "https://notebook.google.com/notebook/600dc7a2-78bb-402e-a042-27f20d23b8b6"],
  [12, "Reproductive Health", false, "https://notebook.google.com/notebook/74000cf3-c986-4f2e-9dad-3c346345375f"],
  [12, "Principles of Inheritance and Variation", true, "https://notebook.google.com/notebook/e5eb67fe-04d6-4c25-8d60-5caffeb4a986"],
  [12, "Molecular Basis of Inheritance", true, "https://notebook.google.com/notebook/9e6ef61d-ad07-427b-b7ec-fd3b43d22634"],
  [12, "Evolution", true, "https://notebook.google.com/notebook/4143e257-4f55-431f-ae5f-9e655b09ff90"],
  [12, "Human Health and Disease", true, "https://notebook.google.com/notebook/538b00fc-a0fd-472c-8990-2de6918fbefb"],
  [12, "Microbes in Human Welfare", false, "https://notebook.google.com/notebook/e449ca5c-fc27-4dbc-9f5b-ca64a9e22a67"],
  [12, "Biotechnology: Principles and Processes", true, "https://notebook.google.com/notebook/6d01cf3d-6aa6-46b9-b0e0-ba7cebb09330"],
  [12, "Biotechnology and its Applications", true, "https://notebook.google.com/notebook/bee47ac2-42cf-466f-925b-f89362c9331a"],
  [12, "Organisms and Populations", true, "https://notebook.google.com/notebook/56bb13f1-8059-4fbe-8529-1ba40efd2f44"],
  [12, "Ecosystem", true, "https://notebook.google.com/notebook/7052a4a4-7484-4e2a-9443-2e7e204b3e50"],
  [12, "Biodiversity and Conservation", true, "https://notebook.google.com/notebook/faf36e02-f923-4e9b-95a9-3009fe3b3fa7"],
].map(([classYear, name, highWeight, notebookUrl]) => ({ id: `${classYear}-${name}`, classYear, name, highWeight, notebookUrl }));
const quotes = ["A little NCERT every day becomes confidence on exam day.", "Consistency is a quiet kind of courage.", "Read the line. Understand the line. Remember the line.", "A mistake reviewed today cannot steal a mark tomorrow.", "You do not have to finish everything today—just keep moving.", "Future doctor energy: one focused session at a time.", "Your effort is adding up, even on ordinary days."];
let state = load();
let timerInterval;
let currentMode = "Questions";

function blankState() { return { name: "", targetDate: "2027-05-03", chapters: {}, readings: [], sessions: [], errors: [], timer: null }; }
function load() { try { return { ...blankState(), ...JSON.parse(localStorage.getItem(STORAGE) || "{}") }; } catch { return blankState(); } }
function save() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
function el(id) { return document.getElementById(id); }
function today() { return new Date().toISOString().slice(0, 10); }
function dateOnly(d) { return new Date(`${d}T00:00:00`); }
function prettyDate(d) { return dateOnly(d).toLocaleDateString(undefined, { day: "numeric", month: "short" }); }
function escapeText(value) { const node = document.createElement("span"); node.textContent = value || ""; return node.innerHTML; }
function toast(message) { const box = el("toast"); box.textContent = message; box.className = "toast show"; setTimeout(() => { box.className = "toast hidden"; }, 2800); }

function init() {
  if (state.name) showApp();
  el("login-form").addEventListener("submit", (event) => { event.preventDefault(); state.name = el("student-name").value.trim(); save(); showApp(); });
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  el("target-date").addEventListener("change", (event) => { state.targetDate = event.target.value; save(); renderDashboard(); });
  el("quick-reading").addEventListener("click", () => { showView("syllabus"); toast("Choose a chapter and log its NCERT reading."); });
  el("practice-form").addEventListener("submit", logPractice);
  el("open-source").addEventListener("click", openSource);
  el("timer-start").addEventListener("click", startTimer);
  el("timer-pause").addEventListener("click", pauseTimer);
  el("timer-finish").addEventListener("click", finishTimer);
  document.querySelectorAll(".mode-button").forEach((button) => button.addEventListener("click", () => { currentMode = button.dataset.mode; document.querySelectorAll(".mode-button").forEach((b) => b.classList.toggle("active", b === button)); el("timer-status").textContent = currentMode === "Study" ? "Use this for NCERT reading or revision." : "Choose a chapter, then begin when ready."; }));
  el("error-form").addEventListener("submit", saveError);
  el("retest-random").addEventListener("click", showRandomError);
  el("reset-data").addEventListener("click", () => { if (confirm("This deletes all Bloom data saved in this browser. Continue?")) { localStorage.removeItem(STORAGE); location.reload(); } });
  fillChapterSelects();
}

function showApp() { el("auth-view").classList.add("hidden"); el("app-view").classList.remove("hidden"); el("avatar").textContent = state.name[0].toUpperCase(); renderAll(); }
function showView(view) { document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === view)); document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === view)); const titles = { dashboard: `Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, ${state.name}`, practice: "Practice session", revision: "Revision plan", errors: "Error notebook", syllabus: "Syllabus map", chapters: "Chapter Notes" }; el("page-title").textContent = titles[view]; if (view === "dashboard") renderDashboard(); if (view === "practice") renderPractice(); if (view === "revision") renderRevision(); if (view === "errors") renderErrors(); if (view === "syllabus") renderSyllabus(); if (view === "chapters") renderChapters(); window.scrollTo({ top: 0, behavior: "smooth" }); }
function fillChapterSelects() { ["practice-chapter", "error-chapter"].forEach((selectId) => { el(selectId).innerHTML = chapters.map((chapter) => `<option value="${chapter.id}">Class ${chapter.classYear} — ${chapter.name}</option>`).join(""); }); }
function getChapter(id) { return chapters.find((chapter) => chapter.id === id); }
function daySessions(day = today()) { return state.sessions.filter((session) => session.date === day); }
function questionsToday() { return daySessions().reduce((total, session) => total + Number(session.total || 0), 0); }
function minutesToday() { return Math.round(daySessions().reduce((total, session) => total + Number(session.duration || 0), 0) / 60); }
function streak() { let count = 0; let cursor = dateOnly(today()); while (true) { const day = cursor.toISOString().slice(0, 10); const amount = state.sessions.filter((session) => session.date === day).reduce((sum, session) => sum + Number(session.total || 0), 0); if (amount < 50) break; count++; cursor.setDate(cursor.getDate() - 1); } return count; }
function completedChapters() { return chapters.filter((chapter) => state.chapters[chapter.id]?.completed); }
function percentage() { return Math.round((completedChapters().length / chapters.length) * 100); }
function renderAll() { fillChapterSelects(); renderDashboard(); renderPractice(); renderRevision(); renderErrors(); renderSyllabus(); renderChapters(); restoreTimer(); }

function renderDashboard() {
  const now = new Date(); el("today-date").textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }); el("daily-quote").textContent = `"${quotes[(now.getDate() + now.getMonth() * 7) % quotes.length]}"`;
  el("target-date").value = state.targetDate; const days = Math.max(0, Math.ceil((dateOnly(state.targetDate) - dateOnly(today())) / 86400000)); el("days-left").textContent = days;
  const done = questionsToday(), currentStreak = streak(), percent = percentage(); el("today-questions").textContent = `${done} / 50`; el("today-minutes").textContent = `${minutesToday()} min`; el("streak-count").textContent = `${currentStreak} day streak`; el("streak-copy").textContent = done >= 50 ? "Today's goal complete ✦" : `${Math.max(0, 50 - done)} questions to protect it`; el("coverage-number").textContent = `${percent}%`; el("goal-percent").textContent = `${Math.min(100, Math.round(done / 50 * 100))}%`; el("goal-message").textContent = done >= 50 ? "You did it. Review one mistake before you rest." : `${Math.max(0, 50 - done)} more questions for today's streak.`;
  el("coverage-bar").style.width = `${percent}%`; el("coverage-label").textContent = `${completedChapters().length} of ${chapters.length} chapters complete`; el("coverage-detail").textContent = `${percent}% complete`; el("class-progress").innerHTML = [11, 12].map((year) => { const all = chapters.filter((c) => c.classYear === year); const complete = all.filter((c) => state.chapters[c.id]?.completed).length; return `<div><b>Class ${year}</b><span>${complete}/${all.length} chapters</span></div>`; }).join("");
  const due = reviewQueue().slice(0, 4); el("due-list").innerHTML = due.length ? due.map((item) => `<div class="due-item"><div><strong>${escapeText(item.chapter.name)}</strong><small>${item.label} · due ${prettyDate(item.due)}</small></div><button class="small-button" data-review="${item.key}">Mark revised</button></div>`).join("") : `<p class="empty">Nothing is due yet. Log an NCERT reading to begin your schedule.</p>`; document.querySelectorAll("[data-review]").forEach((button) => button.addEventListener("click", () => completeReview(button.dataset.review)));
}

function renderPractice() { const rows = [...state.sessions].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8); el("session-history").innerHTML = rows.length ? rows.map((session) => { const chapter = getChapter(session.chapterId); const accuracy = session.total ? Math.round(session.correct / session.total * 100) : 0; return `<div class="session-item"><div><strong>${escapeText(chapter?.name || "Study focus")}</strong><small>${session.date} · ${escapeText(session.source)} · ${Math.round(session.duration / 60)} min</small></div><div class="session-score">${session.total ? `${session.total} Q · ${accuracy}%` : "Focus"}</div></div>`; }).join("") : `<p class="empty">Your finished sessions will appear here.</p>`; }
function openSource() { const source = el("practice-source").value; const urls = { ScienceLesson: "https://sciencelesson.in/NEET-Mock-Test/", "Official PYQ": "https://exams.nta.ac.in/NEET/", "MTG Fingerprints": "https://mtg.in/" }; window.open(urls[source] || "about:blank", "_blank", "noopener"); }
function logPractice(event) { event.preventDefault(); const total = Math.max(0, Number(el("practice-total").value)); const correct = Math.max(0, Number(el("practice-correct").value)); const wrong = Math.max(0, Number(el("practice-wrong").value)); const guessed = Math.max(0, Number(el("practice-guessed").value)); if (correct + wrong > total) { toast("Correct + wrong cannot be greater than questions solved."); return; } const duration = state.timer?.elapsed || 0; state.sessions.push({ id: crypto.randomUUID(), date: today(), source: el("practice-source").value, chapterId: el("practice-chapter").value, total, correct, wrong, guessed, duration, createdAt: Date.now() }); state.timer = null; save(); stopInterval(); el("practice-form").reset(); el("practice-total").value = 50; renderAll(); toast(`${total} questions saved. Keep the streak alive.`); }

function formatTime(seconds) { const h = String(Math.floor(seconds / 3600)).padStart(2, "0"); const m = String(Math.floor(seconds % 3600 / 60)).padStart(2, "0"); const s = String(seconds % 60).padStart(2, "0"); return `${h}:${m}:${s}`; }
function timerSeconds() { if (!state.timer) return 0; return state.timer.elapsed + (state.timer.running ? Math.floor((Date.now() - state.timer.startedAt) / 1000) : 0); }
function renderTimer() { const seconds = timerSeconds(); el("timer-display").textContent = formatTime(seconds); const active = Boolean(state.timer); el("timer-start").disabled = Boolean(state.timer?.running); el("timer-pause").disabled = !active || !state.timer.running; el("timer-finish").disabled = !active; if (active) el("timer-status").textContent = state.timer.running ? `${state.timer.mode} timer is running.` : `${state.timer.mode} timer is paused.`; }
function startTimer() { if (!state.timer) state.timer = { elapsed: 0, startedAt: Date.now(), running: true, mode: currentMode }; else { state.timer.startedAt = Date.now(); state.timer.running = true; } save(); stopInterval(); timerInterval = setInterval(renderTimer, 500); renderTimer(); }
function pauseTimer() { if (!state.timer?.running) return; state.timer.elapsed = timerSeconds(); state.timer.running = false; save(); stopInterval(); renderTimer(); }
function finishTimer() { if (!state.timer) return; state.timer.elapsed = timerSeconds(); state.timer.running = false; save(); stopInterval(); renderTimer(); if (state.timer.mode === "Study") { state.sessions.push({ id: crypto.randomUUID(), date: today(), source: "Study focus", chapterId: el("practice-chapter").value, total: 0, correct: 0, wrong: 0, guessed: 0, duration: state.timer.elapsed, createdAt: Date.now() }); state.timer = null; save(); renderAll(); toast("Study session saved."); } else { toast("Timer saved. Enter your results and press Save session."); } }
function restoreTimer() { stopInterval(); renderTimer(); if (state.timer?.running) timerInterval = setInterval(renderTimer, 500); }
function stopInterval() { clearInterval(timerInterval); }

function logReading(id) { const chapter = getChapter(id); state.readings.push({ id: crypto.randomUUID(), chapterId: id, date: today(), createdAt: Date.now() }); save(); renderAll(); toast(`${chapter.name}: NCERT reading logged. Day 7 and Day 30 reviews are ready.`); }
function reviewQueue() { const items = []; state.readings.forEach((reading) => { const chapter = getChapter(reading.chapterId); [[7, "Day 7 review"], [30, "Day 30 review"]].forEach(([days, label]) => { const dueDate = dateOnly(reading.date); dueDate.setDate(dueDate.getDate() + days); const key = `${reading.id}-${days}`; const completed = state.readings.find((entry) => entry.reviewOf === key); if (!completed) items.push({ key, chapter, label, due: dueDate.toISOString().slice(0, 10), dueTime: dueDate.getTime() }); }); }); return items.sort((a, b) => a.dueTime - b.dueTime); }
function completeReview(key) { state.readings.push({ id: crypto.randomUUID(), reviewOf: key, date: today(), createdAt: Date.now() }); save(); renderAll(); toast("Revision complete. Nice work."); }
function renderRevision() { const items = reviewQueue(); el("revision-list").innerHTML = items.length ? items.map((item) => `<article class="revision-item"><div><div class="revision-date"><b>${dateOnly(item.due).getDate()}</b><span>${dateOnly(item.due).toLocaleDateString(undefined,{month:"short"})}</span></div><div><strong>${escapeText(item.chapter.name)}</strong><small>${item.label}${item.due <= today() ? " · due now" : ""}</small></div></div><button class="small-button" data-review="${item.key}">Mark revised</button></article>`).join("") : `<div class="panel"><p class="empty">Your revision calendar will appear after you log NCERT readings.</p></div>`; document.querySelectorAll("[data-review]").forEach((button) => button.addEventListener("click", () => completeReview(button.dataset.review))); }

function saveError(event) { event.preventDefault(); const file = el("error-image").files[0]; const record = { id: crypto.randomUUID(), chapterId: el("error-chapter").value, type: el("error-type").value, answer: el("error-answer").value.trim(), note: el("error-note").value.trim(), createdAt: Date.now(), resolved: false, image: null }; const finish = () => { state.errors.unshift(record); save(); el("error-form").reset(); renderErrors(); toast("Saved to the Error Notebook."); }; if (file) { if (file.size > 1200000) { toast("Please use an image smaller than 1.2 MB."); return; } const reader = new FileReader(); reader.onload = () => { record.image = reader.result; finish(); }; reader.readAsDataURL(file); } else finish(); }
function renderErrors() { const active = state.errors.filter((error) => !error.resolved); el("error-count").textContent = `${active.length} question${active.length === 1 ? "" : "s"} waiting`; el("error-list").innerHTML = state.errors.length ? state.errors.map((error) => { const chapter = getChapter(error.chapterId); return `<article class="error-item"><div>${error.image ? `<img src="${error.image}" alt="Saved question" />` : ""}</div><div><strong>${escapeText(chapter?.name)}</strong><span class="tag">${escapeText(error.type)}</span><small>${escapeText(error.answer)}</small>${error.note ? `<small>Note: ${escapeText(error.note)}</small>` : ""}</div><div class="error-actions">${!error.resolved ? `<button class="small-button" data-resolve="${error.id}">I know this now</button>` : `<small>Resolved ✓</small>`}<button class="small-button danger" data-delete-error="${error.id}">Delete</button></div></article>`; }).join("") : `<div class="panel"><p class="empty">No saved errors yet. That's a good thing—save only the ones worth revisiting.</p></div>`; document.querySelectorAll("[data-resolve]").forEach((button) => button.addEventListener("click", () => { const record = state.errors.find((error) => error.id === button.dataset.resolve); record.resolved = true; save(); renderErrors(); toast("Marked as understood."); })); document.querySelectorAll("[data-delete-error]").forEach((button) => button.addEventListener("click", () => { state.errors = state.errors.filter((error) => error.id !== button.dataset.deleteError); save(); renderErrors(); })); }
function showRandomError() { const options = state.errors.filter((error) => !error.resolved); if (!options.length) { toast("Add an error first."); return; } const error = options[Math.floor(Math.random() * options.length)], chapter = getChapter(error.chapterId), box = el("retest-card"); box.innerHTML = `<strong>${escapeText(chapter.name)}</strong><p>${escapeText(error.answer)}</p>${error.note ? `<small>${escapeText(error.note)}</small>` : ""}${error.image ? `<img src="${error.image}" alt="Saved question" />` : ""}`; box.classList.remove("hidden"); }

function renderSyllabus() { el("syllabus-list").innerHTML = [11, 12].map((year) => { const list = chapters.filter((chapter) => chapter.classYear === year); const done = list.filter((chapter) => state.chapters[chapter.id]?.completed).length; return `<section class="syllabus-class"><h3>Class ${year}</h3><p>${done} of ${list.length} chapters marked complete</p>${list.map((chapter) => { const data = state.chapters[chapter.id] || {}; const reads = state.readings.filter((reading) => reading.chapterId === chapter.id && !reading.reviewOf).length; const due = reviewQueue().filter((review) => review.chapter.id === chapter.id).length; return `<div class="chapter-row ${data.completed ? "done" : ""}"><input type="checkbox" ${data.completed ? "checked" : ""} data-complete="${chapter.id}" aria-label="Mark ${escapeText(chapter.name)} complete" /><div><b>${escapeText(chapter.name)}${chapter.highWeight ? `<span class="chip">HIGH WEIGHTAGE</span>` : ""}</b><small>NCERT reads: ${reads}/15${due ? ` · ${due} review${due > 1 ? "s" : ""} pending` : ""}</small></div><div class="chapter-actions"><button class="small-button" data-read="${chapter.id}">+ NCERT read</button></div></div>`; }).join("")}</section>`; }).join(""); document.querySelectorAll("[data-complete]").forEach((box) => box.addEventListener("change", () => { state.chapters[box.dataset.complete] = { ...(state.chapters[box.dataset.complete] || {}), completed: box.checked }; save(); renderAll(); })); document.querySelectorAll("[data-read]").forEach((button) => button.addEventListener("click", () => logReading(button.dataset.read))); }

function renderChapters() {
  el("chapters-list").innerHTML = [11, 12].map((year) => {
    const list = chapters.filter((c) => c.classYear === year);
    return `<section class="chapters-class"><h3>Class ${year} Biology</h3><div class="chapters-grid">${list.map((chapter, index) => {
      const num = index + 1;
      const hasUrl = Boolean(chapter.notebookUrl);
      return `<div class="chapter-card"><div class="chapter-card-header"><span class="chapter-number">${num}</span><b>${escapeText(chapter.name)}</b>${chapter.highWeight ? `<span class="chip">HIGH WEIGHTAGE</span>` : ""}</div>${hasUrl ? `<a class="notebook-button" href="${chapter.notebookUrl}" target="_blank" rel="noreferrer">📓 Open in NotebookLM</a>` : `<span class="notebook-button disabled">📓 Link coming soon</span>`}</div></div>`;
    }).join("")}</div></section>`;
  }).join("");
}

init();
