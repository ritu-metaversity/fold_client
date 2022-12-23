import { Close } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubtractIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { UserContext } from "../../App";
import { colorHex } from "../../constants";
import {
  AmountInput,
  AmountInputBGBack,
  AmountInputBGLay,
  TitleStyled,
} from "./styledComponents";

interface Props {
  betId: number;
  setBetId: Dispatch<SetStateAction<number>>;
}

const gridProps = {
  item: true,
  xs: 2.2,
  my: 0.5,
  color: "text.primary",
  borderRadius: 1,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  bgcolor: colorHex.gr2,
  height: "40px",
};
export const BetSlip: FC<Props> = ({ betId, setBetId }) => {
  const { stakes } = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const matches = useMediaQuery("(min-width: 1279px)");
  if (!betId) return <></>;
  return (
    <Box textAlign={"left"}>
      {matches && <TitleStyled>Bet Slip</TitleStyled>}
      <Box p={0.5}>
        <Box display="flex" fontSize="0.8rem" justifyContent={"space-between"}>
          <Typography fontSize="0.8rem">
            Jaffna Kings v Galle Gladiators
          </Typography>
          <Close
            sx={{ cursor: "pointer" }}
            fontSize="small"
            onClick={() => {
              setBetId(0);
            }}
          />
        </Box>
        <Typography fontSize="0.8rem">MATCH_ODDS</Typography>
        <Box
          display="flex"
          my="0.8rem"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography fontSize="0.8rem" fontWeight={700} color="primary.main">
            Galle Gladiators
          </Typography>
          {matches ? (
            <TextField
              type={"number"}
              size="small"
              value={71}
              disabled
              InputProps={{ readOnly: true, style: { fontSize: "0.75rem" } }}
              sx={{ width: 80 }}
            />
          ) : (
            <Box display={"flex"} alignItems="center" bgcolor={colorHex.bg6}>
              <IconButton sx={{ bgcolor: "error.main", borderRadius: 0 }}>
                <SubtractIcon fontSize="small" />
              </IconButton>
              <Typography px={1}> 2.12 </Typography>
              <IconButton sx={{ bgcolor: "secondary.light", borderRadius: 0 }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* <Typography fontSize="0.8rem" fontWeight={700} color="primary.main">
           71
          </Typography> */}
        </Box>
      </Box>
      <Box
        display="flex"
        borderTop={`1px solid ${colorHex.borderLine} `}
        py={1}
      >
        <Box
          position="relative"
          width="50%"
          height="min-content"
          overflow="hidden"
        >
          {betId === 1 ? <AmountInputBGBack /> : <AmountInputBGLay />}
          <AmountInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </Box>
        {amount && (
          <Box ml="auto" mr={1}>
            <Typography
              color="text.primary"
              fontSize={"0.75rem"}
              textAlign="right"
            >
              Profit:
            </Typography>
            <Typography textAlign="right" fontSize={"0.9rem"}>
              938393.5
            </Typography>
          </Box>
        )}
      </Box>
      <Grid container rowGap={"5px"} gap={"2%"}>
        {Object.keys(stakes).map((key) => (
          <Grid {...gridProps} key={key + stakes[key]}>
            <Button fullWidth color="inherit">
              {stakes[key]}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        color="secondary"
        variant="contained"
        sx={{ my: 2, color: "text.secondary" }}
        fullWidth
      >
        {" "}
        Place Bet{" "}
      </Button>
    </Box>
  );
};
