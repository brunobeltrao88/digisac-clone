"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send, Paperclip, Smile, MoreVertical,
  Phone, Tag, UserPlus, CheckCheck, Clock, X, Mic, Image, FileText,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const MOCK_MESSAGES = [
  {
    id: "1", direction: "INBOUND", content: "Olá, preciso de ajuda com meu pedido #12345", createdAt: new Date(Date.now() - 30 * 60 * 1000), status: "READ", sender: null,
  },
  {
    id: "2", direction: "OUTBOUND", content: "Olá João! Pode me informar o número do pedido para verificar?", createdAt: new Date(Date.now() - 28 * 60 * 1000), status: "READ", sender: { name: "Ana Atendente" },
  },
  {
    id: "3", direction: "INBOUND", content: "O número é #12345, fiz o pedido há 3 dias e ainda não recebi.", createdAt: new Date(Date.now() - 25 * 60 * 1000), status: "READ", sender: null,
  },
  {
    id: "4", direction: "OUTBOUND", content: "Entendido! Vou verificar o status do seu pedido agora mesmo. Um momento, por favor.", createdAt: new Date(Date.now() - 20 * 60 * 1000), status: "READ", sender: { name: "Ana Atendente" },
  },
  {
    id: "5", direction: "INBOUND", content: "Obrigado! Aguardo.", createdAt: new Date(Date.now() - 5 * 60 * 1000), status: "READ", sender: null,
  },
];

const STATUS_ICON = {
  QUEUED: <Clock className="h-3 w-3" />,
  SENT: <CheckCheck className="h-3 w-3 text-gray-400" />,
  DELIVERED: <CheckCheck className="h-3 w-3 text-gray-400" />,
  READ: <CheckCheck className="h-3 w-3 text-blue-500" />,
  FAILED: <X className="h-3 w-3 text-red-500" />,
};

export function ChatPanel() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [isNote, setIsNote] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        direction: "OUTBOUND",
        content: text,
        createdAt: new Date(),
        status: "SENT",
        sender: { name: "Você" },
      },
    ]);
    setText("");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#f0f2f5]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <Avatar name="João Silva" size="sm" status="online" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">João Silva</p>
          <p className="text-xs text-gray-500">+55 11 99999-1234 · WhatsApp Principal</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Tag className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm" className="ml-2">
            Resolver
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg, i) => {
          const isOut = msg.direction === "OUTBOUND";
          const showDate =
            i === 0 ||
            format(messages[i - 1].createdAt, "dd/MM") !== format(msg.createdAt, "dd/MM");

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-3">
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-500 shadow-sm">
                    {format(msg.createdAt, "dd 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>
              )}
              <div className={cn("flex", isOut ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-3 py-2 shadow-sm",
                    isOut
                      ? "rounded-tr-sm bg-indigo-600 text-white"
                      : "rounded-tl-sm bg-white text-gray-900"
                  )}
                >
                  {isOut && msg.sender && (
                    <p className="mb-0.5 text-xs font-medium text-indigo-200">{msg.sender.name}</p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className={cn("mt-1 flex items-center justify-end gap-1", isOut ? "text-indigo-200" : "text-gray-400")}>
                    <span className="text-xs">{format(msg.createdAt, "HH:mm")}</span>
                    {isOut && STATUS_ICON[msg.status as keyof typeof STATUS_ICON]}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-3">
        {/* Mode toggle */}
        <div className="mb-2 flex gap-1">
          <button
            onClick={() => setIsNote(false)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              !isNote ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            Responder
          </button>
          <button
            onClick={() => setIsNote(true)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              isNote ? "bg-yellow-100 text-yellow-700" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            Nota interna
          </button>
        </div>

        <div className={cn("flex items-end gap-2 rounded-xl border px-3 py-2", isNote ? "border-yellow-300 bg-yellow-50" : "border-gray-200 bg-gray-50")}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder={isNote ? "Adicionar nota interna..." : "Digite sua mensagem..."}
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none",
              "max-h-32 min-h-[20px]"
            )}
            style={{ height: "auto" }}
          />
          <div className="flex items-center gap-1 shrink-0">
            <button className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600">
              <Paperclip className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600">
              <Image className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600">
              <Smile className="h-4 w-4" />
            </button>
            <button
              onClick={send}
              disabled={!text.trim()}
              className="ml-1 rounded-lg bg-indigo-600 p-1.5 text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick replies hint */}
        <p className="mt-1.5 text-xs text-gray-400">
          Digite <kbd className="rounded bg-gray-100 px-1 font-mono">/</kbd> para respostas rápidas
        </p>
      </div>
    </div>
  );
}
