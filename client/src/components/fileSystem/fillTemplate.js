import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import ClickToCopyButton from '../buttons/ClickToCopyButton';
import { updatePromptThunk } from '../../redux/promptsSlice';

function FillTemplate({template, data, id}) {
    const dispatch = useDispatch()

    if (typeof template !== 'string' || typeof data !== 'object') {
        return template;
    }

    //split the template into an array of strings and variables. Variables are enclosed in curly braces. It should alternate between strings and variables
    const templateArray = template.split(/(\{(\w+)\})/g);
    //remove the duplicate word after the variable
    for (let i = 0; i < templateArray.length; i++) {
        if (templateArray[i].match(/\{(\w+)\}/g)) {
            templateArray.splice(i + 1, 1);
        }
    }

    let text = ""
    //loop through the array
    const filledTemplate = templateArray.map((string, i) => {
        //if the string is a variable
        if (string.match(/\{(\w+)\}/g)) {
            //return the value of the variable
            //get the name of the variable
            const variableName = string.match(/\{(\w+)\}/g)[0].replace(/\{|\}/g, '');
            text += data[variableName];
            return (
                <Tooltip title={`{${variableName}}`} key={variableName + '-' + i}>
                    <span className="text-blue-600 hover:underline cursor-pointer">{data[variableName]}</span>
                </Tooltip>
            )
        } else {
            //return the string
            text += string;
            return <span key={`plaintext-${i}`}>{string}</span>;
        }
    })

    return (
        <div className="mb-4">
            <div className="mb-4">
                {filledTemplate}
            </div>
            <div className="mb-4 gap-x-4 flex">
                <ClickToCopyButton text={text} openChat={false}>Copy to Clipboard</ClickToCopyButton>
                <ClickToCopyButton text={text} openChat={true}>Start Chat</ClickToCopyButton>
                <Button variant="contained" color="primary" onClick={() => dispatch(updatePromptThunk({id, text}))}>Save Updates</Button>
            </div>
        </div>
    );
}

export default FillTemplate;