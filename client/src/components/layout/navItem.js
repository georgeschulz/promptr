function NavItem({ isSelected = false, children }) {
    return (
        <li className="hover:underline cursor-pointer pt-1">{children}</li>
    )
}

export default NavItem;