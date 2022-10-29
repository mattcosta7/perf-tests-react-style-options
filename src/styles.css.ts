import { style, globalStyle } from "@vanilla-extract/css";
import { colStyle, rowStyle } from "./styles";

export const rowStyleVanilla = style(rowStyle);
export const columnStyledVanilla = style(colStyle)

globalStyle('table, td, th', {
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: '5px',
    textAlign: 'right'
})