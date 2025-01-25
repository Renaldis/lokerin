import Navbar from "./navbar/Navbar";

function Layout(props) {
  return (
    <>
      <Navbar className="sticky top-0 z-50 bg-white shadow-sm" />
      <main className="overflow-x-hidden">{props.children}</main>
    </>
  );
}

export default Layout;
