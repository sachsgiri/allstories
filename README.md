# All Stories

A personal static site for short stories, hosted for free on GitHub Pages at
`https://<your-username>.github.io/allstories/`. No domain purchase, no
server, no build step.

## Structure

```
index.html         : landing page: ideas on the left, "Read →" link on the right
stories/*.html      : one page per story (title, byline, illustration, text)
styles.css          : shared styles (Lora/Noto Serif Devanagari for story text,
                      Inter for UI chrome, one dark editorial theme)
gate.js             : shared client-side password gate, included on every page
README.md           : this file
```

## Set up the repo and enable Pages (no git CLI, just the browser)

1. **Create the repo**
   - Go to [github.com/new](https://github.com/new) on your **personal**
     GitHub account (not a work account).
   - Repository name: `allstories` (or whatever you like, it becomes part
     of the URL).
   - Set it to **Public** (GitHub Pages on the free tier only serves public
     repos, unless you're on GitHub Pro/Team, in which case Private + Pages
     is possible; see the note at the bottom).
   - Click **Create repository**. Leave it empty (no README, no license), you'll
     upload the files directly.

2. **Upload the files**
   - On the new repo's page, click **Add file → Upload files**.
   - Drag in `index.html`, `styles.css`, `gate.js`, `README.md`, and the
     whole `stories/` folder (modern browsers let you drag a folder in and
     GitHub preserves the path).
   - Scroll down, add a commit message like "Initial site", and click
     **Commit changes**.

3. **Enable GitHub Pages**
   - In the repo, go to **Settings → Pages** (left sidebar, under "Code and
     automation").
   - Under **Build and deployment → Source**, choose **Deploy from a
     branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
   - GitHub will show a banner "Your site is live at
     `https://<your-username>.github.io/allstories/`". It can take a
     minute or two the first time.

4. **Verify**
   - Open the URL GitHub gives you. You should see the password lock
     overlay first (see below), then the story table after you enter it.

Every time you upload new/changed files through **Add file → Upload files**
(or edit a file directly in GitHub's web editor and commit), Pages
automatically rebuilds and redeploys within a minute or so. No separate
"deploy" step.

## Adding a new idea or story

`index.html` is a literal two-column table: **the idea on the left, the
story's name on the right.** An idea can come in before there's any story to
link to. That's expected, this is where unfinished ideas live too.

**Adding a bare idea (no story yet).** Just add a row with the idea on the
left and "Coming soon" on the right:

```html
<tr>
  <td class="idea-cell">
    <p class="idea-text">One-liner, a pitch, an abstract fragment, whatever the idea is.</p>
  </td>
  <td class="link-cell">
    <span class="coming-soon">Coming soon</span>
  </td>
</tr>
```

An idea doesn't have to be text. If it started as an image, drop the image
in `stories/images/` and use it as the idea cell instead:

```html
<tr>
  <td class="idea-cell">
    <img class="idea-thumb" src="stories/images/your-image.jpg" alt="Describe the image." />
  </td>
  <td class="link-cell">
    <span class="coming-soon">Coming soon</span>
  </td>
</tr>
```

**Once the story gets written:**

1. Copy `stories/antarchip.html` (or `stories/chirantanacha-ganj.html` for
   one with a real photo instead of an illustration) as a starting template
   for the new file, e.g. `stories/your-slug.html`.
2. Replace the `<title>`, the `story-title`, the `story-byline`, the
   illustration/photo, and the paragraphs inside `story-body`.
3. Update that idea's row in `index.html`. Swap the "Coming soon" span for
   a link with the story's actual title as the link text:

   ```html
   <td class="link-cell">
     <a class="story-link" href="stories/your-slug.html">The Story's Title</a>
   </td>
   ```

4. Upload the new/changed files through **Add file → Upload files** (or
   GitHub's web file editor) and commit.

Both `styles.css` and `gate.js` are shared. You don't need to duplicate or
change them per story.

## The password gate: what it does and doesn't do

`gate.js` is included on every page. On load it checks
`sessionStorage` for a flag; if unset, it shows a full-screen lock overlay
with a password field. Enter the right password and it sets the
`sessionStorage` flag and reveals the page content. That flag persists for
the rest of the browser tab's session, so you don't have to re-enter the
password when clicking between stories, but it resets when the tab is
closed.

**This is a light deterrent only, not real access control.** The password
is a plain string sitting in `gate.js`, which every visitor's browser
downloads in full. Anyone who opens the browser's dev tools, views page
source, or just looks at the file on GitHub can read it in seconds. It will
stop a casual visitor or a stray search-engine click. It will not stop
anyone who actually wants in, and it does nothing to keep the page out of
search engines or web archives if it's ever linked publicly.

Free GitHub Pages has no server-side component, so there is no way to add
real authentication or per-user access control on this tier. Everything
served is public to anyone with the URL, gate or no gate.

**To swap the password:** just tell me, or edit the `PASSWORD` constant near
the top of `gate.js` and re-upload it.

**If you ever need real access control**, the options are:
- **GitHub Pro or Team** (roughly $4 to $9 per user, per month): lets you
  make the repo private while still serving it via Pages, restricted to
  invited collaborators (their GitHub accounts, not a password).
- **Netlify or Cloudflare Pages on a paid tier**: both offer visitor-level
  password protection or SSO gating enforced at the server/edge, which is
  real access control rather than something a visitor's browser can just
  read past.
