const symbols: Record<string, string> = {
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  printer: '<path d="M6 9V3h12v6M6 17H3V9h18v8h-3M6 14h12v7H6zM17 11h1"/>',
  jar: '<path d="M8 3h8v4H8zM8 7C4 10 4 19 7 21h10c3-2 3-11-1-14M6 12h12M7 17h10"/>',
  paw: '<ellipse cx="7" cy="7" rx="2" ry="3"/><ellipse cx="17" cy="7" rx="2" ry="3"/><ellipse cx="3" cy="12" rx="1.5" ry="2.5"/><ellipse cx="21" cy="12" rx="1.5" ry="2.5"/><path d="M6 19c0-8 12-8 12 0 0 4-4 1-6 1s-6 3-6-1Z"/>',
  lantern: '<path d="M9 2h6M12 2v3M9 19h6M12 19v3"/><rect x="5" y="5" width="14" height="14" rx="6"/><path d="M9 6v12M15 6v12"/>',
  stamp: '<path d="M4 17h16v4H4zM7 17v-4l3-2V4h4v7l3 2v4M8 4h8"/>',
  market: '<path d="M3 9 5 3h14l2 6M3 9v3h6V9M9 9v3h6V9M15 9v3h6V9M5 12v9h14v-9M9 21v-6h6v6"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8 8 13 13M8 16 21 3M14 10l-4 4"/>',
  thread: '<path d="M6 3h12M6 21h12M8 3v18M16 3v18M8 7l8 3-8 4 8 3"/>',
  bowl: '<path d="M3 11h18c0 7-5 10-9 10S3 18 3 11ZM7 7V3M12 7V2M17 7V3"/>',
  lamp: '<path d="M12 2 6 6h12l-6-4ZM7 6l1 7h8l1-7M12 13v8M8 22h8M10 7v5M14 7v5"/>',
  tea: '<path d="M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM17 9h2a3 3 0 0 1 0 6h-2M7 4V2M12 4V2M2 22h19"/>',
  building: '<path d="M3 21h18M5 21V5h14v16M3 5l9-3 9 3M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4"/>',
};
export function pinSvg(icon: string) {
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[icon] || symbols.building}</svg>`;
}
export function PinSymbol({ icon }: { icon: string }) {
  // Fixed, code-owned vector paths only; never user-provided markup.
  return <span className="pin-symbol" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pinSvg(icon) }} />;
}
