import AppLayout from "../components/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBusinesses, selectBusinesses, setSearchTerm, selectSearchTerm, setSelectedBusinessId, selectSelectedBusiness, newBusiness, removeBusiness, setNewBusinessName, setNewBusinessDescription, selectNewBusinessName, selectNewBusinessDescription, updateBusiness, selectAudiences, updateAudienceMember, removeAudienceMember, addAudience, setAudiences } from "../redux/businessesSlice";
import SearchMenu from "../components/fileSystem/searchMenu";
import FloatingAddButton from "../components/buttons/FloatingAddButton";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Businesses() {
    const dispatch = useDispatch();
    const businesses = useSelector(selectBusinesses);
    const selectedBusiness = useSelector(selectSelectedBusiness)
    const newBusinessName = useSelector(selectNewBusinessName)
    const newBusinessDescription = useSelector(selectNewBusinessDescription)
    const audiences = useSelector(selectAudiences)

    useEffect(() => {
        dispatch(getBusinesses());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setNewBusinessName(selectedBusiness?.name || ""))
        dispatch(setNewBusinessDescription(selectedBusiness?.description || ""))
        const audienceArray = selectedBusiness?.audiences?.map(audience => audience.name) || []
        dispatch(setAudiences(audienceArray || []))
    }, [selectedBusiness])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedBusiness) {
            dispatch(updateBusiness({
                businessId: selectedBusiness.business_id,
                updates: { name: newBusinessName, description: newBusinessDescription, audiences }
            }));
        }
    }

    return (
        <AppLayout>
            <div className="px-16 py-10 flex" style={{ alignItems: 'flex-start'}}>
                <SearchMenu
                    data={businesses}
                    setSearch={(e) => dispatch(setSearchTerm(e.target.value))}
                    search={useSelector(selectSearchTerm)}
                    headerPropertyName="name"
                    descriptionPropertyName="description"
                    idPropertyName="business_id"
                    setSelectedItem={setSelectedBusinessId}
                    deleteItem={removeBusiness}
                />
                {selectedBusiness &&
                    <div className="ml-10 w-full">
                        <TextField
                            label="Business Name"
                            value={newBusinessName}
                            onChange={(e) => dispatch(setNewBusinessName(e.target.value))}
                            style={{ width: "100%", marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Business Description"
                            value={newBusinessDescription}
                            onChange={(e) => dispatch(setNewBusinessDescription(e.target.value))}
                            style={{ width: "100%", marginBottom: "1rem" }}
                            multiline={true}
                            rows={4}
                        />
                        <div className="flex justify-between align-middle mb-2" style={{ width: '400px' }}>
                            <p className="font-semibold text-lg ">Audience List for Business</p>
                            <IconButton onClick={() => dispatch(addAudience(""))}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <div>
                            <ul>
                                {audiences.map((audience, i) => {
                                    return (<li>
                                        <TextField
                                            value={audience}
                                            onChange={(e) => dispatch(updateAudienceMember({ index: i, newValue: e.target.value }))}
                                            style={{ width: "75%", marginBottom: "1rem" }}
                                        />
                                        <IconButton onClick={() => dispatch(removeAudienceMember({ index: i }))}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </li>
                                    )
                                })
                                }
                            </ul>


                        </div>
                        <br />
                        <Button variant="contained" onClick={handleSubmit}>Save</Button>
                    </div>
                }

                {!selectedBusiness &&
                    <div className="ml-10 w-full">
                        <h1 className="text-2xl font-bold">Select a business to edit</h1>
                    </div>

                }
                <FloatingAddButton
                    onClick={() => dispatch(newBusiness())}
                />
            </div>
        </AppLayout>
    )
}

export default Businesses;