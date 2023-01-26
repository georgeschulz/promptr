function NavItem({ isSelected = false, children }) {
    return (
        <li className="hover:underline cursor-pointer">{children}</li>
    )
}

export default NavItem;