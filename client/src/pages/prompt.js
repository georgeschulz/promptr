import AppLayout from "../components/layout/AppLayout";
import { IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { duplicatePromptThunk, selectAudienceOptions, selectBusinessDescription, selectCurrentBusinessId, selectCurrentOfferId, selectCurrentTemplateId, selectPromptName, selectPrompts, setAudienceOptions, setBusinessDescription, setPromptName } from "../redux/promptsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPromptsThunk, setAdditionalDetails, setContext, setAudience, setLength, setPrompt, selectAdditionalDetails, selectAudience, selectContext, selectLength, selectPrompt, setCurrentTemplateId, setCurrentBusinessId, selectOfferDescription, selectOfferBenefits, selectOfferPainPoints, selectOfferFeatures, setCurrentOfferId, setCurrentOfferBenefits, setCurrentOfferDescription, setCurrentOfferFeatures, setCurrentOfferPainPoints } from "../redux/promptsSlice";
import { getTemplates, selectTemplates } from "../redux/templatesSlice";
import { getOffers, selectOffers } from "../redux/offerSlice";
import { getBusinesses } from "../redux/businessesSlice";
import { getFolders } from "../redux/foldersSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { selectBusinesses } from "../redux/businessesSlice";
import Autocomplete from '@mui/material/Autocomplete';
import FillTemplate from "../components/fileSystem/fillTemplate";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { selectIsUpdateSuccess, setIsUpdateSuccess } from "../redux/promptsSlice";
import SuccessBox from "../components/layout/sucessBox";

function Prompt() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const prompts = useSelector(selectPrompts);
    const prompt = prompts ? prompts.find(prompt => prompt.prompt_id === Number(id)) : "";
    const promptName = useSelector(selectPromptName)
    const [edit, setEdit] = useState(false);
    const promptText = useSelector(selectPrompt);
    const additionalDetails = useSelector(selectAdditionalDetails);
    const context = useSelector(selectContext);
    const audience = useSelector(selectAudience);
    const length = useSelector(selectLength);
    const templateId = useSelector(selectCurrentTemplateId)
    const templates= useSelector(selectTemplates)
    const businessId = useSelector(selectCurrentBusinessId)
    const businesses = useSelector(selectBusinesses)
    const business = useSelector(selectBusinessDescription)
    const offerId = useSelector(selectCurrentOfferId)
    const offers = useSelector(selectOffers)
    const offerDescription = useSelector(selectOfferDescription)
    const offerPainPoints = useSelector(selectOfferPainPoints)
    const offerBenefits = useSelector(selectOfferBenefits)
    const offerFeatures = useSelector(selectOfferFeatures)
    const isUpdateSuccess = useSelector(selectIsUpdateSuccess)
    const audienceOptions = useSelector(selectAudienceOptions)
    let finalPrompt = { 
        context: context || "", 
        audience: audience || "", 
        length: length || "",
        details: additionalDetails || "",
        biz: business || "",
        description: offerDescription || "",
        pain: offerPainPoints || "",
        benefits: offerBenefits || "",
        features: offerFeatures || "",
    }

    useEffect(() => {
        dispatch(fetchPromptsThunk());
        dispatch(getTemplates())
        dispatch(getOffers())
        dispatch(getBusinesses())
        dispatch(getFolders())
    }, [dispatch]);

    useEffect(() => {
        if (prompt) {
            dispatch(setPrompt(prompt.prompt));
            dispatch(setAdditionalDetails(prompt.additional_details));
            dispatch(setContext(prompt.context));
            dispatch(setAudience(prompt.audience));
            dispatch(setLength(prompt.length));
            dispatch(setCurrentTemplateId(prompt.template_id))
            dispatch(setCurrentBusinessId(prompt.business_id))
            dispatch(setCurrentOfferId(prompt.offer_id))
            dispatch(setPromptName(prompt.prompt_name))
        }
    }, [prompt, id])

    const handleTemplateChange = (e) => {
        dispatch(setCurrentTemplateId(e.target.value))
        const currentTemplate = templates.find(template => template.template_id === e.target.value)
        dispatch(setPrompt(currentTemplate.template))
    }

    const handleBusinessChange = (e) => {
        dispatch(setCurrentBusinessId(e.target.value))
        const business = businesses.find(business => business.business_id === e.target.value)
        dispatch(setBusinessDescription(business.description))
        dispatch(setAudienceOptions(business.audiences))
    }

    const handleOfferChange = (e) => {
        dispatch(setCurrentOfferId(e.target.value))
        const currentOffer = offers.find(offer => offer.offer_id === e.target.value)
        dispatch(setCurrentOfferDescription(currentOffer.description))
        dispatch(setCurrentOfferPainPoints(currentOffer.pain_points))
        dispatch(setCurrentOfferBenefits(currentOffer.benefits))
        dispatch(setCurrentOfferFeatures(currentOffer.features))
    }

    const handleChangeAudience = (e, value) => {
        dispatch(setAudience(value.title))
    }

    const handleDuplicate = async () => {
        const data = await dispatch(duplicatePromptThunk(id))
        const newId = data.payload.data.prompt_id
        navigate(`/prompts/${newId}`)
    }

    const handleEdit = () => {
        setEdit(!edit)
    }

    return (
        <AppLayout>
            {isUpdateSuccess && <SuccessBox message="Prompt updated successfully" open={isUpdateSuccess} setOpen={setIsUpdateSuccess} />}
            <div className="px-16 py-10">
                <div className="flex justify-between">
                    <div className="flex mb-8">
                        {!edit  && <h1 className="text-2xl font-bold flex flex-wrap space-y-4">{promptName}</h1> }
                        {edit && <TextField
                            id="outlined-basic"
                            label="Prompt Name"
                            variant="outlined"
                            value={promptName}
                            onChange={(e) => dispatch(setPromptName(e.target.value))}
                            sx={{ width: '300px'}}
                        />}
                        
                        <IconButton onClick={handleEdit}>
                            <EditIcon sx={{ width: '20px'}} />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton onClick={handleDuplicate}>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="mb-4">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Template</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={templateId || ""}
                            label="Template"
                            onChange={handleTemplateChange}
                        >
                            {templates.map(template => (
                                <MenuItem value={template.template_id} key={template.template_id}>{template.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="mb-4">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Business</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={businessId || ""}
                            label="Business"
                            onChange={handleBusinessChange}
                        >
                            {businesses.map(business => (
                                <MenuItem value={business.business_id} key={business.business_id}>{business.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="mb-4">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Offer</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={offerId || ""}
                            label="Offer"
                            onChange={handleOfferChange}
                        >
                            {offers.map(offer => (
                                <MenuItem value={offer.offer_id} key={offer.offer_id}>{offer.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="mb-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Context"
                        multiline
                        rows={3}
                        value={context || ""}
                        onChange={(e) => dispatch(setContext(e.target.value))}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                    <Autocomplete
                        id="combo-box-demo"
                        freeSolo
                        options={audienceOptions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: "100%" }}
                        onChange={handleChangeAudience}
                        renderInput={(params) => <TextField {...params} label="Audience" variant="outlined" />}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        id="outlined-multiline-static"
                        label="Length"
                        value={length || ""}
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
                        value={additionalDetails || ""}
                        onChange={(e) => dispatch(setAdditionalDetails(e.target.value))}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                    {typeof promptText == "string" && (<FillTemplate
                        template={promptText}
                        data={finalPrompt}
                        id={id}
                    />)}
                </div>
            </div>
        </AppLayout>
    )
}

export default Prompt;