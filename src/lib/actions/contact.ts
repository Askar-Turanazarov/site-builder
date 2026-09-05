"use server";

import { prisma } from "@/lib/prisma";
import { CONTACT_RULE, clientKey, hit } from "@/lib/rate-limit";

// Форма открыта всем, поэтому у неё есть верхние границы: без них бот заливает
// базу и мегабайтными значениями, и бесконечным числом полей.
const MAX_FIELDS = 20;
const MAX_VALUE = 2000;
const MAX_LABEL = 200;

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

  const fields = labels.slice(0, MAX_FIELDS).map((label, i) => ({
    label: String(label).slice(0, MAX_LABEL),
    value: String(formData.get(`field_${i}`) ?? "").slice(0, MAX_VALUE),
  }));

  // Honeypot: a hidden field real users never fill in.
  if (formData.get("__hp")) {
    return { success: true };
  }

  // Отвечаем успехом и при превышении частоты: боту незачем знать, что его
  // отсекли, а живой посетитель столько раз подряд не отправляет.
  if (!hit("contact", await clientKey(), CONTACT_RULE)) {
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
