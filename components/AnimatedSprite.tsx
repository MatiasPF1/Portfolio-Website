import PixelSprite, { type SpriteName } from "@/components/PixelSprite";

type AnimatedSpriteProps = {
  /** Resting frame, then the frame it flips to. */
  frames: [SpriteName, SpriteName];
  /**
   * "blink": shows the second frame for a moment every few seconds (eyes,
   * ears). "flap": alternates evenly between the two (wings).
   */
  mode: "blink" | "flap";
  scale?: number;
  /** Seconds for one full cycle. */
  duration?: number;
  /** Seconds; negative values start partway through, to desync a group. */
  delay?: number;
  /** Positioning is up to the caller (e.g. "absolute -top-11 right-8"). */
  className?: string;
};

/**
 * A two-frame pixel animation. Both frames sit in the same grid cell and CSS
 * swaps which one is visible with stepped keyframes, so it moves like a
 * sprite rather than cross-fading.
 *
 * Stacking with a grid cell rather than `relative` + `absolute` keeps the
 * wrapper free of any position value, so callers can position it however
 * they like without the two classes fighting.
 */
export default function AnimatedSprite({
  frames,
  mode,
  scale = 3,
  duration = mode === "flap" ? 0.5 : 4.5,
  delay = 0,
  className = "",
}: AnimatedSpriteProps) {
  return (
    <span
      aria-hidden="true"
      className={`sprite-${mode} inline-grid leading-none ${className}`}
      style={{
        ["--sprite-duration" as string]: `${duration}s`,
        ["--sprite-delay" as string]: `${delay}s`,
      }}
    >
      <PixelSprite name={frames[0]} scale={scale} className="frame-a block [grid-area:1/1]" />
      <PixelSprite name={frames[1]} scale={scale} className="frame-b block [grid-area:1/1]" />
    </span>
  );
}
