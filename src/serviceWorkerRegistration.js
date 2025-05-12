import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.PUBLIC_URL}/service-worker.js`, {
    ready() {
      console.log('App is being served cache-first by a service worker.');
    },
    registered(registration) {
      console.log('Service worker has been registered.');
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // Check for updates every hour
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}