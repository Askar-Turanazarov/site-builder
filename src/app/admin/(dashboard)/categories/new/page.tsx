import { CategoryForm } from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <CategoryForm
      initial={{ slug: "", nameRu: "", nameUz: "", nameEn: "", descRu: "", descUz: "", descEn: "", order: 0 }}
    />
  );
}
