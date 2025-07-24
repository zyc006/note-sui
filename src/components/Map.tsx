// import { useState } from "react";
import type { GridCell, GridData } from "../types";
interface MapProps {
  gridData: GridData;
  curNode: GridCell;
  setCurNode: (node: GridCell) => void;
}

export function Map({ gridData, curNode, setCurNode }: MapProps) {
  function handleClick(cell: GridCell) {
    if (cell.row == 2 && cell.col == 3) return;
    const updatedCell = gridData[cell.row][cell.col];
    setCurNode(updatedCell);
  }
  return (
    <div className="w-2xl grid grid-cols-7 gap-4">
      {/* // 使用 flat() 将二维数组转为一维 */}
      {gridData.flat().map((cell) => (
        <div
          className={`w-16 h-16 border rounded-sm flex justify-center items-center hover:cursor-pointer ${
            cell.row === curNode.row && cell.col === curNode.col
              ? "border-white shadow-md"
              : "border-gray-600"
          }`}
          style={{ backgroundColor: cell.color }}
          key={cell.id}
          // 添加数据属性存储行列信息
          data-row={cell.row}
          data-col={cell.col}
          onClick={() => handleClick(cell)}
        >
          {cell.content}
        </div>
      ))}
    </div>
  );
}
