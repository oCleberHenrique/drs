"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Quem Somos", href: "/quem-somos" },
    { label: "Atuações", href: "/atuacoes" },
    { label: "Equipe", href: "/equipe" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    // Alterado: Fundo escuro (#0B0E13), borda sutil e texto branco
    <header className="w-full bg-[#0B0E13] border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* Logo - Se tiver imagem, substitua o texto abaixo pela tag <img src="/logo.png" ... /> */}
        <Link href="/" className="flex flex-col">
          <img src='/logo.png'/>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-jakarta font-medium text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Menu Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-[#0B0E13] border-b border-gray-800 py-4 flex flex-col gap-2 shadow-xl">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-[#D4AF37] font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}