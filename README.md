# Tabber — website

The marketing, support, and privacy site for [Tabber](https://github.com/KyleMThornton/Tabber),
an iPhone bill-splitting app. Static HTML and CSS, no build step, no dependencies —
push it and GitHub Pages serves it.

The palette, type ramp, and receipt-paper motif are lifted from the app's
`Theme.swift` so the site and the app read as one product — with one deliberate
exception, the dim text tones, explained under "Things worth knowing" below.

## The three URLs App Store Connect asks for

The site is live at **https://tabberapp.github.io/**. These are the values to paste
into App Store Connect:

| Field in App Store Connect | URL |
| --- | --- |
| **Privacy Policy URL** (App Information) | `https://tabberapp.github.io/privacy.html` |
| **Support URL** (Version information) | `https://tabberapp.github.io/support.html` |
| **Marketing URL** (Version information, optional) | `https://tabberapp.github.io/` |
