import AppLayout from "../components/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectOffers, selectNewOfferBenefits, selectNewOfferDescription, selectNewOfferFeatures, selectNewOfferName, selectNewOfferPainpoints, selectSearchTerm, selectSelectedOfferId, setNewOfferBenefits, setNewOfferDescription, setNewOfferFeatures, setNewOfferName, setNewOfferPainpoints, setOffers, setSearchTerm, setSelectedOfferId, getOffers, createNewOffer, deleteSelectedOffer, updateOffer } from "../redux/offerSlice";
import SearchMenu from "../components/fileSystem/searchMenu";
import FloatingAddButton from "../components/buttons/FloatingAddButton";
import { Button, TextField } from "@mui/material";
import { selectIsUpdateSuccess, setIsUpdateSuccess } from "../redux/offerSlice";
import SuccessBox from "../components/layout/sucessBox";

function Offers() {
    const dispatch = useDispatch();
    const offers = useSelector(selectOffers);
    const newOfferName = useSelector(selectNewOfferName);
    const newOfferDescription = useSelector(selectNewOfferDescription);
    const newOfferPainpoints = useSelector(selectNewOfferPainpoints);
    const newOfferBenefits = useSelector(selectNewOfferBenefits);
    const newOfferFeatures = useSelector(selectNewOfferFeatures);
    const searchTerm = useSelector(selectSearchTerm);
    const selectedOfferId = useSelector(selectSelectedOfferId);
    const isUpdateSuccess = useSelector(selectIsUpdateSuccess);

    useEffect(() => {
        dispatch(getOffers());
    }, [dispatch])

    useEffect(() => {
        const currentOffer = offers.find(offer => offer.offer_id === selectedOfferId);
        if (currentOffer) {
            dispatch(setNewOfferName(currentOffer.name));
            dispatch(setNewOfferDescription(currentOffer.description));
            dispatch(setNewOfferPainpoints(currentOffer.pain_points));
            dispatch(setNewOfferBenefits(currentOffer.benefits));
            dispatch(setNewOfferFeatures(currentOffer.features));
        }
    }, [dispatch, selectedOfferId])

    const handleUpdateOffer = () => {
        dispatch(updateOffer({
            businessId: selectedOfferId,
            updates: {
                name: newOfferName,
                description: newOfferDescription,
                pain_points: newOfferPainpoints,
                benefits: newOfferBenefits,
                features: newOfferFeatures,
            }
        }))
    }

    return (
        <AppLayout>
            { isUpdateSuccess && <SuccessBox message="Offer updated successfully" open={isUpdateSuccess} setOpen={setIsUpdateSuccess} /> }
            <div className="px-16 py-10 flex" style={{ alignItems: 'flex-start'}}>
                <SearchMenu
                    data={offers}
                    search={searchTerm}
                    setSearch={(e) => dispatch(setSearchTerm(e.target.value))}
                    headerPropertyName="name"
                    descriptionPropertyName="description"
                    idPropertyName="offer_id"
                    deleteItem={deleteSelectedOffer}
                    setSelectedItem={setSelectedOfferId}
                />
                { selectedOfferId &&
                    <div className="ml-10 w-full float-left">
                        <TextField label="Offer Name" value={newOfferName} onChange={(e) => dispatch(setNewOfferName(e.target.value))} style={{ width: "100%", marginBottom: "1rem" }} />        
                        <TextField label="Offer Description" value={newOfferDescription} onChange={(e) => dispatch(setNewOfferDescription(e.target.value))} style={{ width: "100%", marginBottom: "1rem" }} multiline={true} rows={4} />
                        <TextField label="Pain Points" value={newOfferPainpoints} onChange={(e) => dispatch(setNewOfferPainpoints(e.target.value))} style={{ width: "100%", marginBottom: "1rem" }} multiline={true} rows={4} />
                        <TextField label="Benefits" value={newOfferBenefits} onChange={(e) => dispatch(setNewOfferBenefits(e.target.value))} style={{ width: "100%", marginBottom: "1rem" }} multiline={true} rows={4} />
                        <TextField label="Features" value={newOfferFeatures} onChange={(e) => dispatch(setNewOfferFeatures(e.target.value))} style={{ width: "100%", marginBottom: "1rem" }} multiline={true} rows={4} />
                        <Button variant="contained" onClick={() => handleUpdateOffer()}>Save</Button>
                    </div>
                }
                { !selectedOfferId &&
                    <div className="ml-10 w-full float-left">
                        <h1 className="text-2xl font-bold">Select an offer to edit</h1>
                    </div>
                }

                <FloatingAddButton onClick={() => dispatch(createNewOffer())} />
            </div>
        </AppLayout>
    )
}

export default Offers;