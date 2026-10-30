"use client";

import { useState } from "react";
import { Plus, Settings, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const CHANNEL_TYPES = [
  { type: "WHATSAPP_BUSINESS", label: "WhatsApp Business API", icon: "🟢", color: "green" },
  { type: "INSTAGRAM", label: "Instagram DM", icon: "🟣", color: "purple" },
  { type: "TELEGRAM", label: "Telegram", icon: "✈️", color: "blue" },
  { type: "FACEBOOK", label: "Facebook Messenger", icon: "🔵", color: "blue" },
  { type: "WEBCHAT", label: "Chat do Site", icon: "💬", color: "indigo" },
  { type: "EMAIL", label: "E-mail", icon: "📧", color: "gray" },
];

const MOCK_CHANNELS = [
  { id: "1", name: "WhatsApp Principal", type: "WHATSAPP_BUSINESS", status: "ACTIVE", conversations: 247, messagesMonth: 3420 },
  { id: "2", name: "Instagram Loja", type: "INSTAGRAM", status: "ACTIVE", conversations: 89, messagesMonth: 1200 },
  { id: "3", name: "Chat Site", type: "WEBCHAT", status: "ACTIVE", conversations: 56, messagesMonth: 780 },
  { id: "4", name: "Telegram Suporte", type: "TELEGRAM", status: "INACTIVE", conversations: 12, messagesMonth: 45 },
];

export default function ChannelsPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Canais</h1>
            <p className="text-sm text-gray-500">Gerencie suas integrações de atendimento</p>
          </div>
          <Button onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" />
            Novo canal
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_CHANNELS.map((channel) => {
            const info = CHANNEL_TYPES.find((t) => t.type === channel.type);
            return (
              <div key={channel.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xl">
                      {info?.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{channel.name}</p>
                      <p className="text-xs text-gray-500">{info?.label}</p>
                    </div>
                  </div>
                  <Badge variant={channel.status === "ACTIVE" ? "success" : "default"}>
                    {channel.status === "ACTIVE" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{channel.conversations}</p>
                    <p className="text-xs text-gray-500">Conversas</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{channel.messagesMonth.toLocaleString("pt-BR")}</p>
                    <p className="text-xs text-gray-500">Msgs/mês</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Settings className="h-3.5 w-3.5" />
                    Configurar
                  </Button>
                  {channel.status === "ACTIVE" ? (
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-red-500 hover:border-red-300">
                      <WifiOff className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-green-600 hover:border-green-300">
                      <Wifi className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add card */}
          <button
            onClick={() => setShowAdd(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-gray-400 transition-colors hover:border-indigo-300 hover:text-indigo-500"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Adicionar canal</span>
          </button>
        </div>

        {/* Available channel types */}
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Canais disponíveis</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {CHANNEL_TYPES.map((ct) => (
              <button
                key={ct.type}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50"
              >
                <span className="text-2xl">{ct.icon}</span>
                <span className="text-xs font-medium text-gray-700">{ct.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
