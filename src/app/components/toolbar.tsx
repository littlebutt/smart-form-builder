"use client"
import { Button, Flex } from "antd"
import React, { ReactNode } from "react"

import { Widget, default as widgets }from "./widgets" 
import { FormCanvasRef } from "./form-canvas"

export interface ToolbarProps {
    addNode: (node: ReactNode) => void
}


const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>((props, _ref) => {

  const generateKey = (key: string) => {
    const now = new Date().getTime().toString().split('').reverse().join('')
    return `${key}${now.substring(0, 5)}`
  }

  const doAddNode = (node: ReactNode, key: string) => {
    const newNode = React.cloneElement(node as React.ReactElement<{ key?: string }>, {
      key: generateKey(key)
    })
    props.addNode(newNode)
  }

  return (
    <Flex vertical gap={8}>
      {widgets.map((w: Widget) => (
        <Button
          id={w.name}
          key={w.name}
          onClick={() => doAddNode(w.node, w.name)}
          style={{fontWeight: 600, fontSize: 16}}>
          {w.label}
        </Button>
      ))}
    </Flex>
  )
})

Toolbar.displayName = "Toolbar"

export default Toolbar