import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z.string().min(1),
  type: z.enum(["TEXT", "IMAGE", "AUDIO", "VIDEO", "DOCUMENT", "NOTE"]).default("TEXT"),
  mediaUrl: z.string().url().optional(),
});

export const updateConversationSchema = z.object({
  status: z.enum(["OPEN", "PENDING", "RESOLVED", "CLOSED"]).optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
  departmentId: z.string().optional().nullable(),
  agentId: z.string().optional().nullable(),
});
