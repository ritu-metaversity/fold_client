import { Dialog, DialogContent } from "@mui/material";
import React, { FC } from "react";
import { useRef } from "react";
import { ImageContainer, ZoomingImage } from "./styledComponents";

interface Props {
  open: boolean;
  handleClose: () => void;
  src: string;
}
const ImageModal: FC<Props> = ({ open, handleClose, src }) => {
  const containerRef = useRef(null);
  return (
    <Dialog open={open} maxWidth="lg" onClose={handleClose}>
      <DialogContent sx={{ width: "100%", p: 0.7 }}>
        <ImageContainer ref={containerRef}>
          <ZoomingImage src={src} alt="zoomed image" />
        </ImageContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
