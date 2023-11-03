import { Link } from "react-router-dom";
import UpChevronSVG from "@svg/up_chevron.svg?react";
import XSVG from "@svg/x.svg?react";
import { PostCardType } from "./postCard";

const PostCard = ({ id, title, description, deleteHandler }: PostCardType) => {
  return (
    <div className="relative flex flex-col gap-4 p-4 border rounded overflow-hidden">
      <h2 className="font-semibold pr-4">{title}</h2>
      <p>{description}</p>
      <Link to={id.toString()} aria-label={title} className="w-min mt-auto ml-auto"><UpChevronSVG className="w-6 h-6 text-red rotate-90" /></Link>
      <XSVG className="absolute top-0 right-0 bg-red text-white cursor-pointer hover:brightness-125" onClick={deleteHandler} />
    </div>
  );
};

export default PostCard;
