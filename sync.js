// Sync layer: Firebase Realtime DB when configured, otherwise local test mode (BroadcastChannel).
// on(path, cb)      -> value now, then on every change (state, status)
// onEvent(path, cb) -> only changes from now on, never the stored old value (cmd, jog)
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
      onEvent: (path, cb) => { let first = true; onValue(r(path), (s) => { if (first) { first = false; return; } cb(s.val()); }); },
      set: (path, obj) => update(r(path), obj),
      onConnection: (cb) => onValue(ref(db, '.info/connected'), (s) => cb(!!s.val())),
    };
  }

  // Local test mode: same browser, two tabs.
  const key = 'prompter-' + room;
  const bc = new BroadcastChannel(key);
  const load = () => JSON.parse(localStorage.getItem(key) || '{}');
  const values = {}, events = {};
  bc.onmessage = (e) => {
    const v = load()[e.data] ?? null;
    (values[e.data] || []).forEach((cb) => cb(v));
    (events[e.data] || []).forEach((cb) => cb(v));
  };
  return {
    mode: 'local',
    on(path, cb) { (values[path] ||= []).push(cb); cb(load()[path] ?? null); },
    onEvent(path, cb) { (events[path] ||= []).push(cb); },
    set(path, obj) {
      const s = load(); s[path] = { ...(s[path] || {}), ...obj };
      localStorage.setItem(key, JSON.stringify(s));
      bc.postMessage(path);
      (values[path] || []).forEach((cb) => cb(s[path]));
      (events[path] || []).forEach((cb) => cb(s[path]));
    },
    onConnection: (cb) => cb(true),
  };
}

export const getRoom = () => new URLSearchParams(location.search).get('room');
