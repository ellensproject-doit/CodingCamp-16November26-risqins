# Product Requirements Document (PRD)
## Life Dashboard — RevoU Coding Camp Mini Project

---

## Technical Constraints

### TC-1: Technology Stack
- HTML for structure
- CSS for styling
- Vanilla JavaScript (no frameworks like React, Vue, etc.)
- No backend server required

### TC-2: Data Storage
- Use browser LocalStorage API
- All data stored client-side only

### TC-3: Browser Compatibility
- Must work in modern browsers (Chrome, Firefox, Edge, Safari)
- Can be used as a standalone web app or browser extension

---

## Non-Functional Requirements

### NFR-1: Simplicity
- Clean, minimal interface
- Easy to understand and use
- No complex setup required
- No test setup required

### NFR-2: Performance
- Fast load time
- Responsive UI interactions
- No noticeable lag when updating data

### NFR-3: Visual Design
- User-friendly aesthetic
- Clear visual hierarchy
- Readable typography

---

## Folder Rules
- Only 1 CSS file inside `css/`
- Only 1 JavaScript file inside `js/`
- Keep code clean and readable

---

## Required Features (MVP)

### 1. Greeting
- Show current time and date
- Show a greeting based on the time of day

### 2. Focus Timer
- 25-minute timer
- Start, Stop, and Reset buttons

### 3. To-Do List
- Add tasks
- Edit tasks
- Mark tasks as done
- Delete tasks
- Save tasks using LocalStorage

### 4. Quick Links
- Buttons that open favourite websites
- Links must be saved in LocalStorage

---

## Additional Challenges (Pending Approval)

These features are identified for a future phase and require separate approval before tasks are created.

| Challenge | Description |
|-----------|-------------|
| **Custom name in greeting** | Allow the user to enter their name so the greeting reads e.g. "Good Morning, Risqi!" instead of a generic message. Name stored in LocalStorage. |
| **Change Pomodoro time** | Let the user set a custom timer duration (e.g. 15, 25, 50 minutes) instead of the fixed 25-minute default. Setting persisted in LocalStorage. |
| **Prevent duplicate tasks** | Before adding a new task, check if the same text (case-insensitive) already exists in the list and show an inline warning instead of adding the duplicate. |
