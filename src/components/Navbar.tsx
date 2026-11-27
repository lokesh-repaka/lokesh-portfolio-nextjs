"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, FileText, Send } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/projects" },
    { name: "Articles", href: "/blogs" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-gold-border/20 shadow-lg shadow-black/40 py-3.5"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center font-serif font-black text-bg text-xl shadow-gold transition-transform group-hover:scale-105">
            LR
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-white group-hover:text-gold-bright transition-colors tracking-wide">
              Lokesh Repaka
            </span>
            <span className="text-[10px] tracking-widest text-gold font-mono uppercase font-semibold">
              AI Engineer & FDE
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-card/60 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-gold-bright bg-gold/10 font-semibold"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/resume"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase font-mono rounded-lg border border-gold-border/50 text-gold-bright hover:bg-gold/10 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </Link>
          <Link
            href="/#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase font-mono rounded-lg bg-gold-gradient text-bg shadow-gold hover:opacity-95 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Get In Touch
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted hover:text-white transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6 text-gold-bright" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-card/95 border-b border-gold-border/20 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-gold-bright py-2 border-b border-white/5 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-3">
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gold-border/40 text-gold-bright font-mono text-sm uppercase"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold-gradient text-bg font-mono text-sm uppercase font-bold"
            >
              <Send className="w-4 h-4" />
              Get In Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
