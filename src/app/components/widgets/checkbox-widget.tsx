"use client"

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
            <label>复选框</label>
            <div style={{display: "flex", flexDirection: "row"}}>
            </div>
            <span style={{fontSize: "12px"}}>提示文本</span>
        </div>
    )
})

export default CheckboxWidget