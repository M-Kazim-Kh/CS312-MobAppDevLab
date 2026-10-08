# Mobile Application Development: Lab Manual

A static website (HTML/CSS/JS) that shows the Jetpack Compose projects in a side panel. No installation or build step is needed.

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `mobile-lab-manual`.
2. Upload the **contents** of this folder (not the folder itself) so that `index.html` sits at the repository root.
3. Open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`, and click **Save**.
5. After about a minute the site is live at `https://USERNAME.github.io/mobile-lab-manual/`

## Folder contents

- `index.html`: the home page and all projects.
- `assets/style.css` and `assets/app.js`: styling and behavior.
- `assets/img/`: output screenshots.
- `.nojekyll`: stops GitHub from processing the files.

Fonts load from Google Fonts when online; system fonts are used offline.
