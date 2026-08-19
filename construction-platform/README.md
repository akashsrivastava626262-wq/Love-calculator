# BuildCraft — Construction & Home Building Platform

A premium, professional landing page for a construction and home-building platform.

## Features

- **Hero Section** — Compelling headline, dual CTAs, and animated statistics
- **Authentication** — Login and Sign Up modal dialogs
- **Services** — Home construction, renovation, interior design, architecture, landscape, and project management
- **Portfolio** — Filterable project showcase with hover effects
- **Testimonials** — Auto-rotating client success stories slider
- **Trust Indicators** — Certifications, badges, and company statistics
- **Contact** — Full contact form with service selection
- **Responsive Design** — Mobile-first layout with hamburger navigation

## View the site (choose one)

### Option A — Instant online preview (no setup)

Open this link in your browser right now:

**https://raw.githack.com/akashsrivastava626262-wq/Love-calculator/main/construction-platform/index.html**

### Option B — Live GitHub Pages URL (one-time setup required)

**https://akashsrivastava626262-wq.github.io/Love-calculator/**

Enable it once in GitHub:
1. Open https://github.com/akashsrivastava626262-wq/Love-calculator/settings/pages
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Go to **Actions** → re-run the failed **Deploy BuildCraft to GitHub Pages** workflow

### Option C — Local preview on your computer

**Important:** You must run the server from inside the `construction-platform` folder.
If you see a list of folders like Desktop, Documents, Downloads — you started it from the wrong place.

```bash
# 1. Clone the repo (skip if you already have it)
git clone https://github.com/akashsrivastava626262-wq/Love-calculator.git
cd Love-calculator/construction-platform

# 2. Start the server (pick one)
./start.sh
# OR
python3 -m http.server 8080

# 3. Open in browser
# http://localhost:8080
```

**Do NOT** run `python3 -m http.server` from your home folder (`~`) — that shows a directory listing, not the website.

## Structure

```
construction-platform/
├── index.html          # Main landing page
├── css/
│   └── styles.css      # Premium styling
├── js/
│   └── main.js         # Interactivity (nav, modal, slider, counters)
└── README.md
```

## Design

- **Typography:** Playfair Display (headings) + DM Sans (body)
- **Palette:** Deep navy, gold accents, clean whites
- **Imagery:** High-quality Unsplash construction and home photos

## License

MIT
