"use client"
import { Button, Flex } from "antd"
import React from "react"

import { Widget, default as widgets }from "./widgets" 
import { FormCanvasRef } from "./form-canvas"

export interface ToolbarProps {
    formCanvasRef: FormCanvasRef
}


const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>((props, _ref) => {

  return (
    <Flex vertical gap={8}>
      {widgets.map((w: Widget) => (
        <Button
          id={w.name}
          key={w.name}
          onClick={() => props.formCanvasRef.addNode(w.node)}
          style={{fontWeight: 600, fontSize: 16}}>
          {w.label}
        </Button>
      ))}
    </Flex>
  )
})

Toolbar.displayName = "Toolbar"

export default Toolbar