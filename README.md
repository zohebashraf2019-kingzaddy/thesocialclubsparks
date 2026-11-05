# The Social Club | Sparks — Website

Club website for **The Social Club**, 906 Victorian Ave, Sparks NV (21+).
Static HTML/CSS/JS + one Vercel function for the contact form. No build step.

## Pages
- `index.html` — hero, featured night (RNB Reno + countdown), upcoming events, experience & drinks, video wall, gallery preview, private-events CTA, hours + map
- `events.html` — monthly calendar + upcoming / past lists
- `gallery.html` — filterable photo gallery + reels
- `contact.html` — private events / bottle service inquiry form + FAQ

## Updating content — edit `js/data.js` only
- **New event:** add an object to `SC.events` (date `YYYY-MM-DD`, `status`: `on-sale` | `sold-out` | `door-only` | `free` | `info`, `featured: true` for the home-page headline). Past events move to "Past Nights" automatically.
- **New photos:** put images in `assets/img/gallery/` and add a line to `SC.gallery`.
- **New reels:** put `.mp4` in `assets/video/` (+ a poster `.jpg` in `assets/img/`) and add to `SC.reels`.
- **Logo:** replace `assets/img/logo-white.png` (white logo on transparent background).
- **Phone / email / socials:** `SC.info`.

Compress videos before adding:
`ffmpeg -i in.mp4 -vf scale=720:-2 -c:v libx264 -preset veryfast -crf 28 -c:a aac -b:a 96k -movflags +faststart out.mp4`

## Deploy (Vercel)
Import the repo in Vercel → Framework: **Other** → no build command → Deploy.

Contact form emails (optional) — add env vars, then redeploy:
- `RESEND_API_KEY` — from resend.com
- `CONTACT_TO` — inbox that receives inquiries
- `CONTACT_FROM` — optional verified sender, e.g. `The Social Club <events@yourdomain.com>`

Without them, the form falls back to the visitor's email app (if `SC.info.email` is set) or copies the message and opens Instagram DMs.
