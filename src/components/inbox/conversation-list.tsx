"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "agora";
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

const STATUS_TABS = [
  { key: "open", label: "Abertos" },
  { key: "pending", label: "Pendentes" },
  { key: "resolved", label: "Resolvidos" },
  { key: "closed", label: "Fechados" },
] as const;

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    contact: { name: "João Silva", phone: "+55 11 99999-1234" },
    channel: { type: "WHATSAPP", name: "WhatsApp Principal" },
    lastMessage: "Olá, preciso de ajuda com meu pedido",
    lastMessageAt: new Date(Date.now() - 5 * 60 * 1000),
    unread: 3,
    status: "open",
    priority: "HIGH",
    tags: ["VIP", "Pedido"],
  },
  {
    id: "2",
    contact: { name: "Maria Souza", phone: "+55 21 98888-5678" },
    channel: { type: "INSTAGRAM", name: "Instagram" },
    lastMessage: "Quando chega minha encomenda?",
    lastMessageAt: new Date(Date.now() - 25 * 60 * 1000),
    unread: 1,
    status: "open",
    priority: "NORMAL",
    tags: ["Entrega"],
  },
  {
    id: "3",
    contact: { name: "Carlos Lima", phone: "+55 11 97777-9012" },
    channel: { type: "WEBCHAT", name: "Chat do Site" },
    lastMessage: "Obrigado pelo atendimento!",
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 0,
    status: "open",
    priority: "LOW",
    tags: [],
  },
  {
    id: "4",
    contact: { name: "Ana Paula", phone: "+55 31 96666-3456" },
    channel: { type: "TELEGRAM", name: "Telegram" },
    lastMessage: "Quero fazer um cancelamento",
    lastMessageAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    unread: 2,
    status: "pending",
    priority: "URGENT",
    tags: ["Cancelamento"],
  },
];

const CHANNEL_ICONS: Record<string, string> = {
  WHATSAPP: "🟢",
  WHATSAPP_BUSINESS: "🟢",
  INSTAGRAM: "🟣",
  FACEBOOK: "🔵",
  TELEGRAM: "✈️",
  WEBCHAT: "💬",
  EMAIL: "📧",
  SMS: "💬",
};

const PRIORITY_COLORS: Record<string, string> = {
  URGENT: "danger",
  HIGH: "warning",
  NORMAL: "default",
  LOW: "info",
};

export function ConversationList() {
  const [activeTab, setActiveTab] = useState<"open" | "pending" | "resolved" | "closed">("open");
  const [selected, setSelected] = useState<string>("1");
  const [search, setSearch] = useState("");

  const filtered = MOCK_CONVERSATIONS.filter(
    (c) =>
      c.status === activeTab &&
      (search === "" ||
        c.contact.name.toLowerCase().includes(search.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200 bg-white shrink-0">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Atendimentos</h2>
          <div className="flex gap-1">
            <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Filter className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar conversa..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 py-2 text-xs font-medium transition-colors",
              activeTab === tab.key
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <MessageSquareIcon />
            <p className="mt-2 text-sm">Nenhuma conversa</p>
          </div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelected(conv.id)}
              className={cn(
                "w-full px-4 py-3 text-left transition-colors hover:bg-gray-50",
                selected === conv.id && "bg-indigo-50 border-r-2 border-indigo-500"
              )}
            >
              <div className="flex items-start gap-3">
                <Avatar name={conv.contact.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate text-sm font-medium text-gray-900">
                      {CHANNEL_ICONS[conv.channel.type]} {conv.contact.name}
                    </span>
                    <span className="shrink-0 text-xs text-gray-400">
                      {relativeTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">{conv.lastMessage}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    {conv.priority !== "NORMAL" && (
                      <Badge variant={PRIORITY_COLORS[conv.priority] as any} className="text-xs">
                        {conv.priority === "URGENT" ? "Urgente" : conv.priority === "HIGH" ? "Alta" : "Baixa"}
                      </Badge>
                    )}
                    {conv.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {conv.unread > 0 && (
                      <span className="ml-auto inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function MessageSquareIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}
