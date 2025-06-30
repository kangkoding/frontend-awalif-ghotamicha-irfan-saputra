import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const SelectBarang = ({ pelabuhanId, onSelect }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!pelabuhanId) return;

    const filter = {
      where: {
        id_pelabuhan: pelabuhanId,
      },
    };

    const encodedFilter = encodeURIComponent(JSON.stringify(filter));

    axios
      .get(`http://202.157.176.100:3001/barangs?filter=${encodedFilter}`)
      .then((res) => {
        const opts = res.data.map((item) => ({
          label: item.nama_barang,
          value: item.id,
          data: item,
        }));
        setOptions(opts);
      })
      .catch((err) => {
        console.error("Error fetch barang:", err);
      });
  }, [pelabuhanId]);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Barang</label>
      <Select
        options={options}
        onChange={(selected) => {
          onSelect(selected?.data);
        }}
        placeholder="Pilih barang"
      />
    </div>
  );
};

export default SelectBarang;
