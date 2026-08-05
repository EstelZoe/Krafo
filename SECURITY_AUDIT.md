# Krafo Systems — Security Audit & Hardening Report

**Date:** 4 August 2026
**Scope:** Public website (React), Admin & Super-Admin dashboards, and the Krafo API backend (`krafo_api`, Node/Express/MongoDB).
**Type:** Authorised internal review of our own systems.

---

## 1. In Plain English (for everyone)

We asked a simple question: *"Can our website and admin dashboards be broken into using the common attacks — like someone injecting malicious code or hijacking the login?"*

**The short answer: our system was already in good shape, and we've now closed the main gap we found.**

Think of the website like a building:

- **The locks on the doors were already strong.** Admin accounts need a password *and* a one-time code (like your bank's OTP). Passwords are stored scrambled so even we can't read them. Every admin door checks your ID badge before letting you in.
- **The mailroom already screens packages.** Anything a visitor types into the site is inspected and cleaned before it's stored or shown, so attackers can't sneak in hidden commands.
- **The one weakness:** there was no limit on how many times someone could *try* the front-door lock. An attacker could keep guessing passwords or codes over and over. **We've now added a limit** — too many rapid attempts and that person is temporarily blocked.
- **We also added a set of "safety signs and barriers" to the public site** (technical name: security headers) that tell browsers to refuse common tricks like loading our site inside a fake page, or running unapproved code.

**Bottom line:** No change to how the site looks or works for real users. Attackers now have far fewer ways in.

---

## 2. What We Checked and What We Found (for the security reader)

Legend: ✅ already secure · 🔧 fixed in this pass · 🔭 recommended next

### Injection attacks
| Area | Status | Detail |
|------|--------|--------|
| SQL injection | ✅ N/A | Stack is MongoDB, not SQL. |
| NoSQL / operator injection | ✅ | `customMongoSanitize` strips keys starting with `$` or containing `.` from `req.body`, `req.params`, `req.query`. Mongoose schemas enforce types. |
| Cross-Site Scripting (XSS) — stored/reflected | ✅ | Server runs the `xss` library over string inputs; blog HTML is additionally sanitised with **DOMPurify** at render time on the frontend. |
| XSS — defence-in-depth | 🔧 | Added a **Content-Security-Policy** to the public site so that even if a sanitiser were bypassed, the browser blocks unauthorised script execution. |

### Authentication & session
| Control | Status | Detail |
|---------|--------|--------|
| Password storage | ✅ | `bcrypt`, cost factor 12. Hashing enforced in a Mongoose pre-save hook. |
| Admin 2FA | ✅ | Admin/super-admin logins require an email OTP as a second step. |
| OTP brute force | ✅ | Account locks for 15 minutes after 5 failed OTP attempts. |
| JWT handling | ✅ | Signed with a server secret; 7-day session expiry, 15-min reset-token expiry. The user's role is re-read from the database on every request, so a stolen/old token cannot escalate privileges. |
| Brute force / credential stuffing on login | 🔧 | **Was unprotected.** Added IP-based rate limiting: 20 attempts / 15 min on login & signup; 10 / 15 min on OTP verify, forgot-password, and reset-password (main site *and* Assessment Toolkit). |
| Token storage location | 🔭 | JWT is kept in browser `localStorage`. Robust today given strong XSS defences, but an `httpOnly` cookie would be stronger. Deferred (coordinated FE+BE change). |

### Authorisation (Admin / Super-Admin)
| Control | Status | Detail |
|---------|--------|--------|
| Route protection | ✅ | Every `/admin` route chains `protect` (valid token) + `isAdmin`; every `/superadmin` route chains `protect` + `isSuperAdmin`. Enforced **server-side** — the client-side check is cosmetic only. |
| Disabled accounts | ✅ | Tokens for deactivated accounts are rejected immediately. |
| Super-admin transfer | ✅ | Requires dual OTP confirmation from both the current and the incoming super-admin. |
| Audit logging | ✅ | Admin auth events (success, failure, lockout) are recorded. |

### Platform / configuration
| Control | Status | Detail |
|---------|--------|--------|
| API security headers | ✅ | `helmet` enabled with a Content-Security-Policy (allows Cloudinary images). |
| CORS | ✅ | Locked to an allow-list of Krafo domains; not a wildcard in production. |
| HTTPS | ✅ | Forced via 301 redirect at the web server. |
| Secrets exposure | ✅ | Frontend env only holds the public API URL. No secrets shipped to the browser. |
| Error handling | ✅ | Stack traces and internal details are hidden in production responses. |
| Correct client IP behind proxy | 🔧 | Added `trust proxy = 1` so rate limiting and audit logs see the real visitor IP, not the hosting proxy. |
| Public website security headers | 🔧 | **Were missing.** Added HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. |

---

## 3. Exactly What Changed in This Pass

### Backend (`krafo_api`)
- **New:** `middlewares/rateLimiter.js` — two IP-based limiters (`loginLimiter`, `sensitiveAuthLimiter`).
- **Changed:** `routes/auth_routes.js` and `routes/assessment/assessment_auth_routes.js` — limiters applied to login, signup/register, OTP verification, forgot-password, and reset-password.
- **Changed:** `index.js` — `app.set('trust proxy', 1)` for correct client-IP resolution behind the cPanel/Passenger proxy.

### Frontend
- **Changed:** `public/.htaccess` — added a security-headers block:
  - `Strict-Transport-Security` (force HTTPS for a year)
  - `Content-Security-Policy` (tuned to our real dependencies: same-origin code, Cloudinary images, YouTube embeds, the API domain)
  - `X-Frame-Options: SAMEORIGIN` (anti-clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (disables camera, mic, geolocation, etc.)

---

## 4. Recommended Next Steps (not yet done)

1. **Move the login token from `localStorage` to an `httpOnly`, `Secure`, `SameSite` cookie.** Removes the risk of token theft via any future XSS. Requires coordinated frontend + backend changes plus CSRF protection.
2. **Optional global API rate limiter** — a generous cap across all endpoints to blunt scraping/abuse, tuned so it doesn't throttle normal use.
3. **Deployment test for the CSP.** Because a Content-Security-Policy can block a legitimate embed if one was missed, test the built site (YouTube videos, blog images, Calendly/Paystack links, admin login) before publishing. If a new third-party tool (analytics, chat widget, payment iframe) is added later, its domain must be added to the matching CSP rule.

---

## 5. Overall Assessment

The Krafo platform demonstrates a **strong baseline security posture** — bcrypt password hashing, admin 2FA with lockout, server-enforced role authorisation, input sanitisation against both NoSQL injection and XSS, a CORS allow-list, and hardened error handling were already in place. The primary gap — **absence of rate limiting on authentication endpoints** — has been remediated, and the public site has been hardened with a full set of browser security headers.

No known high-severity issues remain open. The one medium-term recommendation (cookie-based token storage) is a hardening improvement rather than an active vulnerability.
