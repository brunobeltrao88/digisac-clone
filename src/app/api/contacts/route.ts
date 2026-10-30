import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const q = searchParams.get("q") ?? "";

  if (!orgId) return NextResponse.json({ error: "orgId required" }, { status: 400 });

  const contacts = await prisma.contact.findMany({
    where: {
      organizationId: orgId,
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { phone: { contains: q } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      }),
    },
    include: { tags: { include: { tag: true } } },
    orderBy: { name: "asc" },
    take: 100,
  });

  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, organizationId, notes, customFields } = body;

  const contact = await prisma.contact.create({
    data: { name, phone, email, organizationId, notes, customFields },
  });

  return NextResponse.json(contact, { status: 201 });
}
