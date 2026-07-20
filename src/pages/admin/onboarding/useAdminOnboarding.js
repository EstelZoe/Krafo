import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const STORAGE_KEY = 'adminOnboardingSeen';
const REPLAY_FLAG_KEY = 'adminOnboardingReplay';

const log = (...args) => console.info('[onboarding]', ...args);

// Module-level guard — survives React StrictMode's double-mount and any
// remounts that happen during a single page lifetime. Reset only on full
// page reload (which is exactly what replayAdminOnboarding triggers).
let hasLaunchedThisPage = false;

const buildSteps = ({ firstName, isSuperAdmin }) => {
  const helpHTML = `
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280;">
      Need help? <strong>Contact admin</strong>
    </div>`;

  const steps = [
    {
      element: '[data-tour="welcome"]',
      popover: {
        title: `Welcome${firstName ? `, ${firstName}` : ''} \uD83D\uDC4B`,
        description: `This is the Krafo Admin console. Take a quick tour to learn what each section does. You can replay this anytime from your profile page.${helpHTML}`,
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '[data-tour="content-nav"]',
      popover: {
        title: 'Content Management',
        description: 'Manage what visitors see on the public site \u2014 events, blog posts and homepage popups.',
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '[data-tour="toolkit-nav"]',
      popover: {
        title: 'Assessment Toolkit',
        description: 'Review submitted assessments, send reminder emails, and create promo codes for the cyber risk toolkit.',
        side: 'right',
        align: 'start',
      },
    },
  ];

  if (isSuperAdmin) {
    steps.push({
      element: '[data-tour="superadmin-nav"]',
      popover: {
        title: 'Super Admin',
        description: 'Invite admins, view audit logs, transfer the super admin role, and change your own password. Only you can see this section.',
        side: 'right',
        align: 'start',
      },
    });
  }

  steps.push(
    {
      element: '[data-tour="view-site"]',
      popover: {
        title: 'View Site',
        description: 'Opens the public site in a new tab so you can preview changes.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="profile-menu"]',
      popover: {
        title: 'Your Profile',
        description: 'Click here to upload a profile photo, edit your name, or sign out.',
        side: 'bottom',
        align: 'end',
      },
    },
    {
      element: '[data-tour="welcome"]',
      popover: {
        title: "You're all set",
        description: `Explore each section at your own pace. You can replay this tour from <strong>My Profile</strong> at any time.${helpHTML}`,
        side: 'bottom',
        align: 'start',
      },
    }
  );

  return steps;
};

/**
 * Wait for at least one anchor to appear in the DOM, then resolve.
 * Tries up to `maxAttempts` times with `delayMs` between checks.
 */
const waitForAnchors = (selectors, { maxAttempts = 20, delayMs = 100 } = {}) =>
  new Promise((resolve) => {
    let attempts = 0;
    const tick = () => {
      attempts += 1;
      const found = selectors.filter((s) => document.querySelector(s));
      if (found.length > 0 || attempts >= maxAttempts) {
        resolve(found);
        return;
      }
      setTimeout(tick, delayMs);
    };
    tick();
  });

/**
 * Auto-launches the admin onboarding tour on first visit to /admin
 * (after any forced password change is complete). The hook is mounted inside
 * AdminLayout so the data-tour anchors render in the same tree.
 */
export function useAdminOnboarding() {
  const location = useLocation();

  useEffect(() => {
    log('hook fired, pathname =', location.pathname);
    if (hasLaunchedThisPage) {
      log('skip: tour already launched this page lifetime');
      return;
    }
    // Allow both '/admin' and '/admin/' (trailing slash variants).
    const isDashboardRoot = location.pathname === '/admin' || location.pathname === '/admin/';
    if (!isDashboardRoot) {
      log('skip: not on dashboard root (path =', location.pathname, ')');
      return;
    }

    let user = null;
    try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch { /* noop */ }
    if (!user) {
      log('skip: no user in localStorage');
      return;
    }
    if (user.mustChangePassword) {
      log('skip: user must change password first');
      return;
    }

    const replayRequested = localStorage.getItem(REPLAY_FLAG_KEY) === 'true';
    const alreadySeen = localStorage.getItem(STORAGE_KEY) === 'true';

    if (alreadySeen && !replayRequested) {
      log('skip: tour already seen on this browser');
      return;
    }

    if (replayRequested) localStorage.removeItem(REPLAY_FLAG_KEY);

    // Set the launch guard *now* so the StrictMode double-mount doesn't
    // queue a second start. We deliberately do NOT tear this down in cleanup —
    // module state survives remounts within the same page load.
    hasLaunchedThisPage = true;

    const start = async () => {
      const allSteps = buildSteps({
        firstName: user.firstName,
        isSuperAdmin: user.role === 'superadmin',
      });

      const selectors = allSteps.map((s) => s.element);
      await waitForAnchors(selectors);

      const steps = allSteps.filter((s) => document.querySelector(s.element));
      log('starting tour with', steps.length, 'of', allSteps.length, 'steps');

      if (steps.length === 0) {
        log('no anchors found, giving up');
        hasLaunchedThisPage = false; // allow retry on next mount
        return;
      }

      const tour = driver({
        showProgress: true,
        allowClose: true,
        animate: true,
        smoothScroll: true,
        stagePadding: 6,
        stageRadius: 8,
        overlayOpacity: 0.7,
        progressText: '{{current}} of {{total}}',
        doneBtnText: 'Done',
        nextBtnText: 'Next',
        prevBtnText: 'Back',
        onDestroyed: () => {
          log('tour finished');
          localStorage.setItem(STORAGE_KEY, 'true');
        },
        steps,
      });

      requestAnimationFrame(() => tour.drive());
    };

    start();

    // Intentionally no cleanup — we want the tour to survive React's
    // StrictMode dev double-mount. The user can dismiss it manually.
  }, [location.pathname]);
}

/**
 * Programmatic replay used by the "Replay tour" button.
 * Sets a one-shot flag, then forces a full reload so the hook re-evaluates
 * with a clean state and fires regardless of the seen-flag.
 */
export function replayAdminOnboarding() {
  localStorage.setItem(REPLAY_FLAG_KEY, 'true');
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = '/admin';
}
