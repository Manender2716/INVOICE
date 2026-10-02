export const Icon = ({ d, cls = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cls}
  >
    {d}
  </svg>
);

export const I = {
  logo: (
    <Icon
      cls="w-5 h-5"
      d={
        <>
          <path d="M4 4h16v16H4z" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </>
      }
    />
  ),

  search: (
    <Icon
      d={
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </>
      }
    />
  ),

  bell: (
    <Icon
      d={
        <>
          <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 13.5 6 12 6 8z" />
          <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
        </>
      }
    />
  ),

  grid: (
    <Icon
      d={
        <>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </>
      }
    />
  ),

  file: (
    <Icon
      d={
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </>
      }
    />
  ),

  check: <Icon d={<path d="M20 6 9 17l-5-5" />} />,

  building: (
    <Icon
      d={
        <>
          <rect x="4" y="2" width="16" height="20" />
          <path d="M9 22v-4h6v4M9 6h1M9 10h1M14 6h1M14 10h1" />
        </>
      }
    />
  ),

  po: (
    <Icon
      d={
        <>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </>
      }
    />
  ),

  reports: (
    <Icon
      d={
        <>
          <path d="M3 3v18h18" />
          <path d="M7 13l4-4 3 3 5-6" />
        </>
      }
    />
  ),

  settings: (
    <Icon
      d={
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.5.7 1 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z" />
        </>
      }
    />
  ),

  upload: (
    <Icon
      d={
        <>
          <path d="M12 15V3m0 0 4 4m-4-4L8 7" />
          <path d="M20 15v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
        </>
      }
    />
  ),

  warn: (
    <Icon
      d={
        <>
          <path d="M12 9v4m0 4h.01" />
          <path d="M10.3 3.9 1.8 18a1.8 1.8 0 0 0 1.6 2.7h17.2a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z" />
        </>
      }
    />
  ),
};
