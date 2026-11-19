# OMEGA — Infrastructure for a Decentralized Civilization

A research vision exploring governance, digital infrastructure, energy, AI, and institutions for a decentralized civilization.

## Stack

- TanStack Start and React
- Vite and Tailwind CSS
- Nitro for server rendering and deployment adapters

## Development

Requires Node.js 20.19+ (or 22.12+) and Bun.

```sh
bun install
bun run dev
```

## Production build

```sh
bun run build
```

The build uses Nitro's Vercel preset and produces the server deployment output expected by Vercel. Keep the Vercel output directory on automatic detection; this app is server-rendered and must not be deployed as a static `dist` directory.

## Checks

```sh
bun run lint
bun run test
```
