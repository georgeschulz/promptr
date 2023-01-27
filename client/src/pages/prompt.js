import AppLayout from "../components/layout/AppLayout";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectPrompts } from "../redux/promptsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPromptsThunk, setAdditionalDetails, setContext, setAudience, setLength, setPrompt, selectAdditionalDetails, selectAudience, selectContext, selectLength, selectPrompt } from "../redux/promptsSlice";
import fillTemplate from "../util/fillTemplate";
import ClickToCopyButton from "../components/buttons/ClickToCopyButton";

function Prompt() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const prompts = useSelector(selectPrompts);
    const prompt = prompts ? prompts.find(prompt => prompt.prompt_id === Number(id)) : null;
    const promptText = useSelector(selectPrompt);
    const additionalDetails = useSelector(selectAdditionalDetails);
    const context = useSelector(selectContext);
    const audience = useSelector(selectAudience);
    const length = useSelector(selectLength);

    useEffect(() => {
        dispatch(fetchPromptsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (prompt) {
            dispatch(setPrompt(prompt.prompt));
            dispatch(setAdditionalDetails(prompt.additional_details));
            dispatch(setContext(prompt.context));
            dispatch(setAudience(prompt.audience));
            dispatch(setLength(prompt.length));
        }
    }, [prompt])

    return (
        <AppLayout>
            <div className="px-16 py-10">
                <h1 className="text-2xl font-bold mb-8 flex flex-wrap space-y-4">Prompt</h1>
                <div className="mb-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Context"
                        multiline
                        rows={4}
                        value={context}
                        onChange={(e) => dispatch(setContext(e.target.value))}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Audience"
                        value={audience}
                        onChange={(e) => dispatch(setAudience(e.target.value))}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Length"
                        value={length}
                        onChange={(e) => dispatch(setLength(e.target.value))}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Additional Details"
                        multiline
                        rows={4}
                        value={additionalDetails}
                        onChange={(e) => dispatch(setAdditionalDetails(e.target.value))}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                <TextField
                    id="outlined-multiline-static"
                    label="Prompt"
                    multiline
                    rows={4}
                    value={fillTemplate(promptText, {context, audience, length, additionalDetails})}
                    onChange={(e) => dispatch(setPrompt(e.target.value))}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <ClickToCopyButton text={fillTemplate(promptText, {context, audience, length, additionalDetails})} />
                </div>
            </div>
        </AppLayout>
    )
}

export default Prompt;