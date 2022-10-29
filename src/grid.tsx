import React, { memo, Profiler, ProfilerOnRenderCallback, PropsWithChildren } from "react";
import { cols, rows } from "./data";

export const ProfiledGrid = memo(function ProfiledGrid({ name, getRow: Row, getCol: Col, handleRender }: { name: string; getRow: (props: PropsWithChildren) => JSX.Element, getCol: (props: PropsWithChildren) => JSX.Element, handleRender: ProfilerOnRenderCallback }) {
    return (
        <li>
            <label>{name}</label>
            <Profiler id={name} onRender={handleRender}>
                {rows.map((_, i) => {
                    return <Row key={`${name}-${i}`}>
                        {cols.map((_, j) => {
                            return <Col key={`${name}-${i}-${j}`} />
                        })}
                    </Row>
                })}
            </Profiler>
        </li>
    )
})

