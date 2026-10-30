"use client";

import { TrendingUp, MessageSquare, Clock, Users, CheckCircle, Star } from "lucide-react";

const STATS = [
  { label: "Conversas abertas", value: "247", delta: "+12%", icon: MessageSquare, color: "indigo" },
  { label: "Resolvidas hoje", value: "89", delta: "+5%", icon: CheckCircle, color: "green" },
  { label: "Tempo médio 1ª resp.", value: "3m 42s", delta: "-18%", icon: Clock, color: "blue" },
  { label: "Agentes online", value: "8/12", delta: null, icon: Users, color: "orange" },
  { label: "CSAT", value: "4.7", delta: "+0.2", icon: Star, color: "yellow" },
  { label: "Msgs recebidas (mês)", value: "12.430", delta: "+23%", icon: TrendingUp, color: "purple" },
];

const COLOR_MAP: Record<string, { bg: string; text: string; icon: string }> = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", icon: "text-indigo-500" },
  green: { bg: "bg-green-50", text: "text-green-700", icon: "text-green-500" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", icon: "text-orange-500" },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "text-yellow-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-500" },
};

const TOP_AGENTS = [
  { name: "Ana Atendente", resolved: 34, avgTime: "2m 10s", csat: 4.9 },
  { name: "Carlos Suporte", resolved: 28, avgTime: "3m 45s", csat: 4.7 },
  { name: "Julia Costa", resolved: 22, avgTime: "4m 02s", csat: 4.6 },
  { name: "Bruno Lima", resolved: 19, avgTime: "5m 15s", csat: 4.5 },
];

const CHANNEL_STATS = [
  { name: "WhatsApp Principal", msgs: 8240, pct: 67 },
  { name: "Instagram", msgs: 2100, pct: 17 },
  { name: "Chat do Site", msgs: 1450, pct: 12 },
  { name: "Telegram", msgs: 640, pct: 4 },
];

export default function ReportsPage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Relatórios</h1>
        <p className="text-sm text-gray-500">Visão geral do período atual</p>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {STATS.map((stat) => {
            const colors = COLOR_MAP[stat.color];
            return (
              <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <div className={`rounded-lg p-2 ${colors.bg}`}>
                    <stat.icon className={`h-4 w-4 ${colors.icon}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.delta && (
                  <p className={`mt-1 text-xs font-medium ${stat.delta.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {stat.delta} vs. mês anterior
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Agents */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Top Agentes (hoje)</h2>
            <div className="space-y-3">
              {TOP_AGENTS.map((agent, i) => (
                <div key={agent.name} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.resolved} resolvidos · {agent.avgTime} médio</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{agent.csat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channel distribution */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Mensagens por canal (mês)</h2>
            <div className="space-y-3">
              {CHANNEL_STATS.map((ch) => (
                <div key={ch.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-700">{ch.name}</span>
                    <span className="font-medium text-gray-900">{ch.msgs.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${ch.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
