"use client"
import { Col, Row } from "antd"
import Toolbar from "./components/toolbar"
import useWindowSize, { WindowSize } from "./hook/use-window-size"
import FormCanvas, { FormCanvasRef } from "./components/form-canvas"
import { ReactNode, useEffect, useRef, useState } from "react"
import WidgetInfo, { WidgetProperty } from "./components/widget-info"



const FormBuilder: React.FC = () => {
  const windowSize: WindowSize | undefined = useWindowSize()

  const [currentWidget, setCurrentWidget] = useState<WidgetProperty>()

  const formCanvasRef = useRef<FormCanvasRef>(null)

  const addNode = (node: ReactNode, info?: string) => {
    formCanvasRef.current?.addNode(node, info)
  }
  useEffect(() => {
    //formCanvasRef.current?.addNode(<div key="c">c</div>)
  }, [])
  
  return (
    <div>
      <Row style={{height: windowSize.height}} gutter={5}>
        <Col span={6}>
          <Toolbar addNode={addNode} currentWidget={currentWidget} setCurrentWidget={setCurrentWidget} ></Toolbar>
        </Col>
        <Col span={12}>
          <FormCanvas ref={formCanvasRef} cols={3} height={windowSize.height} width={748} currentWidget={currentWidget} setCurrentWidget={setCurrentWidget}>
          </FormCanvas>
        </Col>
        <Col span={6}>
          <WidgetInfo widgetProperty={currentWidget} setWidgetProperty={setCurrentWidget}></WidgetInfo>
        </Col>
      </Row>
    </div>
  )
}

export default FormBuilder