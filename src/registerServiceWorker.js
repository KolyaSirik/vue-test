// eslint-disable-next-line import/no-extraneous-dependencies
import { Workbox } from 'workbox-window';
// eslint-disable-next-line import/no-mutable-exports
let wb;
let swRegistration;

const applicationServerPublicKey = 'BDS8OZ5C7T6cg3tN7S1MfB6kuEQjZ_'
  + 'dO39gcxon_DNpOS2NLO_4bSgKc4M8d3Aw3HjelKckeTi9SiPOuX7wL7CU';

function urlB64ToUint8Array(base64String) {
  // eslint-disable-next-line no-mixed-operators
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateSubscriptionOnServer(subscription) {
  fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log('Failed to subscribe the user: ', err);
    });
}

function initializeUI() {
  // Set the initial subscription value
  if (swRegistration.pushManager) {
    swRegistration.pushManager.getSubscription()
      .then((subscription) => {
        if (!subscription) {
          subscribeUser();
        } else {
          updateSubscriptionOnServer(subscription);
        }
      });
  }
}

if ('serviceWorker' in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}sw.js`);

  wb.addEventListener('controlling', () => {
    window.location.reload();
  });

  wb.register().then((sw) => {
    swRegistration = sw;
    initializeUI();
  });
} else {
  wb = null;
}

export default wb;
