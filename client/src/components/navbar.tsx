import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, User, Award, FolderOpen, Briefcase, BookOpen, Mail, Share2, ShoppingBag, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/achievements", label: "Achievements", icon: Award },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/products", label: "Products", icon: ShoppingBag },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/social-links", label: "Social Links", icon: Share2 },
  ];

  // Desktop pill links — full set so the hamburger isn't needed on desktop
  const desktopLinks = navLinks;

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <nav className="container mx-auto px-4 lg:px-8 pt-3">
          <div
            className={`flex h-14 items-center justify-between rounded-2xl px-3 sm:px-4 transition-all duration-500 ${
              isScrolled
                ? "bg-background/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
                : "bg-background/30 backdrop-blur-md border border-white/5"
            }`}
          >
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                href="/"
                data-testid="link-home"
                className="text-xl font-bold tracking-tight px-2 py-1 rounded-md flex items-center gap-1"
              >
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Kartik
                </span>
                <span className="text-primary">.</span>
              </Link>
            </motion.div>

            {/* Desktop pill nav */}
            <div className="hidden xl:flex items-center gap-0.5 rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-sm">
              {desktopLinks.map((link) => {
                const active = isActive(link.href);
                const shortLabel = link.label === "Social Links" ? "Socials" : link.label;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-nav-desktop-${link.label.toLowerCase()}`}
                    className="relative px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors whitespace-nowrap"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-primary/90 shadow-md shadow-primary/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {shortLabel}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right side: theme + admin (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user && (
                <Link href="/admin" className="hidden xl:block">
                  <Button variant="default" size="sm" className="rounded-full gap-2" data-testid="button-admin-desktop">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ThemeToggle />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(!isOpen)}
                data-testid="button-hamburger-menu"
                className="relative xl:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-5 w-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex flex-col gap-[5px] items-center"
                    >
                      <span className="block w-5 h-0.5 bg-primary rounded-full" />
                      <span className="block w-4 h-0.5 bg-primary rounded-full" />
                      <span className="block w-5 h-0.5 bg-primary rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel from right */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 z-50 bg-background border-l border-border shadow-2xl flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
                <span className="font-bold text-lg">
                  Kartik<span className="text-primary">.</span>
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            active
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {link.label}
                          {link.label === "Products" && (
                            <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                              New
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <Link href="/admin">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full justify-start gap-3"
                        data-testid="button-admin"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border shrink-0 text-xs text-muted-foreground text-center">
                © {new Date().getFullYear()} Kartik Sharma
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
