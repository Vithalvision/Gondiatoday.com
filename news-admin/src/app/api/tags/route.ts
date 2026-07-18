import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL TAGS
export async function GET() {
try {
const tags = await prisma.tag.findMany({
orderBy: {
id: "desc",
},
});


return NextResponse.json(tags);


} catch (error) {
console.error("GET TAGS ERROR:", error);
return NextResponse.json([], { status: 500 });
}
}

// CREATE TAG
export async function POST(req: Request) {
try {
const body = await req.json();

const name = body.name?.trim();

if (!name) {
  return NextResponse.json(
    { error: "Name is required" },
    { status: 400 }
  );
}

const slug =
  body.slug?.trim() ||
  name.toLowerCase().replace(/\s+/g, "-");

const description = body.description || "";

const existingTag = await prisma.tag.findFirst({
  where: {
    name: {
      equals: name,
      mode: "insensitive",
    },
  },
});

if (existingTag) {
  return NextResponse.json(existingTag);
}

const tag = await prisma.tag.create({
  data: {
    name,
    slug,
    description,
  },
});

return NextResponse.json(tag);


} catch (error) {
console.error("CREATE TAG ERROR:", error);


return NextResponse.json(
  { error: "Failed to create tag" },
  { status: 500 }
);


}
}

// DELETE TAG
export async function DELETE(req: Request) {
try {
const body = await req.json();


const id = Number(body.id);

if (!id || isNaN(id)) {
  return NextResponse.json(
    { error: "Invalid ID" },
    { status: 400 }
  );
}

await prisma.tag.delete({
  where: {
    id,
  },
});

return NextResponse.json({
  success: true,
});


} catch (error) {
console.error("DELETE TAG ERROR:", error);


return NextResponse.json(
  { error: "Failed to delete tag" },
  { status: 500 }
);


}
}
