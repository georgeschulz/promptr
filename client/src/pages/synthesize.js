import AppLayout from "../components/layout/AppLayout";
import { TextField } from "@mui/material";
import { selectPrompt, selectNotes, setNotes, setPrompt, selectPromptType, setPromptType } from "../redux/synthesizeSlice";
import { useDispatch, useSelector } from "react-redux";
import ClickToCopyButton from "../components/buttons/ClickToCopyButton";
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import synthesizePrompts from "../components/prompts/synthesizePrompts";
import { useEffect } from "react";

function SynthesizePage() {
    const dispatch = useDispatch();
    const prompt = useSelector(selectPrompt);
    const notes = useSelector(selectNotes);
    const promptType = useSelector(selectPromptType);

    useEffect(() => {
        if (promptType) {
            let { template } = synthesizePrompts.find(prompt => prompt.name === promptType);
            dispatch(setPrompt(`${template} ${notes}`));
        }
    }, [promptType, notes, dispatch]);

    const handleNotesChange = (e) => {
        let newNotes = e.target.value;
        let { template } = synthesizePrompts.find(prompt => prompt.name === promptType);

        dispatch(setNotes(newNotes));
    }   

    return (
        <AppLayout>
            <div className="px-16 py-10 flex" style={{ alignItems: 'flex-start'}}>
                <div className="ml-10 w-full">
                    <h1 className="text-lg font-bold mb-4">Synthesize Notes</h1>
                    <strong>What is this?</strong>
                    <p className="mb-8">An experimental feature that takes a set of notes and uses GPT to distill it into one of a few points. Instructions: Choose a prompt type to select what information you want to pull out of a set of notes or a transcript. Copy and paste your notes into the Notes Field, then click Open Chat. After experimenting, ChatGPT will take around 4 full pages of text or around 3000 words! It seems to perform best with well formatted dialogue or facebook posts.</p>
                    <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                        <InputLabel id="prompt-type-label">Prompt Type</InputLabel>
                        <Select
                            labelId="prompt-type-label"
                            id="prompt-type"
                            value={promptType}
                            label="Prompt Type"
                            onChange={(e) => dispatch(setPromptType(e.target.value))}
                        >
                            {
                                synthesizePrompts.map((prompt, i) => {
                                    return <MenuItem key={i} value={prompt.name}>{prompt.name}</MenuItem>
                                })
                            }
                            
                        </Select>
                    </FormControl>
                    <TextField
                        label="Notes"
                        value={notes}
                        onChange={handleNotesChange}
                        multiline
                        rows={10}
                        fullWidth
                    />
                    {prompt && <div className="my-4">
                        <h2 className="text-lg font-bold">Prompt</h2>
                        <p>{prompt}</p>
                    </div>}
                    <ClickToCopyButton text={prompt} openChat={true}>Open Chat</ClickToCopyButton>
                </div>
            </div>
        </AppLayout>
    )
}

export default SynthesizePage;