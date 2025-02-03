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
    label: "单行文本",
    node: (
      <div>
        <TextWidget></TextWidget>
      </div>
      )
  },
  {
    name: "select",
    label: "下拉选择",
    node: (
      <div>
        <SelectWidget></SelectWidget>
      </div>
    )
  },
  {
    name: "checkbox",
    label: "复选框",
    node: (
      <div>
        <CheckboxWidget></CheckboxWidget>
      </div>
    )
  }
]

export default widgetList