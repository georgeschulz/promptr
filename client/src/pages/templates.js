import AppLayout from "../components/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SearchMenu from "../components/fileSystem/searchMenu";
import FloatingAddButton from "../components/buttons/FloatingAddButton";
import { Button, TextField } from "@mui/material";
import { selectTemplates, selectNewTemplateFormula, selectNewTemplateName, selectSelectedTemplateId, setNewTemplateFormula, setNewTemplateName, setSelectedTemplateId, setNewBusinessDescription, setTemplates, getTemplates, createTemplateThunk, deleteTemplateThunk, updateTemplate, selectSearchTerm, setSearchTerm, appendToFormula, selectCursorPosition, setCursorPosition, insertStringIntoFormulaAtIndex } from "../redux/templatesSlice";
import MergeButton from "../components/buttons/MergeButton";

function Templates() {
    const dispatch = useDispatch();
    const templates = useSelector(selectTemplates);
    const newTemplateName = useSelector(selectNewTemplateName);
    const newTemplateFormula = useSelector(selectNewTemplateFormula);
    const selectedTemplateId = useSelector(selectSelectedTemplateId);
    const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        dispatch(getTemplates());
    }, [dispatch]);

    useEffect(() => {
        if (selectedTemplateId) {
            const selectedTemplate = templates.find(template => template.template_id === selectedTemplateId);
            dispatch(setNewTemplateName(selectedTemplate.name));
            dispatch(setNewTemplateFormula(selectedTemplate.formula));
        }
    }, [selectedTemplateId, templates, dispatch]);

    const handleUpdateTemplate = () => {
        dispatch(updateTemplate({ 
            id: selectedTemplateId, 
            updates: { name: newTemplateName, template: newTemplateFormula } 
        }));
    }

    return (
        <AppLayout>
            <div className="px-16 py-10 flex" style={{ alignItems: 'flex-start' }}>
                <SearchMenu
                    data={templates}
                    search={searchTerm}
                    setSearch={(e) => dispatch(setSearchTerm(e.target.value))}
                    headerPropertyName="name"
                    descriptionPropertyName="formula"
                    idPropertyName="template_id"
                    deleteItem={deleteTemplateThunk}
                    setSelectedItem={setSelectedTemplateId}
                />

                {selectedTemplateId && (
                    <div className="ml-10 w-full">
                        <TextField label="Template Name" value={newTemplateName} onChange={(e) => dispatch(setNewTemplateName(e.target.value))} style={{ width: "100%", marginBottom: "1rem" }} />
                        <TextField 
                            label="Template Formula" 
                            value={newTemplateFormula} 
                            onChange={(e) => dispatch(setNewTemplateFormula(e.target.value))} 
                            style={{ width: "100%", marginBottom: "1rem" }} 
                            multiline={true} 
                            rows={8}
                            onFocus={(e) => dispatch(setCursorPosition(e.target.selectionStart))} 
                            onBlur={(e) => dispatch(setCursorPosition(e.target.selectionStart))}
                        />
                        <div className="flex mb-3 gap-x-3">
                            <MergeButton tag=" {biz}" label="Business" tooltip="Provide information about the business" />
                            <MergeButton tag=" {pain}" label="Pain Points" tooltip="Pain points solution solves" />
                            <MergeButton tag=" {description}" label="Service Description" tooltip="Add a brief description of the product or service" />
                            <MergeButton tag=" {benefits}" label="Benefits" tooltip="Service benefits (NOT) features" />
                            <MergeButton tag=" {features}" label="Features" tooltip="Service features" />
                            <MergeButton tag=" {context}" label="Campaign Context" tooltip="Campaign Context" />
                            <MergeButton tag=" {details}" label="Additional Details" tooltip="Any extra specific facts you want the AI to know and get right" />
                            <MergeButton tag=" {audience}" label="Audience" tooltip="Campaign audience" />
                        </div>
                        <Button variant="contained" onClick={handleUpdateTemplate}>Update Template</Button>
                    </div>
                )}
                {!selectedTemplateId && (
                    <div className="ml-10 w-full">
                        <h1 className="text-2xl font-bold">Select a template to edit or + to create a new template</h1>
                    </div>
                )}
            </div>
            <FloatingAddButton onClick={() => dispatch(createTemplateThunk())} />
        </AppLayout>
    )
}

export default Templates;