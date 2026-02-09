# Gallery Scroll Optimization Research

## Overview
Research into optimizing the horizontal scroll animation in `Gallery.tsx` to address lagging issues. The current implementation uses Framer Motion's `useScroll` and `useTransform` to move a large horizontal track. Lag is likely caused by large layout calculations, heavy SVG paths, or unoptimized rendering of off-screen elements.

## Inspiration & Sources (Mandatory)
> [!IMPORTANT]
> You must list all websites and URLs where information or inspiration was gathered.

- **Framer Motion Docs**: [https://www.framer.com/motion/scroll-animations/](https://www.framer.com/motion/scroll-animations/) - Core documentation on scroll-linked animations.
- **Motion.dev Performance**: [https://motion.dev/docs/react-performance](https://motion.dev/docs/react-performance) - Best practices for smooth animations, specifically highlighting `will-change` and avoiding layout thrashing.
- **GSAP ScrollTrigger (for concept comparison)**: [https://gsap.com/docs/v3/Plugins/ScrollTrigger/](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - Concepts of "pinning" and "scrubbing" which align with the current `sticky` implementation.
- **Developer Articles**:
  - *Optimizing Framer Motion*: [https://blog.logrocket.com/optimizing-react-performance-framer-motion/](https://blog.logrocket.com/optimizing-react-performance-framer-motion/)
  - *Large Scale SVG Animation*: [https://css-tricks.com/optimizing-svg-delivery-for-web-architects/](https://css-tricks.com/optimizing-svg-delivery-for-web-architects/)

## Design Implementation
- **Visual Style**: Keep existing "Parallax Gallery" style.
- **Goal**: Maintain the "smoothness" but remove the "jank/lag".

## Animation Implementation & Optimization Strategies

### 1. Hardware Acceleration with `will-change`
The most common cause of scroll lag is the browser repainting on every frame.
*   **Action**: Add `will-change-transform` (Tailwind) or `willChange: "transform"` (Inline style) to the *moving container* (`motion.div` with `x`).
*   **Why**: Hints the browser to promote the element to its own layer (compositor layer), making transforms cheap/GPU-accelerated.

### 2. Smooth Out Input with `useSpring`
Directly mapping `scrollYProgress` to `x` can be jittery because scroll events fire rapidly and sometimes unevenly (especially on mouse wheels).
*   **Action**: Wrap `scrollYProgress` in `useSpring`.
*   **Code**:
    ```typescript
    const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20, restDelta: 0.001 });
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);
    ```

### 3. Optimize the 5000px SVG
The `svg` element on line 129 is `w-[5000px]`. Rendering such a huge SVG, even if static, takes significant memory and composition time.
*   **Action**:
    *   **Option A**: Use a smaller SVG and scale it via CSS transform (if the line quality permits).
    *   **Option B**: Break it into smaller chunks (e.g., one SVG per "section").
    *   **Option C (Quickest)**: Ensure the SVG has `contain: strict` or similar CSS hints, though strict bounds might break the line. At minimum, ensure it acts as `pointer-events-none` (already done).

### 4. Layout & Stacking Context
*   The `GalleryItem` components have `box-shadow` and `rounded` corners. These are expensive to rasterize during movement.
*   **Action**: Check if `shadow-2xl` is causing repaint. If so, reduce shadow complexity or rely on a static PNG shadow if desperate.
*   **Important**: Ensure the `GalleryItem` itself doesn't have `transition-all duration-700` running *while* scrolling if not needed. The code shows `transition-all duration-700` on the root div of `GalleryItem`. This might trigger style upgrades constantly. Ideally, transition specific properties.

### 5. Reduce DOM Size / Virtualization
*   Currently, all images are rendered. With only 8 items, full virtualization (like `react-window`) might be overkill, but standard lazy loading is essential.
*   **Action**: Ensure `img` tags have `loading="lazy"` (Already present).
*   **Action**: Consider `content-visibility: auto` on the gallery container to allow the browser to skip rendering off-screen work.

### 6. Avoid "Transition-All" on hover during scroll
Line 40: `transition-all duration-700`.
If the user hovers while scrolling, `transition-all` will try to animate layout properties (like `width` if it changed, though here it seems to be transforms). `transition-all` is generally a performance smell.
*   **Action**: Change to `transition-transform duration-700` or specific properties.

## Code Snippet (Core Logic Optimization)

```tsx
// Optimized setup for smooth scrolling
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start start", "end end"]
});

// smooth out the scroll value
const smoothX = useSpring(scrollYProgress, { 
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
});

const x = useTransform(smoothX, [0, 1], ["0%", "-85%"]);

return (
    // ...
    <motion.div 
        style={{ x: x }} 
        className="flex items-center h-full px-[10vw] gap-0 will-change-transform" // Added will-change-transform
    >
       {/* ... content ... */}
    </motion.div>
    // ...
)
```

## Considerations
*   **Browser Compatibility**: `will-change` is well supported but should be used sparingly (only on the moving container).
*   **Mobile**: Horizontal scrolling on mobile via vertical scroll hijack can be disorienting. Ensure the container has `touch-action: none` if you want to prevent native vertical scroll interference, though usually with `useScroll` + `sticky` strictly, native scroll is fine.
*   **Overscroll**: Ensure the `["0%", "-85%"]` logic aligns with the actual content width to avoid overshooting or undershooting. Calculating exact width is safer than arbitrary percentages.
*   **Sticky**: The gallery is sticky until the end of this section.
