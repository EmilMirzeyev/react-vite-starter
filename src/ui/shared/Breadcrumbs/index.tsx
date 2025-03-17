import { Link } from "react-router-dom";
import type { MouseEvent } from "react";
import type { BreadcrumbsType } from "./breadcrumbs.type";
import ChevronSVG from "@svg/chevron_up.svg?react";
import { cn } from "@/app/utils/cn.ts";

const Breadcrumbs = ({ crumbs }: BreadcrumbsType) => {
  return (
    <div aria-label="breadcrumb" className="flex items-center gap-x-2">
      {crumbs.map((crumb) => (
        <div className="flex items-center gap-x-2 group" key={crumb.id}>
          <Link
            className={cn(
              "text-14px400 text-gray-500 group-last:text-14px600 group-last:text-blue-600",
              !crumb.link && "cursor-default"
            )}
            to={crumb.link ?? ""}
            onClick={(e: MouseEvent<HTMLAnchorElement>) =>
              !crumb.link && e.preventDefault()
            }
          >
            {crumb.name}
          </Link>
          <ChevronSVG className="size-2 rotate-90 group-last:hidden" />
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
