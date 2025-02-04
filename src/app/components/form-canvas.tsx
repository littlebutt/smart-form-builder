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
    removeNode: (name: string) => void
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

  const removeNode = (name: string) => {
    setRawNodes(rawNodes.filter((rn) => {
      if (React.isValidElement(rn)) {
        const dataMemo = (rn as React.ReactElement<any>)["props"]["data-memo"] as string
        return !dataMemo.includes(name)
      }
    }))
  }

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
  const generateRandom = () => {
    const now = new Date().getTime().toString().split('').reverse().join('')
    return "value" + now.substring(0, 5)
  }

  const addSelectOption = (name: string, options: string[]) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const selectElement = element?.children[0]?.children[1]
    if (selectElement) {
      while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild)
      }
      options.map(option => {
        const _element = document.createElement("option")
        _element.value = generateRandom()
        _element.textContent = option
        selectElement.appendChild(_element)
      })
    }
  }

  const addCheckbox = (name: string, checkboxes: string[]) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const divElement = element?.children[0]?.children[1]
    if (divElement) {
      while (divElement.firstChild) {
        divElement.removeChild(divElement.firstChild)
      }
      checkboxes.forEach((checkbox) => {
        const _id = generateRandom()
        const _elementDiv = document.createElement("div")
        const _elementInput = document.createElement("input")
        _elementInput.setAttribute("type", "checkbox")
        _elementInput.setAttribute("id", _id)
        const _elementLabel = document.createElement("label")
        _elementLabel.setAttribute("for", _id)
        _elementLabel.textContent = checkbox
        _elementDiv.appendChild(_elementInput)
        _elementDiv.appendChild(_elementLabel)
        divElement.appendChild(_elementDiv)
      })
    }
  }

  const addRadio = (name: string, radios: string[]) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const divElement = element?.children[0]?.children[1]
    if (divElement) {
      while (divElement.firstChild) {
        divElement.removeChild(divElement.firstChild)
      }
      radios.forEach((radio) => {
        const _id = generateRandom()
        const _elementDiv = document.createElement("div")
        const _elementInput = document.createElement("input")
        _elementInput.setAttribute("type", "radio")
        _elementInput.setAttribute("id", _id)
        const _elementLabel = document.createElement("label")
        _elementLabel.setAttribute("for", _id)
        _elementLabel.textContent = radio
        _elementDiv.appendChild(_elementInput)
        _elementDiv.appendChild(_elementLabel)
        divElement.appendChild(_elementDiv)
      })
    }
  }

  const getSelectOption = (name: string) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const target = element?.children[0]?.children[1]
    if (!target) {
      return ""
    }
    let options: string[] = []
    element.querySelectorAll("option").forEach((option) => {
      if (option.textContent) {
        options.push(option.textContent)
      }
    })
    return options.join("/")
  }

  const getCheckbox = (name: string) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const target = element?.children[0]?.children[1]
    if (!target) {
      return ""
    }
    let checkboxes: string[] = []
    target.querySelectorAll("label").forEach((label) => {
      if (label.textContent) {
        checkboxes.push(label.textContent)
      }
    })
    return checkboxes.join("/")
  }

  const getRadio = (name: string) => {
    const element = document.querySelector(`[data-memo*="${name}"]`)
    const target = element?.children[0]?.children[1]
    if (!target) {
      return ""
    }
    let radios: string[] = []
    target.querySelectorAll("label").forEach((label) => {
      if (label.textContent) {
        radios.push(label.textContent)
      }
    })
    return radios.join("/")
  }

  React.useImperativeHandle(
    ref,
    () => ({
      addNode,
      removeNode
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
            let stub: string | undefined = undefined
            if (_currentWidget.type === "select") {
              stub = getSelectOption(_currentWidget.name)
            } else if (_currentWidget.type === "checkbox") {
              stub = getCheckbox(_currentWidget.name)
            } else if (_currentWidget.type === "radio") {
              stub = getRadio(_currentWidget.name)
            }
            props.setCurrentWidget({
              type: _currentWidget.type,
              name: _currentWidget.name,
              height: layout.h,
              width: layout.w,
              left: layout.x,
              top: layout.y,
              label: label?.innerHTML || "",
              helpText: helpText?.innerHTML || "",
              stub: stub
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
    if (props.currentWidget?.type === "select") {
      addSelectOption(props.currentWidget?.name ?? "", props.currentWidget.stub?.split("/") ?? [])
    }
    if (props.currentWidget?.type === "checkbox") {
      addCheckbox(props.currentWidget?.name ?? "", props.currentWidget.stub?.split("/") ?? [])
    }
    if (props.currentWidget?.type === "radio") {
      addRadio(props.currentWidget?.name ?? "", props.currentWidget.stub?.split("/") ?? [])
    }
  }, [props.currentWidget])

  // TODO: 设置可删除
  return (
    <GridLayout
      className="__layout"
      cols={props.cols}
      rowHeight={rowHeight}
      width={width}
      style={{backgroundColor: bgColor, borderRadius: radius, height: height, overflow: "auto"}}
      onLayoutChange={changeLayout}
    >
      {nodes}
    </GridLayout>
  )
})

FormCanvas.displayName = "FormCanvas"

export default FormCanvas