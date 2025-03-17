import { cn } from "@/app/utils/cn";
import type { ImageType } from "./image.type";

const Image = ({ url, alt, className, objectFit = "cover" }: ImageType) => {
  return (
    <div className={cn("w-full h-full rounded overflow-clip", className)}>
      <img
        className={cn(
          "w-full h-full",
          objectFit === "cover" ? "object-cover" : "object-contain"
        )}
        src={url}
        alt={alt}
      />
    </div>
  );
};
export default Image;
