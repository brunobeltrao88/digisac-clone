// Manual type definitions — mirrors prisma/schema.prisma
// Run `npx prisma@5 generate` after setting up the DB to replace with generated types

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: "FREE" | "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string | null;
  role: "OWNER" | "ADMIN" | "SUPERVISOR" | "AGENT";
  status: "ONLINE" | "BUSY" | "AWAY" | "OFFLINE";
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  type: "WHATSAPP" | "WHATSAPP_BUSINESS" | "TELEGRAM" | "INSTAGRAM" | "FACEBOOK" | "WEBCHAT" | "EMAIL" | "SMS";
  status: "ACTIVE" | "INACTIVE" | "ERROR";
  config: Record<string, unknown>;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  avatar: string | null;
  notes: string | null;
  customFields: Record<string, unknown>;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  organizationId: string;
}

export interface Department {
  id: string;
  name: string;
  description: string | null;
  organizationId: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  number: number;
  status: "OPEN" | "PENDING" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  subject: string | null;
  lastMessageAt: Date | null;
  closedAt: Date | null;
  organizationId: string;
  channelId: string;
  contactId: string | null;
  departmentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO" | "DOCUMENT" | "LOCATION" | "STICKER" | "TEMPLATE" | "INTERACTIVE" | "NOTE";
  content: string;
  mediaUrl: string | null;
  mediaType: string | null;
  direction: "INBOUND" | "OUTBOUND";
  status: "QUEUED" | "SENT" | "DELIVERED" | "READ" | "FAILED";
  externalId: string | null;
  conversationId: string;
  senderId: string | null;
  createdAt: Date;
}

export interface QuickReply {
  id: string;
  shortcut: string;
  title: string;
  content: string;
  organizationId: string;
  createdAt: Date;
}

export interface Bot {
  id: string;
  name: string;
  active: boolean;
  trigger: "FIRST_MESSAGE" | "KEYWORD" | "ALWAYS";
  flow: unknown[];
  organizationId: string;
  createdAt: Date;
}

export type ConversationWithRelations = Conversation & {
  contact: Contact | null;
  channel: Channel;
  agents: Array<{ user: User }>;
  messages: Message[];
  tags: Array<{ tag: Tag }>;
  _count: { messages: number };
};

export type MessageWithSender = Message & {
  sender: User | null;
};
