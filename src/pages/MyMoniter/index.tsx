import { useState } from "react";
import { Picker, List, Button, Input } from "antd-mobile";

interface IOnFilterChange {
  startDate: Date | null;
  endDate: Date;
}
interface ITimeRangeFilter {
  onFilterChange: ({ startDate, endDate }: IOnFilterChange) => void;
}

const basicColumns = [
  [
    { label: "近15天", value: "近15天" },
    { label: "近1个月", value: "近1个月" },
    { label: "近3个月", value: "近3个月" },
    { label: "半年", value: "半年" },
    { label: "全部", value: "全部" },
  ],
];

const TimeRangeFilter = ({ onFilterChange }: ITimeRangeFilter) => {
  const [selectedOption, setSelectedOption] = useState("近15天");
  const [visible, setVisible] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);

    // 根据选项生成日期范围
    const endDate = new Date();
    let startDate: Date | null = new Date();

    switch (option) {
      case "近15天":
        startDate.setDate(endDate.getDate() - 14);
        break;
      case "近1个月":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "近3个月":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "半年":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "全部":
        startDate = null; // 表示不限时间范围
        break;
      default:
        break;
    }

    console.log({
      startDate: startDate?.getTime(),
      endDate: endDate.getTime(),
    });
    onFilterChange({ startDate, endDate });
  };

  return (
    <div>
      <List>
        <List.Item extra={selectedOption}>
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            选择时间范围
          </Button>

          <Picker
            columns={basicColumns}
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            onConfirm={(v) => {
              handleOptionClick(v[0] as string);
            }}
          />

          <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <div style={{ marginBottom: "10px" }}>
              <Input
                placeholder="请输入实例名称/告警编号"
                style={{
                  border: "1px solid #eee",
                  padding: "6px",
                  borderRadius: "4px",
                  width: "100%", // 确保输入框宽度与父容器一致
                }}
                clearable
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              {/* <TimeRangeFilter /> */}
              <div>123</div>
            </div>
            <div>
              <Button
                onClick={() => {
                  console.log(123);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#1890ff", // 使用更明显的颜色
                  color: "white",
                  padding: "10px 0", // 增加按钮的填充，使其更易点击
                  borderRadius: "4px",
                }}
              >
                搜索
              </Button>
            </div>
          </div>
        </List.Item>
      </List>
    </div>
  );
};

export default TimeRangeFilter;
