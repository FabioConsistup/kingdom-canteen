import type { SVGProps } from 'react';

export type IconName =
  | 'wallet'
  | 'history'
  | 'calendar'
  | 'recharge'
  | 'shield'
  | 'user'
  | 'mail'
  | 'clock'
  | 'check'
  | 'alert'
  | 'chevron'
  | 'menu'
  | 'close'
  | 'sparkle'
  | 'balance'
  | 'plus'
  | 'equals'
  | 'info'
  | 'form'
  | 'send'
  | 'upload'
  | 'file'
  | 'trash'
  | 'spinner';

const paths: Record<IconName, JSX.Element> = {
  wallet: (
    <>
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6H18a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.5Z" />
      <path d="M3 9V7.2A2.2 2.2 0 0 1 5.2 5H16" />
      <path d="M21 12h-3.5a1.75 1.75 0 0 0 0 3.5H21" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3.5 4.5V9H8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8.5 14.5h3" />
    </>
  ),
  recharge: (
    <>
      <path d="M12 3v10" />
      <path d="m8.5 9.5 3.5 3.5 3.5-3.5" />
      <path d="M4 14v3.5A3.5 3.5 0 0 0 7.5 21h9a3.5 3.5 0 0 0 3.5-3.5V14" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5 6v5.6c0 4.2 2.9 7.6 7 9.2 4.1-1.6 7-5 7-9.2V6l-7-2.8Z" />
      <path d="m9.3 12.2 1.9 1.9 3.6-3.7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.8 20a7.4 7.4 0 0 1 14.4 0" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="m4.5 8 6.4 4.6a2 2 0 0 0 2.2 0L19.5 8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  alert: (
    <>
      <path d="M12 4.3 2.9 19.4h18.2L12 4.3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  chevron: <path d="m6 9.5 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  sparkle: (
    <>
      <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13 4.5 11l5.6-2L12 3.5Z" />
    </>
  ),
  balance: (
    <>
      <path d="M12 4.5v15" />
      <path d="M5 7.5h14" />
      <path d="M5 7.5 2.8 13a2.6 2.6 0 0 0 4.4 0L5 7.5Z" />
      <path d="M19 7.5 16.8 13a2.6 2.6 0 0 0 4.4 0L19 7.5Z" />
      <path d="M8.5 20.5h7" />
    </>
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  equals: <path d="M5 9.5h14M5 14.5h14" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8h.01" />
    </>
  ),
  form: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="3" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </>
  ),
  send: (
    <>
      <path d="m20.5 3.5-9 9" />
      <path d="M20.5 3.5 14.8 20.5l-3.3-8-8-3.3 17-5.7Z" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4.5" />
      <path d="m8 8.5 4-4 4 4" />
      <path d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3" />
    </>
  ),
  file: (
    <>
      <path d="M13.5 3H8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 6.5h15" />
      <path d="M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5" />
      <path d="M6.5 6.5 7.4 19a2 2 0 0 0 2 1.9h5.2a2 2 0 0 0 2-1.9l.9-12.5" />
    </>
  ),
  spinner: <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />,
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
