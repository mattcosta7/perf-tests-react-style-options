import styled from 'styled-components'
import { colStyle, rowStyle } from './styles';
import { sx, SxProp } from '@primer/react'

export const StyledRow = styled.div(rowStyle)

export const StyledCol = styled.div(colStyle)


export const StyledRowWithSx = styled.div<SxProp>`
    ${sx}
`
export const StyledColWithSx = styled.div<SxProp>`
    ${sx}
`