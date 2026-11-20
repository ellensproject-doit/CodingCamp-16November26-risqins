# Life Dashboard — RevoU Coding Camp Mini Project

A single-page To-Do Life Dashboard that runs entirely in the browser with no backend required.

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Structure  | HTML5                             |
| Styling    | CSS3 (one file: `css/style.css`)  |
| Logic      | Vanilla JavaScript (one file: `js/app.js`) |
| Storage    | Browser LocalStorage API          |

## Folder Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## MVP Features

### 1. Greeting
- Live clock (HH:MM:SS) updated every second
- Full date display (Day, Month DD, YYYY)
- Time-of-day greeting: Good Morning / Good Afternoon / Good Evening / Good Night

### 2. Focus Timer (Pomodoro)
- 25-minute countdown timer
- **Start** — begins or resumes the countdown
- **Stop** — pauses without resetting
- **Reset** — returns timer to 25:00
- Alert notification when session completes

### 3. To-Do List
- Add tasks via input field (Enter key or Add button)
- **Mark done** — checkbox toggles strikethrough styling
- **Edit** — double-click any task label to edit in place (Enter to save, Escape to cancel)
- **Delete** — red Delete button per task
- All tasks persisted in LocalStorage

### 4. Quick Links
- Pre-loaded defaults: Google, Gmail, Calendar
- Add custom links with a name and URL (protocol auto-prepended if missing)
- Remove any link with the × button on each chip
- Links open in a new tab
- All links persisted in LocalStorage

## How to Run

Open `index.html` directly in any modern browser — no server or build step needed.

Compatible with: Chrome, Firefox, Edge, Safari.

---

## Additional Challenges (Documented — Not Yet Implemented)

These features are identified for a future phase and require separate approval before tasks are created.

| Challenge | Description |
|-----------|-------------|
| **Custom name in greeting** | Allow the user to enter their name so the greeting reads e.g. "Good Morning, Risqi!" instead of a generic message. Name stored in LocalStorage. |
| **Change Pomodoro time** | Let the user set a custom timer duration (e.g. 15, 25, 50 minutes) instead of the fixed 25-minute default. Setting persisted in LocalStorage. |
| **Prevent duplicate tasks** | Before adding a new task, check if the same text (case-insensitive) already exists in the list and show an inline warning instead of adding the duplicate. |
