import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <CategoryForm
      initial={{
        id: category.id,
        slug: category.slug,
        nameRu: category.nameRu,
        nameUz: category.nameUz,
        nameEn: category.nameEn,
        descRu: category.descRu ?? "",
        descUz: category.descUz ?? "",
        descEn: category.descEn ?? "",
        order: category.order,
      }}
    />
  );
}
