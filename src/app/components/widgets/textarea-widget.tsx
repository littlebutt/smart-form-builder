"use client"

import React, { CSSProperties } from "react"

export interface TextareaWidgetProps {
    style?: CSSProperties
}

const TextareaWidget = React.forwardRef<HTMLDivElement, TextareaWidgetProps>((props, ref) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        flexDirection: "column",
        padding: "2px"
    }
    return (
    <div style={style}>
        <label>多行文本</label>
        <textarea></textarea>
        <span style={{fontSize: "12px"}}>提示文本</span>
      </div>
    )
})

export default TextareaWidget