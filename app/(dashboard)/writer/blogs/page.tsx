import { db } from "@/lib/db";
import { columns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";

export default async function DemoPage() {
  const blogs = await db.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={blogs} />
    </div>
  );
}
