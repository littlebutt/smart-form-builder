"use client"
import { Col, Row } from "antd"
import Toolbar from "./components/toolbar"
import useWindowSize, { WindowSize } from "./hook/use-window-size"
import FormCanvas, { FormCanvasRef } from "./components/form-canvas"
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import WidgetInfo, { WidgetProperty } from "./components/widget-info"
import React from "react"
import widgetList from "./components/widgets"

export interface FormBuilderProps {
  initDidgets: WidgetProperty[]
}

const FormBuilder: React.FC<FormBuilderProps> = (props) => {
  const windowSize: WindowSize | undefined = useWindowSize()

  const [currentWidget, setCurrentWidget] = useState<WidgetProperty>()

  const formCanvasRef = useRef<FormCanvasRef>(null)

  const addNode = (node: ReactNode, info?: string) => {
    formCanvasRef.current?.addNode(node, info)
  }

  const removeNode = (name: string) => {
    formCanvasRef.current?.removeNode(name)
  }
  useEffect(() => {
    props.initDidgets.forEach((w) => {
      const candidates = widgetList.filter((_w) => _w.name === w.type)
      let candidate
      if (candidates.length > 0) {
        candidate = candidates[0]
      } else {
        return
      }
      const newNode = React.cloneElement(candidate.node as ReactElement<{
        'data-grid': any
      }>, {
        'data-grid': {
          x: w.left,
          y: w.top,
          w: w.width,
          h: w.height
        }
      })
      formCanvasRef.current?.addNode(newNode)
    })
  }, [])
  
  return (
    <div>
      <Row style={{height: windowSize.height}} gutter={5}>
        <Col span={6}>
          <Toolbar addNode={addNode} currentWidget={currentWidget} setCurrentWidget={setCurrentWidget} ></Toolbar>
        </Col>
        <Col span={12}>
          <FormCanvas ref={formCanvasRef} cols={4} height={windowSize.height} width={748} currentWidget={currentWidget} setCurrentWidget={setCurrentWidget}>
          </FormCanvas>
        </Col>
        <Col span={6}>
          <WidgetInfo widgetProperty={currentWidget} setWidgetProperty={setCurrentWidget} removeNode={removeNode}></WidgetInfo>
        </Col>
      </Row>
    </div>
  )
}

export default FormBuilder