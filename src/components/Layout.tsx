import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Map } from "./Map";
import { ItemOperator } from "./ItemOperator";
import type { GridCell } from "../types";

export function Layout() {
  const [gridData, setGridData] = useState(() => {
    if (localStorage.getItem("gridData")) {
      return JSON.parse(localStorage.getItem("gridData") || "");
    }
    const rows = 5;
    const cols = 7;

    // 计算中间位置（行索引从0开始）
    const middleRow = Math.floor(rows / 2); // 第3行（索引2）
    const middleCol = Math.floor(cols / 2); // 第4列（索引3）

    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => {
        // 检查是否是中间单元格
        const isCenter = rowIndex === middleRow && colIndex === middleCol;

        return {
          row: rowIndex,
          col: colIndex,
          id: `cell-${rowIndex + 1}-${colIndex + 1}`, // 唯一标识符
          content: isCenter ? "起始点" : "暂无", // 中间显示"起始点"，其他显示"暂无"
          color: "#3D3D3D",
          type: "unknown",
          tip: "",
        };
      })
    );
  });
  // 在组件内部
  const debouncedSave = debounce((data: GridCell[][]) => {
    localStorage.setItem("gridData", JSON.stringify(data));
  }, 500); // 500ms 延迟

  useEffect(() => {
    debouncedSave(gridData);
    return () => debouncedSave.cancel(); // 清理函数
  }, [gridData, debouncedSave]);
  const [curNode, setCurNode] = useState(() => {
    // 使用gridData的第一个元素作为初始值
    return gridData[0][0];
  });
  return (
    <div className="w-screen h-screen bg-[rgb(24,24,24)] flex justify-around items-center text-white overflow-hidden">
      <Map
        gridData={gridData}
        curNode={curNode as GridCell}
        setCurNode={setCurNode}
      ></Map>
      <div className="basis-1/3 h-full">
        {curNode && (
          <ItemOperator
            setGridData={setGridData}
            curNode={curNode as GridCell}
            setCurNode={setCurNode}
          ></ItemOperator>
        )}
      </div>
    </div>
  );
}
