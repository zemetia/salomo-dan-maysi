# Two-Stage Wedding Event Timeline Research

## Overview

To elegantly display the "Pemberkatan" (Ceremony) and "Resepsi" (Reception) which occur on the same day but at different locations, a **Vertical Journey Timeline** is the optimal UI/UX pattern. This design visually connects the two events, reinforcing their sequence while allowing for distinct details (location, time, map) for each.

## Inspiration & Sources

> [!IMPORTANT]
> Sources gathered from web research on wedding interaction patterns and vertical timeline designs.

- **The Knot / Zola**: Emphasize clear, chronological flows and distinct location details for multi-venue weddings.
- **Cruip / Tailwind UI**: Vertical timeline patterns with "connecting lines" are standard for indicating sequence.
- **Framer Motion Examples**: Scroll-triggered animations where the "path" lights up or draws itself as the user scrolls down provide a "WOW" factor.

## Design Implementation

### Visual Style

- **Theme**: Luxury/Elegant.
- **Structure**: Vertical Stack with a continuous "Golden Thread" connecting the two cards.
- **Card Style**: Glassmorphism (`bg-white/60 backdrop-blur-md`) to stand out against the background but feel airy.
- **Typography**: Serif headings for elegance, distinct Sans-serif for logistical details (time, address).

### UX Considerations

1.  **Chronology**: Ceremony must appear first.
2.  **Connectivity**: A visual line connects the bottom of the Ceremony card to the top of the Reception card, implying "Travel".
3.  **Transit Info**: The space between events is a designated "Interim" space (perfect for a decorative "&" or "Transit" icon).
4.  **Maps**: Maps should be easily accessible but not clutter the view. The current "Reveal" map pattern is good, but can be integrated more seamlessly.

## Animation Implementation

- **Trigger**: `whileInView` using Framer Motion.
- **Logic**:
  - **Cards**: Fade In + Slide Up (`y: 50 -> 0`).
  - **Connecting Line**: A vertical `div` or `svg` that grows in height (`height: 0% -> 100%`) as the user scrolls, visually "drawing" the path to the next event.
  - **Micro-interactions**: Hovering over the venue name could slightly zoom the map or distinctively highlight the location pin.

## Code Snippet (Core Logic)

```tsx
<div className="relative">
  {/* The Connecting Line */}
  <motion.div
    className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent"
    initial={{ height: 0 }}
    whileInView={{ height: "100%" }}
    transition={{ duration: 1.5 }}
  />

  {/* Event 1 */}
  <EventCard />

  {/* Event 2 */}
  <EventCard />
</div>
```

## Considerations

- **Mobile Responsiveness**: On smaller screens, the timeline line might need to move to the left side (standard timeline view) or remain central if cards are stacked vertically with sufficient padding.
- **Performance**: Use CSS transforms for animations to ensure smooth 60fps scrolling.
