import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase:new URL('https://sophiawang85.github.io'),
  title:'Sihan Wang | Software Engineering Portfolio',
  description:'Sihan Wang, an MIT mathematics and computer science student. Projects and experience in LLM inference infrastructure, machine-learning apps, multiplayer web games, and Android apps.',
  alternates:{canonical:'https://sophiawang85.github.io/'},
  openGraph:{title:'Sihan Wang | Software Engineering Portfolio',description:'Projects and experience in ML infrastructure, machine-learning apps, multiplayer games, and Android development.',url:'https://sophiawang85.github.io/',type:'website'},
  icons:{icon:'/favicon.svg'},
};
const fonts = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="stylesheet" href={fonts}/></head><body>{children}</body></html>}
