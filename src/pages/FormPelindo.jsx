import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SelectNegara from "../components/SelectNegara";
import SelectPelabuhan from "../components/SelectPelabuhan";
import SelectBarang from "../components/SelectBarang";
import { toRupiah } from "../utils/format";
import pelindoLogo from "../assets/pelindo-logo.png";

const FormPelindo = () => {
  const [negara, setNegara] = useState(null);
  const [negaraId, setNegaraId] = useState(null);
  const [pelabuhan, setPelabuhan] = useState(null);
  const [barang, setBarang] = useState(null);
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
  const totalEditable = hargaNumber - (hargaNumber * diskonNumber) / 100;
  const totalReadonly = barang?.harga - (barang?.harga * barang?.diskon) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-inter overflow-hidden">
      <div className="max-w-3xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <img src={pelindoLogo} alt="Pelindo" className="w-160 h-16" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6"
        >
          <SelectNegara
            onSelect={(v) => {
              setNegara(v);
              setNegaraId(v?.value);
              setPelabuhan(null);
              setBarang(null);
            }}
          />

          <SelectPelabuhan
            negaraId={negaraId}
            onSelect={(v) => {
              setPelabuhan(v);
              setBarang(null);
            }}
          />

          <SelectBarang
            pelabuhanId={pelabuhan?.value}
            onSelect={(barang) => setBarang(barang)}
          />

          {barang && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-lg text-slate-700 mb-2">
                  Informasi Barang
                </h3>
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

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-700 mb-2">
                  Harga & Diskon
                </h3>

                <div className="mb-3">
                  <label className="block font-medium text-gray-600 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={diskonEditable}
                    onChange={(e) => setDiskonEditable(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="Masukkan diskon"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pelindoBlue outline-none"
                  />
                </div>

                <div className="mb-3">
                  <label className="block font-medium text-gray-600 mb-1">
                    Harga
                  </label>
                  <input
                    type="number"
                    value={hargaEditable}
                    onChange={(e) => setHargaEditable(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="Masukkan harga"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pelindoBlue outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-600 mb-1">
                    Total
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={toRupiah(totalEditable)}
                    className="w-full bg-gray-100 border rounded-lg px-3 py-2 text-gray-700"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FormPelindo;
