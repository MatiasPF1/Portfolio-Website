import AnimatedSprite from "@/components/AnimatedSprite";
import PixelSprite from "@/components/PixelSprite";

// Loose V, so the flock doesn't read as a single sprite.
const flock = [
  { x: 0, y: 14, delay: 0 },
  { x: 26, y: 0, delay: -0.18 },
  { x: 30, y: 26, delay: -0.33 },
  { x: 58, y: 10, delay: -0.09 },
];

/**
 * The animals that live in the sky behind the page: a whale that drifts
 * across every so often, and a small flock of birds going the other way.
 * They sit behind the content and never take clicks.
 */
export default function SkyCritters() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-3 overflow-hidden">
      <div className="sky-whale absolute left-0 top-[24%]">
        <div className="whale-bob">
          <PixelSprite name="whale" scale={4} className="block opacity-60" />
        </div>
      </div>

      <div className="sky-birds absolute left-0 top-[11%]">
        {flock.map((bird) => (
          <span key={`${bird.x}-${bird.y}`} className="absolute" style={{ left: bird.x, top: bird.y }}>
            <AnimatedSprite
              frames={["birdUp", "birdDown"]}
              mode="flap"
              scale={2}
              duration={0.55}
              delay={bird.delay}
              className="opacity-70"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
