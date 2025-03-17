import { TableContainer } from "@/ui/shared/Table/TableContainer";
import { Link } from "react-router-dom";
import { HomePageVM } from "./home_page.vm";

const HomePage = () => {
  const { rows, columns } = HomePageVM();

  return (
    <div className="container">
      <h1 className="text-lg font-bold">HomePage</h1>
      <Link to="/posts" className="text-blue">
        Go to Posts
      </Link>
      <TableContainer
        headData={columns}
        bodyData={rows}
        pagination={{ total: 9, perPage: 10 }}
      />
    </div>
  );
};

export default HomePage;
