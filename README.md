# Prakash Mannam — Portfolio

An interactive portfolio featuring selected work in product design and engineering, including Campus Coders and MiniRedis. The site uses scroll-driven scenes, a WebGL fold sculpture, and an in-browser MiniRedis demonstration.

## Local development

Requirements: Node.js 20+ (using npm).

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run test
npm run build
```

## Project structure

- `src/content/portfolio.ts` — portfolio copy, projects, and links
- `src/components/scenes/` — the narrative sections and interactions
- `src/components/fold/` — the scroll-driven WebGL fold sculpture
- `src/lib/miniredis-sim.ts` — browser-based MiniRedis command simulation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for implementation details and [roadmap.md](./roadmap.md) for planned work.
