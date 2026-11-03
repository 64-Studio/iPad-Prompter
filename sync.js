// Sync layer: Firebase Realtime DB when configured, otherwise local test mode (BroadcastChannel).
import { FIREBASE_CONFIG } from './config.js';

const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';

export async function connect(room) {
  if (FIREBASE_CONFIG && FIREBASE_CONFIG.databaseURL) {
    const { initializeApp } = await import(FB + 'firebase-app.js');
    const { getDatabase, ref, onValue, update } = await import(FB + 'firebase-database.js');
    const db = getDatabase(initializeApp(FIREBASE_CONFIG));
    const r = (p) => ref(db, `rooms/${room}/${p}`);
    return {
      mode: 'online',
      on: (path, cb) => onValue(r(path), (s) => cb(s.val())),
      set: (path, obj) => update(r(path), obj),
      onConnection: (cb) => onValue(ref(db, '.info/connected'), (s) => cb(!!s.val())),
    };
  }

  // Local test mode: same browser, two tabs.
  const key = 'prompter-' + room;
  const bc = new BroadcastChannel(key);
  const load = () => JSON.parse(localStorage.getItem(key) || '{}');
  const listeners = {};
  bc.onmessage = (e) => (listeners[e.data] || []).forEach((cb) => cb(load()[e.data] ?? null));
  return {
    mode: 'local',
    on(path, cb) { (listeners[path] ||= []).push(cb); cb(load()[path] ?? null); },
    set(path, obj) {
      const s = load(); s[path] = { ...(s[path] || {}), ...obj };
      localStorage.setItem(key, JSON.stringify(s));
      bc.postMessage(path);
      (listeners[path] || []).forEach((cb) => cb(s[path]));
    },
    onConnection: (cb) => cb(true),
  };
}

export const getRoom = () => new URLSearchParams(location.search).get('room');
