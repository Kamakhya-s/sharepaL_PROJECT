# GearLoop – Gaming & Gadget Rental Storefront

A static, original-branded rental storefront built with plain HTML, CSS and JavaScript. No build step or dependencies.

## Run it
Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Features
- City selector (filters products available per city, remembered in the browser)
- Category chips, search and sorting
- Product cards with day / week / month pricing
- Product modal with duration presets, custom day stepper, start date and live price summary
- Tiered pricing (daily < 7 days, weekly rate for 7–29 days, monthly rate for 30+)
- Cart drawer with refundable deposit and delivery fee logic (free above ₹999)
- Checkout form with validation, order saved to `localStorage`, WhatsApp share link
- FAQ accordion, how-it-works, footer, fully responsive

## Files
- `index.html` – markup
- `styles.css` – all styling
- `data.js` – cities, categories, products, FAQ (edit this to change the catalog)
- `app.js` – all behaviour

## Customising
- Rename the brand: search for "GearLoop" in `index.html`.
- Change colors: edit the CSS variables at the top of `styles.css`.
- Add products: append objects to `GL_PRODUCTS` in `data.js`.
# sharepaL_PROJECT
