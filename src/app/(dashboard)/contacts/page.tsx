"use client";

import { useState } from "react";
import { Search, Plus, Phone, Mail, Tag, MoreVertical, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_CONTACTS = [
  { id: "1", name: "João Silva", phone: "+55 11 99999-1234", email: "joao@email.com", tags: ["VIP"], conversations: 12 },
  { id: "2", name: "Maria Souza", phone: "+55 21 98888-5678", email: "maria@email.com", tags: ["Entrega"], conversations: 5 },
  { id: "3", name: "Carlos Lima", phone: "+55 11 97777-9012", email: "carlos@email.com", tags: [], conversations: 2 },
  { id: "4", name: "Ana Paula", phone: "+55 31 96666-3456", email: "ana@email.com", tags: ["VIP", "Cancelamento"], conversations: 8 },
  { id: "5", name: "Pedro Alves", phone: "+55 11 95555-7890", email: "pedro@email.com", tags: [], conversations: 1 },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Contatos</h1>
            <p className="text-sm text-gray-500">{MOCK_CONTACTS.length} contatos cadastrados</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Novo contato
          </Button>
        </div>
        <div className="mt-3 relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, telefone ou e-mail..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Telefone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Conversas</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} size="sm" />
                    <span className="text-sm font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {c.phone}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    {c.email}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {c.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-gray-600">{c.conversations}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-indigo-600" title="Iniciar conversa">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
