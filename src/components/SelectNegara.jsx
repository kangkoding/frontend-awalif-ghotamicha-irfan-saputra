import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Loader from "./Loader";

const SelectNegara = ({ onSelect }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://202.157.176.100:3001/negaras")
      .then((res) => {
        const opts = res.data.map((item) => ({
          label: item.nama_negara,
          value: item.id_negara,
        }));
        setOptions(opts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Negara</label>
      {loading ? (
        <Loader />
      ) : (
        <Select
          options={options}
          onChange={(selected) => {
            onSelect && onSelect(selected);
          }}
          placeholder="Pilih negara"
        />
      )}
    </div>
  );
};

export default SelectNegara;
