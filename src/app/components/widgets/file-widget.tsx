"use client"

import React, { CSSProperties } from "react"

export interface FileWidgetProps {
    style?: CSSProperties
}

const FileWidget = React.forwardRef<HTMLDivElement, FileWidgetProps>((props, ref) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        flexDirection: "column",
        padding: "2px"
    }
    return (
        <div style={style}>
            <label>文件上传</label>
            <input type="file" style={{border: "solid 1px rgb(217, 217, 217)", borderRadius: "2px", height: "32px"}}></input>
            <span style={{fontSize: "12px"}}>提示文本</span>
        </div>
    )
})

export default FileWidget