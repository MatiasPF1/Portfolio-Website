/**
 * Tiny pixel-art sprites, drawn as SVG rects from character grids.
 *
 * They are the companion to the Press Start 2P labels: the same chunky grid,
 * used for the small decorative things (sparkles, the animals that live
 * around the page, cover art for projects that have no screenshot). Each character in a row is one
 * pixel; "." is empty and every other character is looked up in the palette.
 */

const palette: Record<string, string> = {
  l: "var(--color-lantern-300)",
  m: "var(--color-lantern-500)",
  p: "var(--color-peri-400)",
  q: "var(--color-peri-500)",
  w: "var(--color-paper)",
  s: "var(--color-sage-300)",
  g: "var(--color-sage-400)",
  d: "var(--color-sage-500)",
  h: "var(--color-blush-400)",
  n: "var(--color-blush-300)",
  k: "var(--color-ink-800)",
  c: "var(--color-peri-300)",
  // Ecuadorian flag, softened to sit in the night palette.
  y: "#f2cc5b",
  b: "#4a6bc4",
  r: "#d65a63",
};

const sprites = {
  sparkle: [
    "...l...",
    "...l...",
    "..lll..",
    "lllllll",
    "..lll..",
    "...l...",
    "...l...",
  ],
  twinkle: [
    ".p.",
    "ppp",
    ".p.",
  ],
  dot: ["l"],
  heart: [
    ".hh.hh.",
    "hnhhhhh",
    "hhhhhhh",
    ".hhhhh.",
    "..hhh..",
    "...h...",
  ],
  // A cat loafing with its eyes shut: head on the left, tail tucked right.
  cat: [
    ".l.....l............",
    "lll...lll...........",
    "lnlllllnl...........",
    "lllllllllllllllll...",
    "lkklllkkllllllllll..",
    "llllnllllllllllllll.",
    ".lllllllllllllllllll",
    ".lllllllllllllllllll",
    "..llllllllllllllmmmm",
    "...mmmmmmmmmmmmmmm..",
  ],
  snake: [
    "..........ggg.",
    ".........ggkg.",
    ".........gggdh",
    ".........gd...",
    "..ggdggdggd...",
    ".ggdggdggd....",
    ".gd...........",
    ".ggdggdggdggd.",
    "..gdggdggdggg.",
  ],
  shield: [
    "wwwwwwwwwww",
    "wpppppppppw",
    "wpppppppplw",
    "wppppppplpw",
    "wplpppplppw",
    "wpllpplpppw",
    "wqplllpppqw",
    ".wqplppqqw.",
    ".wqqpppqqw.",
    "..wqqpqqw..",
    "...wqqqw...",
    "....www....",
  ],
  gem: [
    "..sssssss..",
    ".sgsgggsgs.",
    "sgggsgsgggs",
    ".dggsgsggd.",
    "..dgsgsgd..",
    "...dgsgd...",
    "....dsd....",
    ".....d.....",
  ],

  // ------------------------------------------------------------ animals --
  // Two-frame animals come in pairs; AnimatedSprite flips between them.

  // Perched on the portrait. Lantern eyes, a speckled chest.
  owl: [
    "q.........q",
    "qq.......qq",
    "qpppppppppq",
    "plllppplllp",
    "plklppplklp",
    "plllpmplllp",
    ".ppcpcpcpp.",
    ".pcpcpcpcp.",
    ".ppcpcpcpp.",
    "..ppppppp..",
    "..mm...mm..",
  ],
  owlBlink: [
    "q.........q",
    "qq.......qq",
    "qpppppppppq",
    "ppppppppppp",
    "pqqqpppqqqp",
    "pppppmppppp",
    ".ppcpcpcpp.",
    ".pcpcpcpcp.",
    ".ppcpcpcpp.",
    "..ppppppp..",
    "..mm...mm..",
  ],

  // Sits on the skills list and flicks an ear now and then.
  bunny: [
    ".ww...ww.",
    ".wn...nw.",
    ".wn...nw.",
    "..wwwww..",
    ".wkwwwkw.",
    ".whwnwhw.",
    "..wwwww..",
    ".wwwwwww.",
    ".ww.w.ww.",
  ],
  bunnyFlop: [
    ".ww......",
    ".wn...www",
    ".wn......",
    "..wwwww..",
    ".wkwwwkw.",
    ".whwnwhw.",
    "..wwwww..",
    ".wwwwwww.",
    ".ww.w.ww.",
  ],

  // Listens to the music section.
  frog: [
    ".ggg.ggg.",
    ".gkg.gkg.",
    "ggggggggg",
    "ghgggggh.",
    ".gdddddg.",
    "ggsssssgg",
    "gg.....gg",
  ],
  frogBlink: [
    ".ggg.ggg.",
    ".gdg.gdg.",
    "ggggggggg",
    "ghgggggh.",
    ".gdddddg.",
    "ggsssssgg",
    "gg.....gg",
  ],
  note: [
    "..ll.",
    "..l.l",
    "..l..",
    "..l..",
    "lll..",
    "lll..",
  ],

  // Swims across the sky, Ghibli style. Faces right, the way it travels.
  whale: [
    "..............c.c.....",
    ".............c.c.c....",
    "...............c......",
    "qq......pppppppp......",
    ".qq...pppppppppppp....",
    "..qq.pppppppppppppp...",
    "...qppppppppppppppkpp.",
    "..qqppppppppppppppphpp",
    ".qq..pcccccccccccccpp.",
    "qq....ccccccccccccc...",
    ".......ccccccccccc....",
  ],

  birdUp: [
    "c.....c",
    ".c...c.",
    "..ccc..",
    "...c...",
  ],
  birdDown: [
    ".......",
    "..ccc..",
    ".c.c.c.",
    "c.....c",
  ],

  // ------------------------------------------------------------ ecuador --
  // A llama in a woven Andean blanket, facing right.
  llama: [
    "......w.w.",
    "......wwww",
    "......wwkw",
    "......wwww",
    "......ww..",
    "......ww..",
    "ww....ww..",
    "wwwwwwww..",
    "wrylbryw..",
    "wwwwwwww..",
    ".w.w.w.w..",
    ".w.w.w.w..",
  ],
  llamaChew: [
    "......ww..",
    "......wwww",
    "......wwkw",
    "......wwwh",
    "......ww..",
    "......ww..",
    "ww....ww..",
    "wwwwwwww..",
    "wrylbryw..",
    "wwwwwwww..",
    ".w.w.w.w..",
    ".w.w.w.w..",
  ],

  // Andean condor: dark wings, white collar.
  condorGlide: [
    "......w......",
    "qqqqqqwqqqqqq",
    "..qqqwwwqqq..",
    ".....q.q.....",
  ],
  condorFlap: [
    "qq.........qq",
    "..qq..w..qq..",
    "....qqwqq....",
    ".....q.q.....",
  ],

  flag: [
    "yyyyyyyyyyyy",
    "yyyyyyyyyyyy",
    "yyyyymmyyyyy",
    "yyyyymmyyyyy",
    "bbbbbmmbbbbb",
    "bbbbbbbbbbbb",
    "rrrrrrrrrrrr",
    "rrrrrrrrrrrr",
  ],
} satisfies Record<string, string[]>;

export type SpriteName = keyof typeof sprites;

type PixelSpriteProps = {
  name: SpriteName;
  /** Rendered size of one sprite pixel, in CSS px. */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function PixelSprite({ name, scale = 2, className, style }: PixelSpriteProps) {
  const rows = sprites[name];
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;

  // Merge each horizontal run of one colour into a single rect.
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === char) end++;
      if (char !== ".") rects.push({ x, y, w: end - x, fill: palette[char] });
      x = end;
    }
  });

  return (
    <svg
      aria-hidden="true"
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={rect.w} height={1} fill={rect.fill} />
      ))}
    </svg>
  );
}
