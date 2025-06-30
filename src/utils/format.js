export const toRupiah = (angka) => {
  if (typeof angka !== "number") return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(angka)
    .replace(",00", "");
};
