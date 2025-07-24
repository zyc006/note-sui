import type { ChangeEvent } from "react";
import type { GridCell, GridData } from "../types";
interface ItemOperatorProps {
  setGridData: React.Dispatch<React.SetStateAction<GridData>>;
  curNode: GridCell;
  setCurNode: React.Dispatch<React.SetStateAction<GridCell>>;
}

export function ItemOperator({
  setGridData,
  curNode,
  setCurNode,
}: ItemOperatorProps) {
  const nodeType = [
    {
      name: "未知",
      id: "unknown",
      color: "#3d3d3d",
    },
    {
      name: "祸乱",
      id: "huoluan",
      color: "#cf48be",
    },
    {
      name: "传说",
      id: "chuanshuo",
      color: "#008a7f",
    },
    {
      name: "杂疑",
      id: "zayi",
      color: "#008a7f",
    },
    {
      name: "故肆",
      id: "gusi",
      color: "#008a7f",
    },
    {
      name: "常乐",
      id: "changle",
      color: "#008a7f",
    },
    {
      name: "筹谋",
      id: "choumou",
      color: "#008a7f",
    },
    {
      name: "拾遗",
      id: "shiyi",
      color: "#007b3e",
    },
    {
      name: "易与",
      id: "yiyu",
      color: "#007b3e",
    },
    {
      name: "无",
      id: "blank",
      color: "#0e0e0e",
    },
  ];
  const { row, col } = curNode;
  function handleClick(node: { name: string; id: string; color: string }) {
    const newNode = {
      ...curNode,
      content: node.name,
      color: node.color,
      type: node.id,
    };
    setGridData((prevGridData: GridData) => {
      // Clone the grid data to avoid mutating state directly
      const newGridData = prevGridData.map((row) => [...row]);
      // Update the specific cell's content or id as needed

      newGridData[row][col] = newNode;
      return newGridData;
    });
    setCurNode(newNode);
  }
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const updatedNode = {
      ...curNode,
      tip: e.target.value,
    };
    // 更新curNode
    setCurNode(updatedNode);
    // 同时更新gridData中对应的节点
    setGridData((prevGridData: GridData) => {
      const newGridData = prevGridData.map((row) => [...row]);
      newGridData[row][col] = updatedNode;
      return newGridData;
    });
  }
  return (
    <div className="h-screen w-2xl bg-[rgb(36,36,36)] p-5 flex flex-col overflow-hidden">
      <div className="text-white text-lg">
        编辑格点【{row + 1}，{col + 1}】
      </div>
      <div className="overflow-y-auto flex-1 scrollbar-hide-until-hover">
        <div className="node-type-container">
          <div className="flex items-center">
            <div className="w-1.5 h-4 bg-white mr-2 rounded-xs"></div>
            <div className="text-base my-4">节点类型</div>
          </div>
          <div className="flex flex-wrap gap-5 mb-4">
            {nodeType.map(
              (node: { name: string; id: string; color: string }) => (
                <button
                  key={node.id}
                  className={`
                w-16 h-8 flex items-center justify-center
                border-1 rounded-lg transition-all duration-300
                hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-1 focus:ring-opacity-50 text-white
                ${
                  node.id === curNode.type
                    ? "border-white shadow-md"
                    : "border-gray-600"
                }
              `}
                  style={{
                    backgroundColor: node.color,
                  }}
                  onClick={() => handleClick(node)}
                >
                  {node.name}
                </button>
              )
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1.5 h-4 bg-white mr-2 rounded-xs"></div>
          <div className="text-base my-4">奖励</div>
        </div>
        <div className="flex items-center">
          <div className="w-1.5 h-4 bg-white mr-2 rounded-xs"></div>
          <div className="text-base my-4">笔记</div>
        </div>
        <div className="mb-4">
          <textarea
            className="block w-full h-[300px] p-2 resize-none bg-white rounded-xs text-black"
            value={curNode.tip}
            onChange={(e) => handleChange(e)}
            placeholder="在此输入笔记内容..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
