const SKU_PREFIX = "DDZ";

function sanitizeSegment(value?: string, fallback = "GEN") {
  if (!value) return fallback;
  const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (!alphanumeric) return fallback;
  return alphanumeric.slice(0, 4);
}

export function generateProductSku(name?: string, category?: string) {
  const categorySegment = sanitizeSegment(
    category
      ?.split(/\s+/)
      .map((word) => word[0])
      .join(""),
    "CAT"
  );

  const nameSegment = sanitizeSegment(name, "ITEM");
  const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timeSegment = Date.now().toString(36).slice(-4).toUpperCase();

  return `${SKU_PREFIX}-${categorySegment}${nameSegment}-${timeSegment}${randomSegment}`;
}


