# Industrial Training Institute Shillong — Website

A simple, free, official-style website for ITI Shillong. Built with plain
HTML, CSS and JavaScript — no frameworks, no paid services, no database.

**Total cost to run this website: ₹0/month, ₹0/year.**

---

## 1. Why this is completely free

| Need | Free solution used here |
|---|---|
| Hosting | **GitHub Pages** (free for public repositories) |
| Domain | Free `github.io` subdomain |
| Storage for notice PDFs | The same GitHub repository (`notices/` folder) |
| "Database" for notice info | A plain `notices.json` text file in the repository |
| Editing the website | GitHub's own website editor, or any text editor |
| Fonts | System fonts already installed on every device (no external font service) |

No credit card, no sign-up trial, and no subscription is needed at any point.
There is no server-side code and no admin login system — because any login
system that is safe would need a paid backend or database to check
passwords securely. Instead, you manage the website by editing files
directly in your GitHub repository, which is the simplest completely free
and secure approach.

---

## 2. Project structure

```
iti-shillong/
├── index.html            Home page
├── principal.html        Principal's Message page
├── trades.html           Trades Offered page
├── admission.html        Admission page
├── contact.html          Contact Us page
├── notices.json          List of notices shown on the Home page (EDIT THIS to add/remove notices)
├── README.md             This file
├── assets/
│   ├── css/style.css     All styling
│   ├── js/script.js      Website behaviour (menu, notices, etc.) — you normally don't need to touch this
│   ├── js/site-data.js   Contact info, Principal's message, Trades list (EDIT THIS to update content)
│   └── images/
│       ├── iti-logo.svg        Placeholder logo — replace with the real logo
│       ├── iti-shillong.svg    Placeholder home page background photo — replace with a real photo
│       └── principal.svg       Placeholder Principal photo — replace with a real photo
└── notices/
    └── sample-notice.pdf  Example PDF (delete once you add your own notices)
```

---

## A. How to put the website online for free

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up. It's free and only needs
an email address.

### Step 2 — Create a repository
1. Click the **+** icon (top right) → **New repository**.
2. Name it exactly: `iti-shillong` (or any name you like).
3. Set it to **Public**.
4. Click **Create repository**.

> **Tip:** If you want your website at `https://<your-username>.github.io/`
> (with nothing after it), name the repository `<your-username>.github.io`
> exactly. Otherwise your site will appear at
> `https://<your-username>.github.io/iti-shillong/`. Both are completely
> free — only the web address looks different.

### Step 3 — Upload the project files
1. On your new repository's page, click **Add file → Upload files**.
2. Drag in *all* the files and folders from this project, keeping the same
   folder structure (`assets/`, `notices/`, `index.html`, etc.).
3. Scroll down and click **Commit changes**.

### Step 4 — Enable GitHub Pages
1. In your repository, go to **Settings → Pages** (left sidebar).
2. Under "Build and deployment", set **Source** to **Deploy from a branch**.
3. Under "Branch", choose **main** and folder **/(root)**, then click **Save**.

### Step 5 — Get your free website address
After a minute or two, GitHub will show a green box with your website's
web address, for example:

```
https://<your-username>.github.io/iti-shillong/
```

(The exact address depends on your GitHub username and repository name —
GitHub will show you the correct one.)

**Any change you upload afterwards usually appears on the live site within
1–3 minutes** (occasionally up to 10 minutes).

---

## B. How to add a new PDF notice

1. **Prepare the PDF.** Name it clearly, using only letters, numbers and
   hyphens — no spaces. Example: `admission-notice-2026.pdf`
2. **Upload the PDF:**
   - In your GitHub repository, open the `notices` folder.
   - Click **Add file → Upload files**.
   - Upload your PDF, then click **Commit changes**.
3. **Add the notice information** by editing `notices.json`:
   - Open `notices.json` in your repository and click the pencil (✏️) "Edit" icon.
   - Add a new entry at the top of the list, following this exact pattern
     (copy an existing entry and change the details):
     ```json
     {
       "title": "Admission Notice 2026",
       "date": "2026-08-27",
       "description": "Important admission notification",
       "pdf": "notices/admission-notice-2026.pdf",
       "important": true
     }
     ```
   - Make sure there is a comma `,` between entries, and no comma after
     the very last entry.
   - `"date"` must be written as `YYYY-MM-DD` (year-month-day).
   - `"important"` is optional — set it to `true` to show a small
     "Important" label, or remove that line entirely.
