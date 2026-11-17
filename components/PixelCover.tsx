import PixelSprite, { type SpriteName } from "@/components/PixelSprite";

// Hand-placed so the stars frame the sprite instead of crowding it.
const stars: { left: string; top: string; sprite: SpriteName; scale: number; delay: string }[] = [
  { left: "12%", top: "22%", sprite: "sparkle", scale: 2, delay: "0s" },
  { left: "24%", top: "68%", sprite: "twinkle", scale: 2, delay: "-1.2s" },
  { left: "36%", top: "14%", sprite: "twinkle", scale: 2, delay: "-2.1s" },
  { left: "70%", top: "18%", sprite: "twinkle", scale: 3, delay: "-0.6s" },
  { left: "84%", top: "58%", sprite: "sparkle", scale: 2, delay: "-1.7s" },
  { left: "62%", top: "78%", sprite: "twinkle", scale: 2, delay: "-2.6s" },
  { left: "6%", top: "48%", sprite: "dot", scale: 2, delay: "-0.9s" },
  { left: "92%", top: "30%", sprite: "dot", scale: 2, delay: "-2.3s" },
];

/**
 * Cover art for a project with no screenshot: one pixel sprite floating in a
 * small patch of the same night sky the page sits on.
 */
export default function PixelCover({ sprite }: { sprite: SpriteName }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 60% 70% at 50% 55%, #1c2848 0%, transparent 72%)," +
          "linear-gradient(180deg, #060a15 0%, #0b1120 100%)",
      }}
    >
      {stars.map((star) => (
        <PixelSprite
          key={`${star.left}-${star.top}`}
          name={star.sprite}
          scale={star.scale}
          className="twinkle absolute"
          style={{ left: star.left, top: star.top, animationDelay: star.delay }}
        />
      ))}

      <div className="absolute inset-0 grid place-items-center">
        <PixelSprite
          name={sprite}
          scale={9}
          className="bob transition-transform duration-500 ease-out-soft group-hover:scale-110"
        />
      </div>
    </div>
  );
}
