// The animated Ω network from the original OMEGA homepage.
const nodes: [number, number][] = [
  [50, 10], [31, 18], [69, 18], [21, 33], [38, 33], [62, 33], [79, 33],
  [15, 52], [31, 51], [50, 45], [69, 51], [85, 52], [24, 70], [38, 66],
  [62, 66], [76, 70], [32, 87], [50, 78], [68, 87],
];

const edges: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  [3, 4], [3, 7], [3, 8], [4, 8], [4, 9], [5, 9], [5, 10],
  [6, 10], [6, 11], [7, 8], [7, 12], [8, 9], [8, 12], [8, 13],
  [9, 10], [9, 13], [9, 14], [10, 11], [10, 14], [11, 15], [12, 13],
  [12, 16], [13, 16], [13, 17], [14, 17], [14, 18], [15, 18], [16, 17],
  [17, 18], [4, 5], [8, 10],
];

export function NetworkGlyph() {
  return (
    <div className="network-wrap" aria-hidden="true">
      <div className="network-halo network-halo-cyan" />
      <div className="network-halo network-halo-violet" />
      <div className="network-orbit" />
      <div className="network-orbit network-orbit-two" />
      <svg className="network-svg" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="networkLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--cyan)" stopOpacity=".72" />
            <stop offset=".53" stopColor="var(--foreground)" stopOpacity=".42" />
            <stop offset="1" stopColor="var(--violet)" stopOpacity=".75" />
          </linearGradient>
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="network-lines">
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a]![0]}
              y1={nodes[a]![1]}
              x2={nodes[b]![0]}
              y2={nodes[b]![1]}
              stroke="url(#networkLine)"
              strokeWidth=".28"
            />
          ))}
        </g>
        <g filter="url(#nodeGlow)">
          {nodes.map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              className={`network-node-${i % 4}`}
              cx={x}
              cy={y}
              r={i % 5 === 0 ? 1.05 : 0.68}
              fill={i % 3 === 0 ? "var(--cyan)" : "var(--violet)"}
            />
          ))}
        </g>
        <path
          className="omega-trace"
          stroke="url(#networkLine)"
          d="M27 64 C28 40 36 28 50 28 C64 28 72 40 73 64 M34 62 C36 46 41 39 50 39 C59 39 64 46 66 62 M34 62 L50 58 L66 62"
        />
      </svg>
      <div className="network-scanline" />
    </div>
  );
}
