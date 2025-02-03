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
            <label htmlFor="checkbox">复选框</label>
            <div style={{display: "flex", flexDirection: "row"}}>
            {/* <div>
                <input type="checkbox" id="default1" name="default1" checked />
                <label htmlFor="default1">选项1</label>
            </div> */}
            </div>
            <span style={{fontSize: "12px"}}>提示信息</span>
        </div>
    )
})

export default CheckboxWidget