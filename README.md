# Portfolio Next.js

A modern, performant portfolio website built with Next.js 15, featuring smooth animations, scroll-triggered effects, and a design inspired by Catalin Vintila's portfolio.

## Features

- **Next.js 15 App Router** - Modern React framework with server components
- **TypeScript** - Full type safety
- **GSAP + ScrollTrigger** - Professional-grade animations
- **Lenis** - Smooth scrolling experience
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **Performance** - Optimized images, font loading, minimal JS

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- GSAP 3.12
- Lenis 1.1
- CSS Variables for theming

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Font Setup

Download the **Switzer Variable** font and place it in `public/fonts/Switzer-Variable.woff2`.

You can get it from:
- [Switzer on GitHub](https://github.com/etiennegouin/Switzer)
- Or use any variable font of your choice and update the `@font-face` in `src/app/globals.css`

### Images

Add your project images to the `public/images/` directory following this structure:

```
public/images/
├── portrait.webp
├── portrait1.jpg
├── kings/
│   ├── cover.jpg
│   ├── 1.webp
│   ├── 2.webp
│   └── 3.webp
├── bravura/
│   ├── cover.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── digit/
│   ├── cover.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── hexagon/
│   ├── cover.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
└── nfts/
    ├── cover.jpeg
    ├── 1.jpeg
    ├── 2.jpeg
    └── 3.jpeg
```

### Customization

Edit `src/lib/data.ts` to customize:
- Profile information
- Projects
- Services
- Principles
- Awards

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, CSS variables, animations
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page composition
├── components/
│   ├── Hero.tsx         # Hero section with animated title
│   ├── Manifesto.tsx    # Manifesto section
│   ├── FeaturedWork.tsx # Project carousel
│   ├── About.tsx        # About section with stats
│   ├── Services.tsx     # Services & principles grid
│   ├── Awards.tsx       # Awards showcase
│   ├── Contact.tsx      # CTA section
│   ├── Footer.tsx       # Footer with social links
│   └── SmoothScroll.tsx # Lenis smooth scroll wrapper
└── lib/
    ├── types.ts         # TypeScript interfaces
    └── data.ts          # Portfolio content data
```

## Animation Details

- **Hero**: Staggered title line reveal, chip images animate in
- **Manifesto**: Word-by-word reveal animation
- **Featured Work**: Horizontal carousel with keyboard navigation
- **About**: Parallax portrait effect
- **Services/Principles**: Staggered card entrance
- **Awards**: Staggered card entrance
- **Contact**: Parallax text effect

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- Skip to main content link
- Color contrast compliance

## Performance

- Next.js Image optimization
- Font preloading
- CSS-first animations
- Minimal JavaScript bundle
- Code splitting by default

## License

MIT License - feel free to use this as a starting point for your own portfolio.