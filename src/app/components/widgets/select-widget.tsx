"use client"

import React, { CSSProperties } from "react"

export interface SelectWidgetProps {
    style?: CSSProperties
}

const SelectWidget = React.forwardRef<HTMLDivElement, SelectWidgetProps>((props, ref) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        flexDirection: "column",
        padding: "2px"
    }
    return (
        <div style={style}>
            <label>下拉选择</label>
            <select style={{border: "solid 1px rgb(217, 217, 217)", borderRadius: "2px", height: "32px"}}></select>
            <span style={{fontSize: "12px"}}>提示文本</span>
        </div>
    )
})

export default SelectWidget