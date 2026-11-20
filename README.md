# Life Dashboard — RevoU Coding Camp Mini Project

A single-page To-Do Life Dashboard that runs entirely in the browser with no backend required.
Built with plain HTML, CSS, and vanilla JavaScript.

> For technical constraints, non-functional requirements, and product details see [PRD.md](PRD.md).

---

## How to Open

Open `index.html` directly in any modern browser — no server or build step needed.

Compatible with: Chrome, Firefox, Edge, Safari.

---

## Features

### Greeting
- Live clock (HH:MM:SS) updated every second
- Full date display (Day, Month DD, YYYY)
- Time-of-day greeting: Good Morning / Good Afternoon / Good Evening / Good Night

### Focus Timer
- 25-minute countdown timer
- **Start** — begins or resumes the countdown
- **Stop** — pauses without resetting
- **Reset** — returns timer to 25:00
- Alert notification when the session completes

### To-Do List
- Add tasks via input field (Enter key or Add button)
- **Mark done** — checkbox toggles strikethrough styling
- **Edit** — double-click any task label to edit in place (Enter to save, Escape to cancel)
- **Delete** — removes the task
- All tasks persisted in LocalStorage

### Quick Links
- Pre-loaded defaults: Google, Gmail, Calendar
- Add custom links with a name and URL (protocol auto-prepended if missing)
- Remove any link with the × button on its chip
- Links open in a new tab
- All links persisted in LocalStorage
