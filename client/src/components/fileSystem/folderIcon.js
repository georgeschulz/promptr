import { useNavigate } from "react-router-dom"
import folderImg from '../../assets/folder.png'

function FolderIcon({ folderId, name}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/folders/${folderId}`);
    }

    return (
        <div className="flex flex-wrap justify-center w-72 h-36 bg-light px-4 pt-6 pb-8 rounded-md hover:opacity-80 cursor-pointer" onClick={() => handleClick()}>
            <img src={folderImg} alt="folder" className="w-16 h-16" />
            <p className="w-full text-center text-lg">{name}</p>
        </div>
    )
}

export default FolderIcon;