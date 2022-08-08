import React, { useEffect } from "react";
import esbuild from "esbuild-wasm";

import "./styles/cell-list.css";
import { useTypedSelector, useActionCreators } from "../hooks";
import CellItem from "./CellItem";
import InsertBar from "./InsertBar";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return null;

    const { order, data } = cells;

    return order.map((item) => {
      return data[item];
    });
  });

  const { fetchCells } = useActionCreators();

  useEffect(() => {
    const startService = async () => {
      await esbuild.initialize({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });
    };

    startService();
  }, []);

  useEffect(() => {
    fetchCells();
  }, []);

  const renderList = () => {
    if (!cells) return null;

    return cells.map((cell) => {
      return (
        <React.Fragment key={cell.id}>
          <CellItem cell={cell} />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="cell-list">
      <InsertBar forceVisible={cells ? cells.length === 0 : false} id={null} />
      {renderList()}
    </div>
  );
};

export default CellList;
