/**
 * Fill for the homepage "How We Work" numerals.
 *
 * The Krafo mark is tiled inside each oversized step numeral via
 * `background-clip: text`. Tiled rather than scaled to fit on purpose: a
 * single mark stretched across a glyph shows only unrecognisable fragments,
 * whereas a repeat at this size puts two or three whole marks inside each
 * numeral, so it reads unmistakably as the brand.
 *
 * The tile is pre-padded so marks breathe instead of colliding edge to edge,
 * and it keeps its alpha channel — the gaps let the section's near-black
 * ground through, which is what gives the numerals their depth.
 *
 * The numeral keeps its orange stroke independently, so if the tile ever
 * fails to load the step degrades to a plain outlined numeral rather than
 * vanishing.
 */

import krafoMarkTile from "../../assets/images/process/krafo-mark-tile.webp";

export const PROCESS_NUMERAL_TILE = krafoMarkTile;

/**
 * Each step nudges the tile origin so the four numerals don't land on an
 * identical crop of the pattern. Same motif, slightly different cut.
 */
export const PROCESS_TILE_OFFSETS = ["0px 0px", "26px 14px", "13px 30px", "34px 6px"];
