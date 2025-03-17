import PdfIcon from "@svg/pdf.svg?react";
import MP4Icon from "@svg/mp4.svg?react";
import ImageIcon from "@svg/image_icon.svg?react";
import FigIcon from "@svg/fig.svg?react";
import DefaultFileIcon from "@svg/file_icon.svg?react";
import { DocumentIconType } from "./document_icon.type";

const DocumentIcon = ({ fileFormat, size, className }: DocumentIconType) => {
  const icons = {
    pdf: PdfIcon,
    mp4: MP4Icon,
    fig: FigIcon,
    jpg: ImageIcon,
    jpeg: ImageIcon,
    png: ImageIcon,
  };

  const RenderIcon = icons[fileFormat] || DefaultFileIcon;
  return <RenderIcon width={size} height={size} className={className} />;
};

export default DocumentIcon;
