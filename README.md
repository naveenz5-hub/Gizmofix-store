# GizmoFix starter website

This is a mobile-friendly static storefront starter. It includes:
- Responsive product catalogue
- Add-to-cart interactions and quantity changes
- Cart subtotal
- A demo checkout/enquiry dialog
- No paid service, framework, build step, or API key required to run locally

## Important limitations
This is **not yet a live ecommerce checkout**:
- Product names, images, and prices are demo placeholders.
- The demo does not accept payments, create orders, calculate real shipping/tax, or send customer details to a server.
- The browser-only cart is not a reliable order database.
- Do not advertise or accept real customer orders until product costs, supplier fulfilment, refund/return terms, legal requirements, and secure payment processing are set up.

## Files
- `index.html` — page structure
- `styles.css` — design and responsive layout
- `app.js` — product data and cart behaviour

## Open it on Android
The easiest way to test it on a phone is to upload these files to a free static host such as GitHub Pages or Cloudflare Pages, using the host's current free-tier terms. You can also open `index.html` in a browser from a file manager, although some browser features can behave differently from a hosted site.

## Change demo products
Edit the `products` array at the top of `app.js`. For each product, update `name`, `price`, `tag`, `description`, and `image`. Use product photos you own or have permission to use. Replace demo prices only after confirming supplier and delivery costs.

## Next production steps
1. Verify a supplier and obtain written costs, shipping timelines, return/RTO policy, and payment terms.
2. Add a backend to store orders safely.
3. Choose a supported payment gateway and complete its KYC/onboarding.
4. Create privacy, shipping, refund, return, and contact pages.
5. Test a complete order and refund before accepting real customers.
