import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase:new URL('https://sophiawang85.github.io'),
  title:'Sihan Wang | Software Engineering Portfolio',
  description:'Sihan Wang, an MIT mathematics and computer science student. Projects and experience in LLM inference infrastructure, multiplayer web games, and Android apps.',
  alternates:{canonical:'https://sophiawang85.github.io/'},
  openGraph:{title:'Sihan Wang | Software Engineering Portfolio',description:'Projects and experience in ML infrastructure, multiplayer games, and Android development.',url:'https://sophiawang85.github.io/',type:'website'},
  icons:{icon:'/favicon.svg'},
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
