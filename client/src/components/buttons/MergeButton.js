import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { selectCursorPosition, insertStringIntoFormulaAtIndex } from "../../redux/templatesSlice"
import { useState } from "react"
import Tooltip from '@mui/material/Tooltip';

function MergeButton({ tag, label, tooltip }) {
    const dispatch = useDispatch()
    const cursorPosition = useSelector(selectCursorPosition)

    const handleInsertIntoFormula = (tag) => {
        dispatch(
            insertStringIntoFormulaAtIndex({
                string: tag,
                index: cursorPosition
            })
        )
    }

    return (
        <Tooltip disableFocusListener title={tooltip}>
            <Button variant="outlined" onClick={() => handleInsertIntoFormula(tag)}>{label}</Button>
        </Tooltip>
    )
}

export default MergeButton