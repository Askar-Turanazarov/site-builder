import { redirect } from "next/navigation";

/** Отдельной витрины по адресу /demo нет — она живёт на портале. */
export default function DemoIndex() {
  redirect("/templates");
}
