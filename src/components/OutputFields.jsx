import React, { useEffect, useState } from "react";
import { toRupiah } from "../utils/format";

const OutputFields = ({ barang }) => {
  const [hargaEditable, setHargaEditable] = useState("");
  const [diskonEditable, setDiskonEditable] = useState("");

  useEffect(() => {
    if (barang) {
      setHargaEditable(barang.harga?.toString() || "");
      setDiskonEditable(barang.diskon?.toString() || "");
    }
  }, [barang]);

  const hargaNumber = parseFloat(hargaEditable) || 0;
  const diskonNumber = parseFloat(diskonEditable) || 0;

  const totalReadonly = barang?.harga - (barang?.harga * barang?.diskon) / 100;
  const totalEditable = hargaNumber - (hargaNumber * diskonNumber) / 100;

  if (!barang) return null;

  return (
    <div className="space-y-6 mt-6">
      <div className="bg-gray-50 p-4 rounded border">
        <h3 className="font-bold text-lg mb-2">Informasi Barang</h3>
        <p>
          <strong>Deskripsi:</strong> {barang.deskripsi}
        </p>
        <p>
          <strong>Harga:</strong> {toRupiah(barang.harga)}
        </p>
        <p>
          <strong>Diskon:</strong> {barang.diskon}%
        </p>
        <p>
          <strong>Total:</strong> {toRupiah(totalReadonly)}
        </p>
      </div>

      <div className="bg-white p-4 rounded border">
        <div className="mb-3">
          <label className="block font-semibold mb-1">Discount (%)</label>
          <input
            type="number"
            value={diskonEditable}
            onChange={(e) => setDiskonEditable(e.target.value)}
            onFocus={(e) => e.target.select()}
            placeholder="Masukkan diskon"
            className="w-full border rounded px-3 py-1"
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Harga</label>
          <input
            type="number"
            value={hargaEditable}
            onChange={(e) => setHargaEditable(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
            className="w-full border rounded px-3 py-1"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Total</label>
          <input
            type="text"
            readOnly
            value={toRupiah(totalEditable)}
            className="w-full bg-gray-100 border rounded px-3 py-1 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default OutputFields;
