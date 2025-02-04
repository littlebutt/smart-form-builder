import { ReactNode } from "react"
import TextWidget from "./widgets/text-widget"
import SelectWidget from "./widgets/select-widget"
import CheckboxWidget from "./widgets/checkbox-widget"
import RadioWidget from "./widgets/radio-widget"
import DatepickerWidget from "./widgets/datepicker-widget"
import DatetimepickerWidget from "./widgets/datetimepicker-widget"
import FileWidget from "./widgets/file-widget"
import TextareaWidget from "./widgets/textarea-widget"


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
  },
  {
    name: "radio",
    label: "单选框",
    node: (
      <div>
        <RadioWidget></RadioWidget>
      </div>
    )
  },
  {
    name: "date",
    label: "日期选择",
    node: (
      <div>
        <DatepickerWidget></DatepickerWidget>
      </div>
    )
  },
  {
    name: "datetime",
    label: "日期时间选择",
    node: (
      <div>
        <DatetimepickerWidget></DatetimepickerWidget>
      </div>
    )
  },
  {
    name: "file",
    label: "文件上传",
    node: (
      <div>
        <FileWidget></FileWidget>
      </div>
    )
  },
  {
    name: "textarea",
    label: "多行文本",
    node: (
      <div>
        <TextareaWidget></TextareaWidget>
      </div>
    )
  }
]

export default widgetList