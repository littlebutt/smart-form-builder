"use client"

import { Checkbox } from "antd"
import React, { CSSProperties } from "react"

export interface CheckboxWidgetProps {
    style?: CSSProperties
}

const CheckboxWidget = React.forwardRef<HTMLDivElement, CheckboxWidgetProps>((props, ref) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        flexDirection: "column",
        padding: "2px"
    }
    return (
        <div style={style}>
            <label htmlFor="checkbox">复选框</label>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Checkbox id="checkbox" disabled>选项1</Checkbox>
                <Checkbox id="checkbox" disabled>选项2</Checkbox>
            </div>
        </div>
    )
})

export default CheckboxWidget