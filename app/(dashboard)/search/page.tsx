import { db } from "@/lib/db";
import Categories from "./_componets/Categories";

const SearhPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div>
      <Categories items={categories} />
    </div>
  );
};

export default SearhPage;
