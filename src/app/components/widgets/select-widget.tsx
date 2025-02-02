"use client"

import { Select } from "antd"
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
            <label htmlFor="select">下拉选择</label>
            <Select id="select" disabled></Select>
            <span style={{fontSize: "12px"}}>提示信息</span>
        </div>
    )
})

export default SelectWidget