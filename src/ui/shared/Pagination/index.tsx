import ReactPaginate from "react-paginate";
import type { PaginationType } from "./pagination.type";
import { useSearchParams } from "react-router-dom";
import ArrowSVG from "@svg/chevron_up.svg?react";

const Pagination = ({ total, perPage = 10, pageChange }: PaginationType) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (page: { selected: number }) => {
    setSearchParams((prevParams) => {
      page.selected !== 0
        ? prevParams.set("Index", (Number(page.selected) + 1).toString())
        : prevParams.delete("Index");
      return prevParams;
    });
    pageChange?.(page.selected);
  };

  return (
    <div className={`w-full items-center gap-x-4 ${total ? "flex" : "hidden"}`}>
      {total > perPage && (
        <ReactPaginate
          containerClassName="w-fit py-1 px-4 mx-auto flex items-center gap-x-4 rounded select-none"
          pageClassName="h-9 flex items-center text-center rounded-md hover:bg-gray-100"
          pageLinkClassName="size-10 flex justify-center items-center"
          activeClassName="bg-blue-50 pointer-events-none"
          previousClassName="previous [&.disabled]:pointer-events-none [&.disabled]:opacity-50"
          nextClassName="next [&.disabled]:pointer-events-none [&.disabled]:opacity-50"
          previousLabel={
            <div className="h-10 px-4 flex justify-center items-center hover:bg-gray-100 border border-gray-200 rounded-md">
              <ArrowSVG className="size-3 -rotate-90" />
            </div>
          }
          nextLabel={
            <div className="h-10 px-4 flex justify-center items-center hover:bg-gray-100 border border-gray-200 rounded-md">
              <ArrowSVG className="size-3 rotate-90" />
            </div>
          }
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          initialPage={
            searchParams.get("Index")
              ? Number(searchParams.get("Index")) - 1
              : undefined
          }
          pageCount={Math.ceil(total / perPage)}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
};

export default Pagination;
