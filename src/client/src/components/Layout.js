import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Table from "./Table";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="content">
          <h1>PENDING POSTS</h1>
          <Table />
        </div>
      </main>
    </>
  );
};

export default Layout;
