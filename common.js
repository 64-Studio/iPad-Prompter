// Shared drawing helpers: seven-segment digits (countdown + mark) and icons.
// Segment geometry matches the design system's Countdown component (viewBox 72 x 132).
export const SEG = {
  a: [12, 0, 48, 14], g: [12, 59, 48, 14], d: [12, 118, 48, 14],
  f: [0, 10, 14, 48], b: [58, 10, 14, 48], e: [0, 74, 14, 48], c: [58, 74, 14, 48],
};
export const GLYPH = { '3': 'abcdg', '2': 'abged', '6': 'afgedc', '4': 'fgbc', G: 'afedc', O: 'abcdef', ' ': '' };

// Countdown digit: all seven segments, lit ones get class "on" (set later by setDigit).
export const digitInner = () =>
  Object.entries(SEG).map(([k, r]) => `<rect class="p-seg" data-k="${k}" x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="7"/>`).join('');

export function setDigit(svg, ch) {
  svg.classList.toggle('is-off', ch === '-');
  svg.querySelectorAll('.p-seg').forEach((s) => s.classList.toggle('on', ch !== '-' && GLYPH[ch].includes(s.dataset.k)));
}

// The app mark: a seven-segment 64, white, lit segments only. Never recoloured, never live.
export function markSvg(height = 32) {
  const lit = (ch, dx) => [...GLYPH[ch]].map((k) => { const r = SEG[k]; return `<rect x="${r[0] + dx}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="7" fill="#fff"/>`; }).join('');
  return `<svg class="mark" role="img" aria-label="Prompter" viewBox="0 0 160 132" height="${height}" width="${Math.round(height * 160 / 132)}">${lit('6', 0)}${lit('4', 88)}</svg>`;
}

const I = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
export const ICON = {
  play: I('<path d="M8 5l11 7-11 7z"/>'),
  pause: I('<path d="M9 5v14M15 5v14"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  minus: I('<path d="M5 12h14"/>'),
  top: I('<path d="M6 4h12M12 20V9M7 14l5-5 5 5"/>'),
  look: I('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'),
  close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
  check: I('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  wait: I('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
  off: I('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.2v.1"/>'),
  grip: I('<path d="M8 9h8M8 15h8M12 4l-3 3M12 4l3 3M12 20l-3-3M12 20l3-3"/>'),
  updown: I('<path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4"/>'),
  up: I('<path d="M6 15l6-6 6 6"/>'),
  down: I('<path d="M6 9l6 6 6-6"/>'),
};
