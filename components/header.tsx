"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Heart, Menu, Bell, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const getNavLinks = () => {
    if (!user) {
      return [{ href: "/", label: "Home" }]
    }

    switch (user.role) {
      case "patient":
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/appointments", label: "Appointments" },
          { href: "/contact-admin", label: "Contact Admin" },
        ]
      case "doctor":
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/appointments", label: "Appointments" },
          { href: "/current-patient", label: "Current Patient" },
          { href: "/profile", label: "Profile" },
          { href: "/contact-admin", label: "Contact Admin" },
        ]
      case "admin":
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/schedule", label: "Appointments" },
          { href: "/requests", label: "Requests", notifications: 3 },
          { href: "/doctors", label: "Doctors" },
          { href: "/patients", label: "Patients" },
        ]
      default:
        return []
    }
  }

  const navLinks = getNavLinks()

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="tech-gradient p-2 rounded-lg group-hover:shadow-md transition-all duration-200">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent">
              GIA AFC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {user && navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref className="cursor-pointer">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-blue-700 focus:text-blue-700 dark:focus:text-blue-300 focus-ring disabled:pointer-events-none disabled:opacity-50 relative cursor-pointer",
                        pathname === link.href &&
                          "text-blue-700 dark:text-blue-300 font-medium",
                      )}
                    >
                      {link.label}
                      {link.notifications && <span className="notification-badge">{link.notifications}</span>}
                      {pathname === link.href && (
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 focus-ring"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 focus-ring"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="tech-gradient text-white hover:shadow-md transition-shadow focus-ring">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="focus-ring">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {user && (
                    <div className="flex items-center space-x-3 p-4 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </p>
                      </div>
                    </div>
                  )}

                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 relative",
                        pathname === link.href &&
                          "text-blue-600 dark:text-blue-400 font-semibold",
                      )}
                    >
                      {link.label}
                      {link.notifications && <span className="notification-badge">{link.notifications}</span>}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
