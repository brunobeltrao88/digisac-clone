"use client";

import { useState } from "react";
import { Building, Users, Tag, MessageSquare, Bell, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

const SECTIONS = [
  { key: "company", label: "Empresa", icon: Building },
  { key: "agents", label: "Agentes", icon: Users },
  { key: "tags", label: "Tags", icon: Tag },
  { key: "quick-replies", label: "Respostas rápidas", icon: MessageSquare },
  { key: "notifications", label: "Notificações", icon: Bell },
  { key: "security", label: "Segurança", icon: Shield },
];

export default function SettingsPage() {
  const [active, setActive] = useState("company");

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-56 shrink-0 border-r border-gray-200 bg-white py-4">
        <h2 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Configurações</h2>
        <nav className="space-y-0.5 px-2">
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active === key ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {active === "company" && <CompanySettings />}
        {active === "tags" && <TagsSettings />}
        {active === "quick-replies" && <QuickRepliesSettings />}
        {active !== "company" && active !== "tags" && active !== "quick-replies" && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p className="text-lg">Em construção</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CompanySettings() {
  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Informações da empresa</h2>
        <p className="text-sm text-gray-500">Dados da sua organização</p>
      </div>
      <div className="space-y-4">
        <Input label="Nome da empresa" defaultValue="Minha Empresa" />
        <Input label="Slug (URL)" defaultValue="minha-empresa" />
        <Input label="E-mail de contato" type="email" defaultValue="contato@empresa.com.br" />
        <Input label="Telefone" defaultValue="+55 11 3333-4444" />
      </div>
      <Button>Salvar alterações</Button>
    </div>
  );
}

function TagsSettings() {
  const [tags, setTags] = useState([
    { id: "1", name: "VIP", color: "#6366f1" },
    { id: "2", name: "Entrega", color: "#f59e0b" },
    { id: "3", name: "Cancelamento", color: "#ef4444" },
    { id: "4", name: "Pedido", color: "#10b981" },
  ]);

  return (
    <div className="max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Tags</h2>
          <p className="text-sm text-gray-500">Categorize contatos e conversas</p>
        </div>
        <Button size="sm">+ Nova tag</Button>
      </div>
      <div className="space-y-2">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <input type="color" value={tag.color} onChange={() => {}} className="h-7 w-7 cursor-pointer rounded-md border-0" />
            <span className="flex-1 text-sm font-medium text-gray-900">{tag.name}</span>
            <button className="text-xs text-gray-400 hover:text-red-500">Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickRepliesSettings() {
  const REPLIES = [
    { id: "1", shortcut: "oi", title: "Saudação", content: "Olá! Tudo bem? Como posso te ajudar hoje?" },
    { id: "2", shortcut: "aguarde", title: "Aguardar", content: "Só um momentinho, vou verificar para você! 😊" },
    { id: "3", shortcut: "tchau", title: "Encerramento", content: "Fico feliz em ter ajudado! Qualquer coisa, é só chamar. Até logo! 👋" },
  ];

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Respostas rápidas</h2>
          <p className="text-sm text-gray-500">Use <kbd className="rounded bg-gray-100 px-1">/shortcut</kbd> no chat</p>
        </div>
        <Button size="sm">+ Nova resposta</Button>
      </div>
      <div className="space-y-3">
        {REPLIES.map((r) => (
          <div key={r.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <code className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-mono text-indigo-700">/{r.shortcut}</code>
              <span className="text-sm font-medium text-gray-700">{r.title}</span>
            </div>
            <p className="text-sm text-gray-500">{r.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
