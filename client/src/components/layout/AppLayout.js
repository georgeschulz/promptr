import Nav from "./nav";

function AppLayout({ children }) {
  return (
    <div className="h-screen">
      <Nav />
      {children}
    </div>
  );
}

export default AppLayout;