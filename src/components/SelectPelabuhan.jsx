import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const SelectPelabuhan = ({ negaraId, onSelect }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!negaraId) return;

    const filter = {
      where: {
        id_negara: negaraId,
      },
    };

    const encodedFilter = encodeURIComponent(JSON.stringify(filter));
    axios
      .get(`http://202.157.176.100:3001/pelabuhans?filter=${encodedFilter}`)
      .then((res) => {
        const opts = res.data.map((item) => ({
          label: item.nama_pelabuhan,
          value: item.id_pelabuhan,
        }));
        setOptions(opts);
      })
      .catch((err) => {
        console.error("Error fetch pelabuhan:", err);
      });
  }, [negaraId]);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Pelabuhan</label>
      <Select
        options={options}
        onChange={(selected) => {
          onSelect && onSelect(selected);
        }}
        placeholder="Pilih pelabuhan"
      />
    </div>
  );
};

export default SelectPelabuhan;
