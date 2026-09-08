# HAPI 1KM v2.1 implementation notes

The existing brand PNGs, principal fonts and root palette are retained. Patrick Hand SC is used only for a short English label, as specified in the supplied plan. Long-form copy uses Noto Sans TC and system fallbacks.

## Real map sources

- The bundled `public/maps/hk-districts.geojson` is the [Home Affairs Department's district-boundary dataset](https://data.gov.hk/en-data/dataset/hk-had-json1-hong-kong-administrative-boundaries), retrieved 8 September 2026. It contains all 18 administrative districts, including their maritime boundaries; these are not land-only shapes.
- The base style comes from [OpenFreeMap Liberty](https://openfreemap.org/quick_start/). `lib/map-style.ts` recolours its real OpenStreetMap streets, coastlines and building footprints without changing geometry. Labels switch language where that language exists in the source. Building heights are source data, not surveyed HAPI measurements.
- OpenFreeMap's public service currently permits commercial use without registration or an API key, but has no SLA. Tiles, sprites and glyphs require internet access. Attribution is visible on the map. A user-triggered standard OSM raster fallback and a fully usable list view handle unavailable vector tiles or WebGL.
- Numbered public premises were matched to the government's [Address Lookup Service](https://data.gov.hk/en-data/dataset/hk-dpo-als_01-als) on 8 September 2026. Matching street and building numbers, not just the first result, were checked. A false Man Wa Lane / Tai Po match was rejected.
- Man Wa Lane's street anchor, Duddell Street granite steps and Graham Street Market use OpenStreetMap geometry from OpenFreeMap tile 14/13387/7151, dated 20260830. These are place/street anchors, not guaranteed entrances.

## Intentional editorial limits

- Phase 1: the real map, three story views, ten research leads and About & Care. The original Starting Point copy is retained. The two new story views contain conspicuously labelled research previews because approved final articles were not supplied.
- The office stays under the broad public label “A Central office building.” Its displayed marker is deliberately not the office coordinate. No exact unit, routine or visiting directions are supplied.
- The single directory gateway covers a broad Sheung Wan area; it never identifies an individual animal. No earlier prototype cat profile or unverified walking route is publicly rendered. Their legacy URLs lead to the relevant future-phase page.
- The three broad-area counts are synthetic UI samples, labelled in both languages. They are not scraped from pawsdine.com or a live/verified FEHD feed. Moving the map chooses the nearest named sample area, not an exact bounding-box census.
- The plan's 5 September 2026 festival date is past, so that lead is labelled for follow-up research, not advertised as upcoming.
- Operating status, interviews, subject consent, animal welfare, current restaurant approvals and final route conditions require the team's review before publication. No backend submission, HAPI account integration or public pin creation is claimed.

## Interaction and checking

Desktop drag / wheel zoom; mobile two-finger pan / pinch, with one-finger page scrolling. MapLibre keyboard controls plus keyboard-accessible map/list tabs, pin buttons and a district selector. Only Central & Western opens; other districts show “coming soon.” No filled local zone shapes are added.

Pin selection has two cancellable camera steps. Closing the card restores the pre-selection camera. Reduced motion uses an instant transition. The reader keeps the map mounted; session storage preserves a camera between full pages. Bookmarks stay on the current device. Unavailable storage and cancelled sharing are handled without false success messages.

Targeted checks: `node --experimental-strip-types --test tests/hapi-v21.test.mjs` and the existing Sites build helper. The full repository's standalone TypeScript command has existing Cloudflare Worker type-declaration gaps; application files are checked separately. No browser or device testing was requested or performed.
