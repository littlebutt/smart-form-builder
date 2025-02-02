"use client"

import { Input } from "antd"
import React from "react"
import { CSSProperties } from "react"

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
        <label htmlFor="input">单行输入</label>
        <Input id="input" disabled></Input>
      </div>
    )
})

export default TextWidget