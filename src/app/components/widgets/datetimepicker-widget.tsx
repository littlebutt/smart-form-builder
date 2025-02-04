"use client"

import React, { CSSProperties } from "react"

export interface DatetimepickerWidgetProps {
    style?: CSSProperties
}
const DatetimepickerWidget = React.forwardRef<HTMLDivElement, DatetimepickerWidgetProps>((props, ref) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        flexDirection: "column",
        padding: "2px"
    }
    return (
        <div style={style}>
            <label>日期时间选择</label>
            <input type="datetime-local"
                defaultValue="2025-01-01 00:00:00"
                style={{border: "solid 1px rgb(217, 217, 217)", borderRadius: "2px", height: "32px"}}>
            </input>
            <span style={{fontSize: "12px"}}>提示文本</span>
        </div>
    )
})

export default DatetimepickerWidget