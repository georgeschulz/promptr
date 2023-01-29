import { Link } from "react-router-dom";
import NavItem from "./navItem";
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from "@mui/material";
import AccountMenu from "./AccountMenu";

function Nav() {
    return (
        <nav className="flex w-full justify-between px-16 py-6">
            <div>
                <Link to="/folders">
                    <h1 className="text-2xl font-semibold font-poppins">CopyPrompts</h1>
                </Link>
            </div>
            <div>
                <ul className="flex text-lg gap-4">
                    <NavItem><Link to="/folders">Folders</Link></NavItem>
                    <NavItem><Link to="/offers">Offers</Link></NavItem>
                    <NavItem><Link to="/businesses">Businesses</Link></NavItem>
                    <NavItem><Link to="/templates">Templates</Link></NavItem>
                    <AccountMenu />
                </ul>
            </div>
        </nav>
    )
}

export default Nav;