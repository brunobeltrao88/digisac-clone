import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "OPEN";
  const orgId = searchParams.get("orgId");

  if (!orgId) return NextResponse.json({ error: "orgId required" }, { status: 400 });

  const conversations = await prisma.conversation.findMany({
    where: {
      organizationId: orgId,
      status: status as any,
    },
    include: {
      contact: true,
      channel: true,
      agents: { include: { user: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      tags: { include: { tag: true } },
      _count: { select: { messages: true } },
    },
    orderBy: { lastMessageAt: "desc" },
    take: 50,
  });

  return NextResponse.json(conversations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contactId, channelId, organizationId, departmentId } = body;

  const lastConv = await prisma.conversation.findFirst({
    where: { organizationId },
    orderBy: { number: "desc" },
  });

  const conversation = await prisma.conversation.create({
    data: {
      organizationId,
      channelId,
      contactId,
      departmentId,
      number: (lastConv?.number ?? 0) + 1,
    },
    include: { contact: true, channel: true },
  });

  return NextResponse.json(conversation, { status: 201 });
}