4. Click **Commit changes**.
5. **Wait 1–3 minutes.** Refresh the website — your notice will appear
   automatically, newest first. You don't need to touch any other file.

---

## C. How to delete a PDF notice

1. Go to the `notices` folder in your repository and open the PDF file
   you want to remove.
2. Click the trash-can 🗑️ icon to delete it, then commit the change.
3. Open `notices.json`, find the matching entry, and delete that whole
   `{ ... }` block (including its surrounding braces).
4. Make sure the remaining entries still have correct commas between them.
5. Commit the change and wait 1–3 minutes for the website to update.

---

## D. How to replace the ITI logo

1. Prepare your official logo image (PNG or JPG works well; keep the file
   size small, e.g. under 200 KB).
2. Name it `iti-logo.png` (or `.jpg`).
3. Upload it into `assets/images/` in your repository.
4. Open each HTML file (`index.html`, `principal.html`, `trades.html`,
   `admission.html`, `contact.html`) and find this line near the top:
   ```html
   <img src="assets/images/iti-logo.svg" alt="ITI Shillong logo" width="52" height="52">
   ```
   Change `iti-logo.svg` to your new file name, e.g. `iti-logo.png`.
5. Commit the changes.

---

## E. How to replace the ITI Shillong background photo

1. Prepare an official photograph of the institute (JPG recommended,
   ideally around 1600px wide, optimised/compressed for the web).
2. Name it `iti-shillong.jpg`.
3. Upload it into `assets/images/`.
4. Open `assets/css/style.css` and find this line inside `.hero`:
   ```css
   background-image: linear-gradient(rgba(8,42,69,0.72), rgba(8,42,69,0.72)), url("../images/iti-shillong.svg");
   ```
   Change `iti-shillong.svg` to `iti-shillong.jpg`.
5. Commit the changes.

---

## F. How to update the Principal's message

1. Open `assets/js/site-data.js` in your repository (click the pencil ✏️ to edit).
2. Find the `principal` section and update:
   - `name` — the Principal's actual name
   - `designation` — their official title
   - `photo` — the file name if you've uploaded a real photo (see below)
   - `message` — one line of text per paragraph
3. To add a real photo: upload it to `assets/images/` (e.g. `principal.jpg`)
   and change `photo: "assets/images/principal.svg"` to
   `photo: "assets/images/principal.jpg"`.
4. Commit the changes.

---

## G. How to update the trades

1. Open `assets/js/site-data.js`.
2. Find the `trades` section — it's a list of entries like this:
   ```js
   {
     name: "Electrician",
     duration: "2 Years",
     description: "Official course description here."
   }
   ```
3. Edit existing entries, or copy/paste one to add a new trade. To remove
   a trade, delete its whole `{ ... }` block.
4. Make sure each entry (except the last one) ends with a comma `,`.
5. Commit the changes.

---

## H. How to update the email, phone number and Instagram URL

1. Open `assets/js/site-data.js`.
2. Find the `contact` section near the top:
   ```js
   contact: {
     email: "[INSERT OFFICIAL ITI SHILLONG EMAIL]",
     phone: "[INSERT OFFICIAL ITI SHILLONG PHONE NUMBER]",
     instagramUrl: "[INSERT OFFICIAL ITI SHILLONG INSTAGRAM URL]"
   },
   ```
3. Replace each placeholder with the real information, keeping the
   quotation marks. For Instagram, use the full web address, e.g.
   `"https://www.instagram.com/your_official_page"`.
4. Commit the changes. The Contact Us page updates automatically.

---

## Good to know

- **No information has been invented.** Every name, phone number, email,
  Instagram link, trade, and admission detail in this project is a clearly
  marked placeholder. Please replace them with verified official
  information before publishing.
- **If `notices.json` ever has a mistake** (e.g. a missing comma), the Home
  page will show "Latest notices are currently unavailable. Please check
  again later." instead of breaking — the rest of the site keeps working.
- **No passwords, API keys or secret tokens** are used anywhere in this
  project, because anything placed in these files becomes publicly visible
  once uploaded to GitHub.
- The included `notices/sample-notice.pdf` and its entry in `notices.json`
  are just examples — delete both once you've added your own real notices.
