import { type ChangeEvent } from "react";
import type { GridCell, GridData } from "../types";
interface NodeOperatorProps {
  gridData: GridData;
  setGridData: React.Dispatch<React.SetStateAction<GridData>>;
  curRow: number;
  curCol: number;
}

export function NodeOperator({
  gridData,
  setGridData,
  curRow,
  curCol,
}: NodeOperatorProps) {
  const curNode = gridData[curRow][curCol];
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

      newGridData[curRow][curCol] = newNode;
      return newGridData;
    });
  }
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const updatedNode = {
      ...curNode,
      tip: e.target.value,
    };
    // 同时更新gridData中对应的节点
    setGridData((prevGridData: GridData) => {
      const newGridData = prevGridData.map((row) => [...row]);
      newGridData[curRow][curCol] = updatedNode;
      return newGridData;
    });
  }
  return (
    <div className="h-screen w-2xl bg-[rgb(36,36,36)] p-5 flex flex-col overflow-hidden">
      <div className="text-white text-lg">
        编辑格点【{curNode.row + 1}，{curNode.col + 1}】
      </div>
      <div className="overflow-y-auto flex-1 scrollbar-hide-until-hover">
        <div className="node-type-container">
          <Title text="节点类型" />
          <div className="flex flex-wrap gap-2 ml-2">
            {nodeType.map(
              (node: { name: string; id: string; color: string }) => (
                <button
                  key={node.id}
                  className={`
                w-16 h-8 flex items-center justify-center
                border-1 rounded-lg transition-all duration-300
                hover:scale-105 hover:shadow-sm
                text-white
                ${
                  node.id === curNode.type
                    ? "border-white shadow-md outline-none"
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
        <Reward
          nodeType={curNode.type}
          curNode={curNode}
          setGridData={setGridData}
        ></Reward>
        <Title text="笔记"></Title>
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

function Reward({
  nodeType,
  curNode,
  setGridData,
}: {
  nodeType: string;
  curNode: GridCell;
  setGridData: React.Dispatch<React.SetStateAction<GridData>>;
}) {
  const rewardInfo = {
    zayi: [
      {
        name: "更多奖励",
        info: [
          "≥50源石锭+",
          "≥15生命上限+",
          "=1生命值+",
          "≥4炎干员+",
          "≥12希望+",
        ],
      },
      {
        name: "普通奖励",
        info: [
          "≥20源石锭",
          "≥10生命上限",
          "<=3生命值",
          "≥2炎干员",
          "≥6希望",
          "-5源石锭掷出通宝",
        ],
      },
      {
        name: "结局事件",
        info: ["是", "否"],
      },
    ],
    changle: [
      {
        name: "事件",
        info: ["令 / 掷地有声", "黍 / 种因得果", "年 / 三缺一"],
      },
    ],
    shiyi: [
      {
        name: "普通奖励",
        info: [
          "+8源石锭",
          "+3生命上限",
          "+5生命值",
          "+4护盾",
          "招募券",
          "通宝",
        ],
      },
    ],
  };
  return (
    <>
      <div>
        <Title text="奖励"></Title>
      </div>
      {nodeType === "zayi" && (
        <div>
          {rewardInfo.zayi.map((item) => (
            <NodeEventInfo
              key={item.name}
              eventInfo={item}
              curNode={curNode}
              setGridData={setGridData}
            ></NodeEventInfo>
          ))}
        </div>
      )}
      {nodeType === "changle" && (
        <div>
          {rewardInfo.changle.map((item) => (
            <NodeEventInfo
              key={item.name}
              eventInfo={item}
              curNode={curNode}
              setGridData={setGridData}
            ></NodeEventInfo>
          ))}
        </div>
      )}
      {nodeType === "shiyi" && (
        <div>
          {rewardInfo.shiyi.map((item) => (
            <NodeEventInfo
              key={item.name}
              eventInfo={item}
              curNode={curNode}
              setGridData={setGridData}
            ></NodeEventInfo>
          ))}
        </div>
      )}
    </>
  );
}

function Title({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <div className="w-1.5 h-4 bg-white mr-2 rounded-xs"></div>
      <div className="text-base my-4">{text}</div>
    </div>
  );
}

function NodeEventInfo({
  eventInfo,
  curNode,
  setGridData,
}: {
  eventInfo: { name: string; info: string[] };
  curNode: GridCell;
  setGridData: React.Dispatch<React.SetStateAction<GridData>>;
}) {
  function handleFocus(info: string) {
    const updatedNode = {
      ...curNode,
      reward: info,
    };
    // 同时更新gridData中对应的节点
    setGridData((prevGridData: GridData) => {
      const newGridData = prevGridData.map((row) => [...row]);
      console.log(newGridData);
      newGridData[curNode.row][curNode.col] = updatedNode;
      return newGridData;
    });
  }
  if (!eventInfo.info) {
    return null;
  }
  return (
    <div>
      <div className="text-sm">{eventInfo.name}</div>
      <div className="flex flex-wrap gap-2 ml-2 my-2">
        {eventInfo.info.map((info, index) => (
          <button
            key={index}
            className={`
            min-w-12 border-1 rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg
            text-white border-gray-600 p-1 bg-[#3d3d3d]
						${
              curNode.reward === info
                ? "bg-[#008a7f] border-white shadow-md outline-none"
                : ""
            }
          `}
            onFocus={() => handleFocus(info)}
          >
            {info}
          </button>
        ))}
      </div>
    </div>
  );
}
