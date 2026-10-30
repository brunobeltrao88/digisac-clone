"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User, Tag, Clock, GitBranch, Zap, ExternalLink } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

function Section({ title, icon: Icon, children, defaultOpen = true }: any) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className="h-4 w-4 text-gray-400" />
          {title}
        </div>
        {open ? <ChevronUp className="h-3.5 w-3.5 text-gray-400" /> : <ChevronDown className="h-3.5 w-3.5 text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export function ConversationInfo() {
  return (
    <div className="flex h-full w-72 flex-col overflow-y-auto border-l border-gray-200 bg-white shrink-0">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Informações</h3>
      </div>

      {/* Contact */}
      <Section title="Contato" icon={User}>
        <div className="flex items-center gap-3 mb-3">
          <Avatar name="João Silva" size="md" />
          <div>
            <p className="text-sm font-semibold text-gray-900">João Silva</p>
            <p className="text-xs text-gray-500">+55 11 99999-1234</p>
          </div>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-700">joao@email.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Conversas</span>
            <span className="text-gray-700 font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Desde</span>
            <span className="text-gray-700">Jan 2024</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" />
          Ver perfil completo
        </Button>
      </Section>

      {/* Conversation */}
      <Section title="Atendimento" icon={Clock}>
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Número</span>
            <span className="font-medium text-gray-700">#247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Canal</span>
            <span className="text-gray-700">🟢 WhatsApp</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Prioridade</span>
            <Badge variant="warning">Alta</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Iniciado</span>
            <span className="text-gray-700">Hoje, 14:32</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">1ª resposta</span>
            <span className="text-gray-700">2min 14s</span>
          </div>
        </div>
      </Section>

      {/* Agent & Department */}
      <Section title="Agente & Departamento" icon={GitBranch}>
        <div className="space-y-2">
          <div>
            <p className="mb-1 text-xs text-gray-500">Responsável</p>
            <div className="flex items-center gap-2">
              <Avatar name="Ana Atendente" size="xs" status="online" />
              <span className="text-sm text-gray-700">Ana Atendente</span>
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-500">Departamento</p>
            <span className="text-sm text-gray-700">Suporte</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Transferir
        </Button>
      </Section>

      {/* Tags */}
      <Section title="Tags" icon={Tag} defaultOpen={true}>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {["VIP", "Pedido"].map((tag) => (
            <Badge key={tag} variant="outline" className="cursor-default">
              {tag}
            </Badge>
          ))}
        </div>
        <button className="text-xs text-indigo-600 hover:underline">+ Adicionar tag</button>
      </Section>

      {/* Bot / Automation */}
      <Section title="Automação" icon={Zap} defaultOpen={false}>
        <p className="text-xs text-gray-500 mb-2">Nenhum bot ativo nesta conversa.</p>
        <button className="text-xs text-indigo-600 hover:underline">Ativar bot</button>
      </Section>
    </div>
  );
}
