"use client"
import { Col, Row } from "antd"
import Toolbar from "./components/toolbar"
import useWindowSize, { WindowSize } from "./hook/use-window-size"
import FormCanvas, { FormCanvasRef } from "./components/form-canvas"
import { useEffect, useRef } from "react"


const FormBuilder: React.FC = () => {
  const windowSize: WindowSize | undefined = useWindowSize()

  const formCanvasRef = useRef<FormCanvasRef>(null)
  useEffect(() => {
    formCanvasRef.current?.addNode(<div key="c">c</div>)
  }, [])
  
  return (
    <div>
      <Row style={{height: windowSize.height}} gutter={5}>
        <Col span={6}>
          <Toolbar formCanvasRef={formCanvasRef.current as FormCanvasRef}></Toolbar>
        </Col>
        <Col span={12}>
          <FormCanvas ref={formCanvasRef} cols={3} height={windowSize.height} width={748}>
            <div key="a">a</div>
            <div key="b">b</div>
          </FormCanvas>
        </Col>
        <Col span={6}>
        </Col>
      </Row>
    </div>
  )
}

export default FormBuilder