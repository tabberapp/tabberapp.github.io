# Tabber — website

The marketing, support, and privacy site for [Tabber](https://github.com/KyleMThornton/Tabber),
an iPhone bill-splitting app. Static HTML and CSS, no build step, no dependencies —
push it and GitHub Pages serves it.

The palette, type ramp, and receipt-paper motif are lifted from the app's
`Theme.swift` so the site and the app read as one product.

## The three URLs App Store Connect asks for

Once Pages is live at `https://kylemthornton.github.io/tabber-site/`, these are the
values to paste into App Store Connect:

| Field in App Store Connect | URL |
| --- | --- |
| **Privacy Policy URL** (App Information) | `https://kylemthornton.github.io/tabber-site/privacy.html` |
| **Support URL** (Version information) | `https://kylemthornton.github.io/tabber-site/support.html` |
| **Marketing URL** (Version information, optional) | `https://kylemthornton.github.io/tabber-site/` |

Privacy Policy URL and Support URL are both required for submission. Marketing URL is
optional but free to fill in.

## Publishing it

```bash
cd ~/Dev/tabber-site
git init
git add -A
git commit -m "Add the Tabber website"
gh repo create tabber-site --public --source=. --push
```

Then in the repo on GitHub: **Settings → Pages → Build and deployment → Source:
Deploy from a branch**, branch `main`, folder `/ (root)`. The first deploy takes a
minute or two.

The repo has to be **public** for GitHub Pages on a free plan. That's fine here —
nothing in this repo is private, and it's separate from the app repo, which stays
private.

## Going live on the App Store

The download buttons currently render as a non-clickable "Coming to the App Store"
chip. To turn every one of them into a real link, set one variable in
[`js/site.js`](js/site.js):

```js
var APP_STORE_URL = 'https://apps.apple.com/app/tabber/id1234567890';
```

That's the only change needed — the nav button, the hero button, and the closing CTA
all read from it, on every page.

## Structure

```
index.html      Landing page — pitch, how it works, privacy, the math, requirements
privacy.html    Privacy policy (Apple requires this URL)
support.html    Support page: compatibility, FAQ, troubleshooting, contact (Apple requires this URL)
404.html        Not-found page
css/styles.css  Everything. Tokens at the top mirror Theme.swift
js/site.js      App Store link, email assembly, scroll reveals. Progressive enhancement only
fonts/          Geist + Geist Mono as woff2, converted from the app's bundled TTFs
assets/         App icon, used as favicon and share image
.nojekyll       Tells Pages to serve the files as-is rather than running Jekyll
```

Every page works with JavaScript disabled. The pages are plain HTML; `js/site.js` only
upgrades things (reveals, the mailto link, the year in the footer).

## The contact address

`tabberappsupport@gmail.com`, assembled in JavaScript at runtime rather than sitting in
the HTML source, with a `<noscript>` fallback showing the same address in a
`name [at] host [dot] com` form. This is a speed bump for naive scrapers, not real
protection.

To change it, edit `MAIL_USER` / `MAIL_HOST` in `js/site.js` **and** the three
`<noscript>` fallbacks (two in `support.html`, one in `privacy.html`).

## Things worth knowing

- **The site is dark-only**, matching the app, which forces `.preferredColorScheme(.dark)`.
  There's no light palette to maintain.
- **The app mockups are CSS, not screenshots.** When you have real App Store screenshots,
  they'd slot into the hero nicely — but CSS mockups stay correct when the app's colours
  change, and they're sharp at any size.
- **The example split is arithmetically real.** $120.00 subtotal, $10.20 tax, $24.00 tip,
  $154.20 total, with tax and tip prorated by share of subtotal — the four per-person
  figures sum to exactly $154.20. If you edit one number, edit them all.
- **Fonts are self-hosted**, ~293 KB total for six faces. Geist and Geist Mono are used
  under the SIL Open Font License; the licence travels with them in `fonts/OFL.txt`.

## Custom domain (optional, later)

If you ever point a domain at this: add a `CNAME` file containing the bare domain,
set the DNS records GitHub lists under Settings → Pages, then update the three URLs in
App Store Connect to match.
