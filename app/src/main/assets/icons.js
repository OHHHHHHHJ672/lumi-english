/* Lumi Icons: unified SVG icon set matching the Lumi visual language.
   24x24 viewBox, 2px stroke, rounded caps. Usage: LumiIcon.html('fire', 20, '#ff6b6b') */
(function (root, factory) {
  const api = factory(root || (typeof window !== 'undefined' ? window : globalThis));
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.LumiIcon = api;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null), function (win) {
  const ICONS = {
    // --- Core stats ---
    fire: '<path d="M12 2c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3.5C10 8 11 7 12 2Z"/><path d="M10 14a2 2 0 0 0 2 2"/>',
    star: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.5 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15Z"/>',
    // --- Navigation ---
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
    book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"/><path d="M5 17a3 3 0 0 1 3-3h11"/><path d="M9 8h6M9 11h4"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-3.5 3-5.5 7-5.5s6.3 2 7 5.5"/>',
    // --- Actions ---
    volume: '<path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 8.5a4 4 0 0 1 0 7"/><path d="M18.5 6a7 7 0 0 1 0 12"/>',
    turtle: '<ellipse cx="12" cy="13" rx="7" ry="5"/><path d="M5 13c0-3 3-5 7-5s7 2 7 5"/><path d="M9 9V7M15 9V7M7 16v2M17 16v2"/><circle cx="10" cy="12" r=".8" fill="currentColor" stroke="none"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    // --- Goals / onboarding ---
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
    airplane: '<path d="M10.5 13.5L3 11l1.5-1.5 6 1.5 4-5.5 2 .5-2.5 5 1.5 6-1.5 1.5-3-4.5-3 1.5-1-1.5 2.5-1Z"/>',
    briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>',
    // --- Learning ---
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    map: '<path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 10.5 3 3 0 0 0 5.5 15 3 3 0 0 0 9 18a2.5 2.5 0 0 0 2.5-2.5V6.5A2.5 2.5 0 0 0 9 4Z"/><path d="M15 4a3 3 0 0 1 3 3v.5a3 3 0 0 1 2 3 3 3 0 0 1-1.5 4.5A3 3 0 0 1 15 18a2.5 2.5 0 0 1-2.5-2.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z"/>',
    seedling: '<path d="M12 20v-7"/><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5Z"/><path d="M12 13c3 0 5-2 5-5-3 0-5 2-5 5Z"/><path d="M5 20h14"/>',
    pencil: '<path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="M13.5 6.5l4 4"/>',
    headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    lightning: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7Z"/>',
    // --- Rewards / shop ---
    gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16"/><path d="M12 9v11"/><path d="M12 9c-1.5-3-5-3-5-1s2 1 5 1ZM12 9c1.5-3 5-3 5-1s-2 1-5 1Z"/>',
    sparkles: '<path d="M12 4l1.2 3.3L16.5 8.5l-3.3 1.2L12 13l-1.2-3.3L7.5 8.5l3.3-1.2L12 4Z"/><path d="M18 14l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/><path d="M6 15l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5Z"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/>',
    gem: '<path d="M7 4h10l4 5-9 11L3 9l4-5Z"/><path d="M3 9h18M9 4l-2 5 5 11M15 4l2 5-5 11"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 5H5a2 2 0 0 0 0 4h3M16 5h3a2 2 0 0 1 0 4h-3"/><path d="M10 13v3h4v-3M8 20h8M12 16v4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
    // --- Settings / misc ---
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    refresh: '<path d="M4 12a8 8 0 0 1 14-5.3L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-14 5.3L4 16"/><path d="M4 20v-4h4"/>',
    mute: '<path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9l5 6M22 9l-5 6"/>',
    magic: '<path d="M15 4l1 2.5L18.5 7.5 16 8.5 15 11l-1-2.5L11.5 7.5 14 6.5 15 4Z"/><path d="M4 20l9-9"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>',
    // --- Brand mark (small Lumi face) ---
    lumiFace: '<circle cx="12" cy="12" r="9" fill="#FFD36E" stroke="none"/><circle cx="9" cy="11" r="1.5" fill="#20294B" stroke="none"/><circle cx="15" cy="11" r="1.5" fill="#20294B" stroke="none"/><path d="M9.5 14c1 1.5 4 1.5 5 0" stroke="#FF8E74" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
  };

  function html(name, size, color) {
    const paths = ICONS[name] || ICONS.spark;
    const px = size ? `width="${size}" height="${size}"` : '';
    const fill = color ? `stroke="${color}"` : '';
    return `<svg class="lumi-icon lumi-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${px} ${fill} aria-hidden="true">${paths}</svg>`;
  }

  function exists(name) { return !!ICONS[name]; }
  function list() { return Object.keys(ICONS); }

  return { html, exists, list, ICONS };
});
