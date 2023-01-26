import { Link } from "react-router-dom";
import NavItem from "./navItem";

function Nav() {
    return (
        <nav className="flex w-full justify-between px-16 py-6">
            <div>
                <h1 className="text-2xl font-semibold font-poppins">CopyPrompts</h1>
            </div>
            <div>
                <ul className="flex text-lg gap-4">
                    <NavItem><Link to="/folders">Folders</Link></NavItem>
                    <NavItem><Link to="/offers">Offers</Link></NavItem>
                    <NavItem><Link to="/businesses">Businesses</Link></NavItem>
                    <NavItem><Link to="/templates">Templates</Link></NavItem>
                    <NavItem>Settings</NavItem>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;