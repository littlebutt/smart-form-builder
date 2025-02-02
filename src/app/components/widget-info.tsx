"use client"

import { Col, Flex, Input, Row } from "antd"
import React from "react"

export interface SelectWidgetStub {
  items: string[]
}

export type CheckboxWidgetStub = SelectWidgetStub

export interface WidgetProperty {
  type: string,
  name: string,
  label: string,
  helpText?: string,
  top: number,
  left: number,
  width: number,
  height: number,
  stub?: SelectWidgetStub | CheckboxWidgetStub
}

export interface WidgetInfoProps {
    widgetProperty?: WidgetProperty,
    setWidgetProperty: (widgetProperty: WidgetProperty) => void
}

export interface WidgetInfoRef {

}

const WidgetInfo = React.forwardRef<WidgetInfoRef, WidgetInfoProps>((props, ref) => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
      <Row>
        <Col span={24}>
          <label htmlFor="label">标签</label>
          <Input id="label" value={props.widgetProperty?.label}></Input>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="name">名称</label>
          <Input id="name" value={props.widgetProperty?.name} disabled></Input>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="helpText">提示文本</label>
          <Input id="helpText" value={props.widgetProperty?.helpText}></Input>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <label htmlFor="left">左</label>
          <Input id="left" value={props.widgetProperty?.left}></Input>
        </Col>
        <Col span={12}>
          <label htmlFor="top">上</label>
          <Input id="top" value={props.widgetProperty?.top}></Input>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <label htmlFor="height">高</label>
          <Input id="height" value={props.widgetProperty?.height}></Input>
        </Col>
        <Col span={12}>
          <label htmlFor="width">宽</label>
          <Input id="width" value={props.widgetProperty?.width}></Input>
        </Col>
      </Row>
    </div>
  )
})

WidgetInfo.displayName = "WidgetInfo"

export default WidgetInfo