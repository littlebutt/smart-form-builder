import { Input, Select } from "antd"
import { ReactNode } from "react"

export interface Widget {
    name: string,
    label: string,
    node: ReactNode
}

const widgetList: Widget[] = [
  {
    name: "label",
    label: "标签",
    node: (
      <div>
                标签
      </div>
    )
  },
  {
    name: "text",
    label: "单行输入",
    node: (
      <div>
        <Input></Input>
      </div>
    )
  },
  {
    name: "select",
    label: "下拉框",
    node: (
      <div>
        <Select></Select>
      </div>
    )
  }
]

export default widgetList