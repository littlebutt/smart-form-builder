"use client"
import { Button, Flex } from "antd"
import React, { ReactNode } from "react"

import { Widget, default as widgets }from "./widgets" 
import { WidgetProperty } from "./widget-info"

export interface ToolbarProps {
    addNode: (node: ReactNode, info?: string) => void,
    currentWidget?: WidgetProperty,
    setCurrentWidget: (current: WidgetProperty) => void
}


const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>((props, _ref) => {

  const generateKey = (key: string) => {
    const now = new Date().getTime().toString().split('').reverse().join('')
    return `${key}${now.substring(0, 5)}`
  }

  const doAddNode = (node: ReactNode, key: string) => {
    const _key = generateKey(key)
    const defaultLabel = ""
    const newNode = React.cloneElement(node as React.ReactElement<{ key?: string }>, {
      key: _key
    })
    const info = {
      name: _key,
      label: defaultLabel, // unused
      type: key
    }
    props.setCurrentWidget(info)
    props.addNode(newNode, JSON.stringify(info))
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