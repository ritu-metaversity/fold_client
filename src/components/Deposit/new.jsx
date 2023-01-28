import React, { useState } from "react";
// import { Button, message } from "antd";
import axios from "axios";
import { useContext } from "react";
// import { LoaderContext } from "../../App";
// import { Add_Bank } from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
const BankForm = () => {
//   const { loading, setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    bankName: "",
    ifsc: "",
    accountHolderName: "",
    accountNumber: "",
    accountType: "",
  });

  const [error, setError] = useState({
    bankName: false,
    ifsc: false,
    accountHolderName: false,
    accountNumber: false,
    accountType: false,
  });
  ////////image

  // console.log(fileList[0].name, "outer");

  //////////////

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setError((prev) => {
      return {
        ...prev,
        [name]: !Boolean(value),
      };
    });
  };

  const onSubmit = async () => {
    setError((prev) => {
      return {
        ...prev,
        bankName: !Boolean(data.bankName),
        ifsc: !Boolean(data.ifsc),
        accountHolderName: !Boolean(data.accountHolderName),
        accountNumber: !Boolean(data.accountNumber),
        accountType: !Boolean(data.accountType),
      };
    });

    if (
      !error.bankName &&
      !error.ifsc &&
      !error.accountHolderName &&
      !error.accountNumber &&
      !error.accountType
    ) {
      console.log("not hit");
    } else {
      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Add_Bank}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          message.success(res.data.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          if (error.response.data.status === 401) {
            setLoading((prev) => ({ ...prev, createDomain: false }));
            navigate("/");
            localStorage.removeItem("token");
            message.error(error.response.data.message);
          }
        });
      setLoading((prev) => ({ ...prev, createDomain: false }));
    }
  };

  return (
    <div className="form-domain-card">
      <p style={{ color: "#555", marginTop: "0px", fontWeight: "600" }}>
        ADD BANK
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Bank Name</label>
        <input
          type="text"
          placeholder="bank Name"
          name="bankName"
          value={data.bankName}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.bankName ? "1px solid red" : "1px solid #ced4da"}`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>IFSC Code</label>
        <input
          type="text"
          placeholder="IFSC Code"
          value={data.ifsc}
          name="ifsc"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.ifsc ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>AccountHolder Name</label>
        <input
          type="Text"
          placeholder="Account HolderName"
          value={data.accountHolderName}
          name="accountHolderName"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.accountHolderName ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>Account Number</label>

        <input
          type="text"
          placeholder="Account Number"
          value={data.accountNumber}
          name="accountNumber"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.accountNumber ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>accountType</label>

        <input
          type="text"
          placeholder="accountType"
          value={data.accountType}
          name="accountType"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.accountType ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <div className="btn" style={{ textAlign: "right" }}>
          <Button
            style={{ background: "black", color: "white", width: "auto" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BankForm;