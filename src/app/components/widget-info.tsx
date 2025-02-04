"use client"

import { Button, Col, Divider, Input, Row } from "antd"
import React from "react"


export interface WidgetProperty {
  type: string,
  name: string,
  label: string,
  helpText?: string,
  top?: number,
  left?: number,
  width?: number,
  height?: number,
  stub?: string
}

export interface WidgetInfoProps {
    widgetProperty?: WidgetProperty,
    setWidgetProperty: (widgetProperty: WidgetProperty) => void,
    removeNode: (name: string) => void
}

export interface WidgetInfoRef {

}

const WidgetInfo = React.forwardRef<WidgetInfoRef, WidgetInfoProps>((props, ref) => {

  const getType = (type?: string) => {
    switch (type) {
      case "text": return "单行文本"
      case "select": return "下拉选择"
      case "checkbox": return "复选框"
      case "radio": return "单选框"
      case "date": return "日期选择"
      case "datetime": return "日期时间选择"
      case "file": return "文件上传"
      case "textarea": return "多行文本"
      default: return "未选择"
    }
  }

  const changeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setWidgetProperty({
      ...props.widgetProperty as WidgetProperty,
      label: e.target.value
    })
  }

  const changehelpText = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setWidgetProperty({
      ...props.widgetProperty as WidgetProperty,
      helpText: e.target.value
    })
  }

  const changeStub = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setWidgetProperty({
      ...props.widgetProperty as WidgetProperty,
      stub: e.target.value
    })
  }

  const doRemoveNode = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.removeNode(props.widgetProperty?.name as string)
    props.setWidgetProperty({
      type: "",
      name: "",
      label: ""
    })
  }


  return (
    <div style={{display: "flex", flexDirection: "column", gap: "8px", fontWeight: 500}}>
      <Row style={{height: "30px"}}>
        <Col span={12} style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "end", justifyContent: "space-between"}}>
          <div style={{fontSize: "18px", fontWeight: 600}}>{getType(props.widgetProperty?.type)}</div>
        </Col>
      </Row>
      <Row style={{height: "60px"}}>
        <Col span={24} style={{display: "flex", flexDirection: "column",gap: "4px"}}>
          <label htmlFor="label">标签</label>
          <Input id="label" value={props.widgetProperty?.label} onChange={changeLabel}></Input>
        </Col>
      </Row>
      <Row style={{height: "60px"}}>
        <Col span={24} style={{display: "flex", flexDirection: "column",gap: "4px"}}>
          <label htmlFor="helpText">提示文本</label>
          <Input id="helpText" value={props.widgetProperty?.helpText} onChange={changehelpText}></Input>
        </Col>
      </Row>
      {props.widgetProperty?.type === "select" && (
        <Row style={{height: "60px"}}>
          <Col span={24} style={{display: "flex", flexDirection: "column", gap: "4px"}}>
            <label htmlFor="selectOption">下拉选项</label>
            <Input id="selectOption" value={props.widgetProperty?.stub} onChange={changeStub}></Input>
            <span style={{fontSize: "14px", color: "#262626"}}>用“/”分隔每个选项</span>
          </Col>
        </Row>
      )}
      {props.widgetProperty?.type === "checkbox" && (
        <Row style={{height: "60px"}}>
          <Col span={24} style={{display: "flex", flexDirection: "column", gap: "4px"}}>
            <label htmlFor="checkboxOption">复选框选项</label>
            <Input id="checkboxOption" value={props.widgetProperty?.stub} onChange={changeStub}></Input>
            <span style={{fontSize: "14px", color: "#262626"}}>用“/”分隔每个选项</span>
          </Col>
        </Row>
      )}
      {props.widgetProperty?.type === "radio" && (
        <Row style={{height: "60px"}}>
          <Col span={24} style={{display: "flex", flexDirection: "column", gap: "4px"}}>
            <label htmlFor="radioOption">单选框选项</label>
            <Input id="radioOption" value={props.widgetProperty?.stub} onChange={changeStub}></Input>
            <span style={{fontSize: "14px", color: "#262626"}}>用“/”分隔每个选项</span>
          </Col>
        </Row>
      )}
      <Divider style={{margin: "10px auto 10px"}}/>
      <Row gutter={8} style={{height: "30px"}}>
        <Col span={12} style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "end", justifyContent: "space-between"}}>
          <label>X轴</label>
          <div style={{fontWeight: 600}}>{props.widgetProperty?.left}</div>
        </Col>
        <Col span={12} style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "end", justifyContent: "space-between"}}>
          <label>Y轴</label>
          <div style={{fontWeight: 600}}>{props.widgetProperty?.top}</div>
        </Col>
      </Row>
      <Row gutter={8} style={{height: "30px"}}>
        <Col span={12} style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "end", justifyContent: "space-between"}}>
          <label>高度</label>
          <div style={{fontWeight: 600}}>{props.widgetProperty?.height}</div>
        </Col>
        <Col span={12} style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "end", justifyContent: "space-between"}}>
          <label>宽度</label>
          <div style={{fontWeight: 600}}>{props.widgetProperty?.width}</div>
        </Col>
      </Row>
      <Row style={{height: "60px"}}>
        <Col span={12} style={{padding: "2px"}}>
          <Button block onClick={doRemoveNode}>删除</Button>
        </Col>
        <Col span={12} style={{padding: "2px"}}>
          <Button type="primary" block>保存</Button>
        </Col>
      </Row>
    </div>
  )
})

WidgetInfo.displayName = "WidgetInfo"

export default WidgetInfo