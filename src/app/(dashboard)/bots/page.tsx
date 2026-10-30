"use client";

import { Plus, Zap, ToggleLeft, ToggleRight, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const MOCK_BOTS = [
  {
    id: "1", name: "Boas-vindas", active: true, trigger: "FIRST_MESSAGE",
    description: "Envia mensagem de boas-vindas e apresenta opções de menu",
    conversations: 1240,
  },
  {
    id: "2", name: "FAQ Automático", active: true, trigger: "KEYWORD",
    description: "Responde perguntas frequentes automaticamente via palavras-chave",
    conversations: 567,
  },
  {
    id: "3", name: "Triagem de Leads", active: false, trigger: "ALWAYS",
    description: "Qualifica leads e distribui para o departamento correto",
    conversations: 89,
  },
];

const TRIGGER_LABELS: Record<string, string> = {
  FIRST_MESSAGE: "Primeira mensagem",
  KEYWORD: "Palavra-chave",
  ALWAYS: "Sempre",
};

export default function BotsPage() {
  const [bots, setBots] = useState(MOCK_BOTS);

  function toggle(id: string) {
    setBots((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b));
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Bots & Automações</h1>
            <p className="text-sm text-gray-500">Automatize respostas e fluxos de atendimento</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Novo bot
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bots.map((bot) => (
            <div key={bot.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", bot.active ? "bg-indigo-100" : "bg-gray-100")}>
                    <Zap className={cn("h-4 w-4", bot.active ? "text-indigo-600" : "text-gray-400")} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{bot.name}</p>
                    <Badge variant={bot.active ? "success" : "default"}>
                      {bot.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
                <button onClick={() => toggle(bot.id)} className="text-gray-400 hover:text-indigo-600">
                  {bot.active ? <ToggleRight className="h-6 w-6 text-indigo-600" /> : <ToggleLeft className="h-6 w-6" />}
                </button>
              </div>

              <p className="mb-3 text-xs text-gray-500">{bot.description}</p>

              <div className="mb-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
                  {TRIGGER_LABELS[bot.trigger]}
                </span>
                <span className="text-gray-500">{bot.conversations.toLocaleString("pt-BR")} interações</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Edit className="h-3.5 w-3.5" />
                  Editar fluxo
                </Button>
                <button className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-red-500 hover:border-red-300">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add bot */}
          <button className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors">
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Criar novo bot</span>
          </button>
        </div>
      </div>
    </div>
  );
}
