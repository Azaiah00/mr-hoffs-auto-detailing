# Launch notes — Mr. Hoff's Auto Detailing

Everything below must be confirmed with Dean Hoffman before the site goes live.

## Facts to confirm
- **Business name and spelling** on the site: "Mr. Hoff's Auto Detailing" (Facebook uses "MR.HOFFS AUTO DETAILING"; the press piece uses "Mr. Hoffs Auto Detailing"). Confirm the preferred form.
- **Hours:** Monday to Friday, 6:00 AM to 2:30 PM; closed weekends. The site says the shop "opens early". Confirm exact times and whether early drop-off at 6 AM is welcome.
- **Google rating:** 5.0 from 81 reviews (shown in the trust strip, quick facts, about page and home-page `aggregateRating` schema). Re-check the live count before launch and update it periodically.
- **Press feature:** shown as "Voted Best Car Detailer" / "No. 1 in a local reader poll" without naming the publication. Confirm the **publication name and year** (the clipping does not show them), then consider naming it and adding the year. Get permission to display the clipping photo.
- **"Nearly 40 years in the same location"** (from the Facebook bio and press). Confirm the founding year if Dean wants a specific number.
- **Licensed and insured** — their own claim from Facebook; confirm it is current.
- **Review theme paraphrase:** "Reviewers describe him as one of those business owners you end up thinking of as family." Confirm this reflects actual reviews (it is a paraphrase, not a quote).
- **Service list and "Generally includes" bullets** on services.html are written in general terms. Confirm each service is offered and adjust the bullets to match exactly what Dean does (for example: interior shampooing, engine bays, headlight work).
- **Ceramic coating copy** is general education only. No brands, durations or warranties are stated. Confirm Dean is comfortable with the care tips (hand wash, avoid brush washes, microfiber dry).
- **"Call ahead" to book:** confirm whether walk-ins are accepted, and whether deposits are required for ceramic work. Add an FAQ answer if so.
- **Texting:** the site includes an `sms:` link to (804) 355-4633. Confirm the number can receive texts; if it is a landline, remove the "Send a text" links (index quick facts, contact page).
- **Photo captions:** "Two trucks after a detail, one wearing the MR HOFFS plate" and "The vintage MR HOFFS Virginia plate". Confirm.
- **Logo (supplied by Couture House).** The header, footer, icons and schema use a new round "MR. HOFF'S Auto Detailing, Richmond, VA" badge (classic car and water drop). Files in assets/img: `mr-hoffs-logo.webp`, `mr-hoffs-logo.png` (schema), plus favicon and app icons. The ribbon behind the name was filled white so it reads on the dark site. Dean has not seen it yet. Confirm he approves it, or ask for his own logo and original vector files for signage and print.
- **Service area:** schema lists Richmond, VA and Greater Richmond. Add specific neighborhoods/counties Dean serves if desired.

## Photo credits and licensing
All photos come from the business's own public Facebook page and must be approved/licensed by the owner before launch:
- `white-tesla-model-y-detailed.webp` — white Tesla Model Y in the shop bay
- `detailed-trucks-mr-hoffs-plate.webp` — two detailed pickup trucks (MR HOFFS / JUS HOFF plates visible)
- `mr-hoffs-virginia-vanity-plate.webp` — vintage MR HOFFS Virginia plate
- `best-car-detailer-press-clipping.webp` — printed reader-poll page (publication copyright: get permission to reproduce, or replace with a typeset quote only)
Other visuals (water-beading panel, rosette badge, line illustrations, light reflections) are original SVG created for this site.

## Items to swap / add after launch
- More photos: before/after shots, the shop exterior and sign, Dean at work (with permission), ceramic water-beading close-ups. Photos are currently thin (4 unique images).
- Real Google Business Profile link (add to `sameAs` in JSON-LD and the footer) and a "Leave a review" link.
- Consider adding `geo` coordinates to the JSON-LD once confirmed from the Google Business Profile.
- Update `lastmod` in `sitemap.xml` when content changes.

## Forms
- The quote form (`contact.html`) is a Netlify Form (`name="quote"`, honeypot `company-website`, optional photo upload up to 8 MB). It only works once deployed on Netlify. In Netlify > Forms, set up an email notification to the shop. Netlify's free tier includes a monthly submission and file-upload allowance.
- Local preview cannot submit the form; the page shows a friendly "please call" message instead.

## Domain
- Proposed domain: **mrhoffsdetailing.com** (check availability and register). Used in canonical, OG, sitemap, llms.txt and JSON-LD.
- Footer credit: "Website concept by Couture House Co." linking to https://couturehouse.co.
