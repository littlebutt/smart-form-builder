"use client"
import React, { ReactNode, useEffect, useState } from "react"
import GridLayout, { Layout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

export interface FormCanvasProps {
    height?: number,
    width?: number,
    rowHeight?: number,
    bgColor?: string,
    radius?: number,
    itemColor?: string
    cols: number,
    children: ReactNode[]
}

export interface FormCanvasRef {
    addNode: (node: ReactNode) => void,
    getLayouts: () => FormCanvasLayout[]
}

export type FormCanvasLayout = Layout

const FormCanvas = React.forwardRef<FormCanvasRef, FormCanvasProps>((props, ref) => {
  const {
    height = 1200,
    width = 1200,
    rowHeight = 50,
    bgColor = "#f5f5f5",
    radius = 5,
    itemColor = "#ffffff"
  } = props

  const [layouts, setLayouts] = useState<Layout[]>([])
  const [rawNodes, setRawNodes] = useState<ReactNode[]>(props.children)
  const [nodes, setNodes] = useState<ReactNode[]>([])
  const changeLayout: (layouts: Layout[]) => void = (layouts) => {
    setLayouts(layouts)
    console.log(layouts)
  }

  const addNode = (node: ReactNode) => {
    const newNode = Object.assign({}, node, {})
    setRawNodes(prevNodes => [...prevNodes, newNode])
  }

  const getLayouts = () => layouts

  React.useImperativeHandle(
    ref,
    () => ({
      addNode,
      getLayouts
    })
  )

  useEffect(() => {
    const _nodes = React.Children.map(rawNodes, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {backgroundColor: itemColor}
        })
      }
      return child
    }) as ReactNode[]
    setNodes(_nodes)
  }, [rawNodes])

  return (
    <GridLayout
      className="__layout"
      cols={props.cols}
      rowHeight={rowHeight}
      width={width}
      style={{backgroundColor: bgColor, borderRadius: radius, height: height}}
      onLayoutChange={changeLayout}
    >
      {nodes}
    </GridLayout>
  )
})

FormCanvas.displayName = "FormCanvas"

export default FormCanvas