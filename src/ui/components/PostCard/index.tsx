import { Link } from "react-router-dom";
import ChevronUpSVG from "@svg/chevron_up.svg?react";
import XSVG from "@svg/x.svg?react";
import EditSVG from "@svg/edit.svg?react";
import type { PostCardType } from "./post_card.type";

const PostCard = ({
  id,
  title,
  description,
  updateHandler,
  deleteHandler,
}: PostCardType) => {
  return (
    <>
      <div className="relative flex flex-col gap-4 p-4 border rounded overflow-hidden">
        <h2 className="font-semibold pr-4">{title}</h2>
        <p>{description}</p>
        <div className="flex items-center gap-4 mt-auto ml-auto">
          <EditSVG
            className="text-blue cursor-pointer"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Edit"
            data-tooltip-place="top"
            onClick={updateHandler}
          />
          <Link to={id.toString()} aria-label={title} className="w-min">
            <ChevronUpSVG className="size-6 text-red rotate-90" />
          </Link>
        </div>
        <XSVG
          className="absolute top-0 right-0 bg-red-500 text-white cursor-pointer hover:brightness-125"
          onClick={deleteHandler}
        />
      </div>
    </>
  );
};

export default PostCard;
