"use server";

import { prisma } from "@/lib/prisma";

export interface ContactFormState {
  success: boolean;
}

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = String(formData.get("__locale") ?? "ru");
  const pageSlug = formData.get("__pageSlug");
  const labelsRaw = String(formData.get("__labels") ?? "[]");

  let labels: string[] = [];
  try {
    labels = JSON.parse(labelsRaw);
  } catch {
    labels = [];
  }

  const fields = labels.map((label, i) => ({
    label,
    value: String(formData.get(`field_${i}`) ?? ""),
  }));

  // Honeypot: a hidden field real users never fill in.
  if (formData.get("__hp")) {
    return { success: true };
  }

  await prisma.contactMessage.create({
    data: {
      locale,
      pageSlug: pageSlug ? String(pageSlug) : null,
      fieldsRaw: JSON.stringify(fields),
    },
  });

  return { success: true };
}
