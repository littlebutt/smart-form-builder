"use client"

import { Input } from "antd"
import React, { CSSProperties } from "react"

export interface TextWidgetProps {
    style?: CSSProperties
}

const TextWidget = React.forwardRef<HTMLDivElement, TextWidgetProps>((props, ref) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        flexDirection: "column",
        padding: "2px"
    }
    return (
    <div style={style}>
        <label>单行文本</label>
        <Input></Input>
        <span style={{fontSize: "12px"}}>提示文本</span>
      </div>
    )
})

export default TextWidget