"use client"
import React, { ReactNode, useEffect, useState } from "react"
import GridLayout, { Layout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { WidgetProperty } from "./widget-info"

export interface FormCanvasProps {
    height?: number,
    width?: number,
    rowHeight?: number,
    bgColor?: string,
    radius?: number,
    itemColor?: string
    cols: number,
    children?: ReactNode[],
    currentWidget?: WidgetProperty,
    setCurrentWidget: (current: WidgetProperty) => void
}

export interface FormCanvasRef {
    addNode: (node: ReactNode, info?: string) => void,
    getLayouts: () => FormCanvasLayout[]
}

export type FormCanvasLayout = Layout

const FormCanvas = React.forwardRef<FormCanvasRef, FormCanvasProps>((props, ref) => {
  const {
    height = 1200,
    width = 1200,
    rowHeight = 70,
    bgColor = "#f5f5f5",
    radius = 5,
    itemColor = "#ffffff",
    children = []
  } = props

  const [layouts, setLayouts] = useState<Layout[]>([])
  const [rawNodes, setRawNodes] = useState<ReactNode[]>(children)
  const [nodes, setNodes] = useState<ReactNode[]>([])
  const changeLayout = (layouts: Layout[]) => {
    setLayouts(layouts)
    console.log(layouts)
  }

  const addNode = (node: ReactNode, info?: string) => {
    let newNode: ReactNode
    if (React.isValidElement(node)) {
      newNode = React.cloneElement(node as React.ReactElement<{ 'data-memo'?: string }>, {
        'data-memo': info
      })
    }
    setRawNodes(prevNodes => [...prevNodes, newNode])
  }

  const getLayouts = () => layouts

  const getLayoutByKey = (key: string) => {
    let results =  layouts.filter((layout) => layout.i.includes(key))

    if (results.length > 0) {
      return results[0]
    } else {
      console.error("Cannot find target layout")
      return null
    }
  }

  const getWidgetLabelAndHT = (name: string) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const label = element?.children[0]?.children[0]
    const helpText = element?.children[0]?.children[2]
    return [label, helpText]
  }

  const addSelectOption = (name: string, options: string[]) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const selectElement = element?.children[0]?.children[1]
    if (selectElement) {
      // TODO: add stubs
    } else {
      console.error("Cannot find Select tag")
    }
  }

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
        // 1. Add preset style
        const newNode = React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {backgroundColor: itemColor}
        })
        // 2. Add onClick handler
        const newNewNode = React.cloneElement(newNode as React.ReactElement<{ onClick?:  React.MouseEventHandler<HTMLDivElement> }>, {
          onClick: (event: any) => {
            const dataMemo = event.currentTarget.getAttribute('data-memo')
            const _currentWidget: WidgetProperty = JSON.parse(dataMemo)
            const layout: GridLayout.Layout = getLayoutByKey(_currentWidget.name) as GridLayout.Layout
            // 2.1 Update currentWidget
            const [label, helpText] = getWidgetLabelAndHT(_currentWidget.name)
            props.setCurrentWidget({
              type: _currentWidget.type,
              name: _currentWidget.name,
              height: layout.h,
              width: layout.w,
              left: layout.x,
              top: layout.y,
              label: label?.innerHTML || "",
              helpText: helpText?.innerHTML || "",
              stub: "" // TODO: add stub
            })
          }
        })
        return newNewNode
      }
      return child
    }) as ReactNode[]
    setNodes(_nodes)
  // XXX: 通过以来列表的变化重新绑定onClick函数，需要优化
  }, [rawNodes, layouts])

  useEffect(() => {
    const [label, helpText] = getWidgetLabelAndHT(props.currentWidget?.name ?? "")
    if (label) {
      label.innerHTML = props.currentWidget?.label || ""
    }
    if (helpText) {
      helpText.innerHTML = props.currentWidget?.helpText || ""
    }
  }, [props.currentWidget])

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