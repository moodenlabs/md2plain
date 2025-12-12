import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white mix-blend-difference">
          MD2Plain
        </Link>
      </div>
      <div className="pointer-events-auto">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white transition-opacity rounded-full hover:opacity-70 mix-blend-difference"
        >
          <Github size={24} />
        </Link>
      </div>
    </header>
  );
}
