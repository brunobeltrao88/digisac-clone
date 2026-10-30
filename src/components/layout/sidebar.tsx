"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  MessageSquare,
  Users,
  Radio,
  GitBranch,
  BarChart2,
  Settings,
  Zap,
  LogOut,
  Menu,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const nav = [
  { href: "/inbox", icon: MessageSquare, label: "Atendimento" },
  { href: "/contacts", icon: Users, label: "Contatos" },
  { href: "/channels", icon: Radio, label: "Canais" },
  { href: "/departments", icon: GitBranch, label: "Departamentos" },
  { href: "/bots", icon: Zap, label: "Bots" },
  { href: "/reports", icon: BarChart2, label: "Relatórios" },
  { href: "/settings", icon: Settings, label: "Configurações" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-16 flex-col items-center border-r border-gray-200 bg-white py-4 lg:w-56 lg:items-start lg:px-3">
      {/* Logo */}
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 lg:w-full lg:px-1">
        <span className="text-lg font-bold text-white lg:hidden">D</span>
        <span className="hidden text-base font-bold text-white lg:block">Digisac</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 w-full">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-lg px-2 text-sm font-medium transition-colors lg:px-3",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto flex items-center gap-3 w-full rounded-lg px-2 py-2 lg:px-3">
        <Avatar name="Agente" size="sm" status="online" />
        <div className="hidden flex-1 lg:block">
          <p className="text-xs font-medium text-gray-900">Agente</p>
          <p className="text-xs text-gray-500">Online</p>
        </div>
        <button className="hidden lg:block text-gray-400 hover:text-gray-600">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
