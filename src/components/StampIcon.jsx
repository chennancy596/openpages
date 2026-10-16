export default function StampIcon({ stamp, size = 42 }) {
  if (!stamp) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label={stamp.label}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={stamp.color} strokeWidth="1.5" />
      <path d={stamp.path} fill="none" stroke={stamp.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="12" y="13.2" textAnchor="middle" fontSize="7" fill={stamp.color}>
        {stamp.label}
      </text>
    </svg>
  );
}
