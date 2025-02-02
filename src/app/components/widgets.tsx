import { Checkbox, Input, Select } from "antd"
import { ReactNode } from "react"
import TextWidget from "./widgets/text-widget"
import SelectWidget from "./widgets/select-widget"
import CheckboxWidget from "./widgets/checkbox-widget"


export interface Widget {
    name: string,
    label: string,
    node: ReactNode
}

const widgetList: Widget[] = [
  {
    name: "text",
    label: "单行输入",
    node: (
      <div>
        <TextWidget style={{width: "95%"}}></TextWidget>
      </div>
      )
  },
  {
    name: "select",
    label: "下拉选择",
    node: (
      <div>
        <SelectWidget style={{width: "95%"}}></SelectWidget>
      </div>
    )
  },
  {
    name: "checkbox",
    label: "复选框",
    node: (
      <div>
        <CheckboxWidget style={{width: "95%"}}></CheckboxWidget>
      </div>
    )
  }
]

export default widgetList