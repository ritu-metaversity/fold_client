import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { colorHex } from "../../utils/constants";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  color: theme.palette.text.secondary,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.7rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: "8px 8px 0 0",
  minHeight: "25px",
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down("lg")]: {
    borderRadius: "4px 4px 0 0",
    minHeight: "15px",
    "& .MuiAccordionSummary-content": {
      marginBlock: theme.spacing(1),
    },
  },
  marginTop: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? colorHex.bg2 : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: 0,
  backgroundColor: colorHex.bg1,
}));

interface Props extends React.PropsWithChildren {
  title?: React.ReactNode | string;
}
export default function CustomizedAccordions({ children, title }: Props) {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
