const T20Rule = () => {
  return (
    <>
      <div
        className="w-100  text-white p-2 d-flex last-font"
        style={{ background: "#0088cc" }}>
        Rule
      </div>
      <div className="table-responsive rules-table">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th
                colSpan={2}
                className="box-10 text-center"
                style={{ fontSize: "14px" }}>
                Pair Plus
              </th>
            </tr>
          </thead>
          <tbody className="pair_value">
            <tr>
              <td className="box-7 rule_text">Pair (Double)</td>{" "}
              <td className="box-3 rule_right">1 To 1</td>
            </tr>
            <tr>
              <td className="box-7 rule_text">Flush (Color)</td>{" "}
              <td className="box-3 rule_right">1 To 4</td>
            </tr>
            <tr>
              <td className="box-7 rule_text">Straight (Rown)</td>{" "}
              <td className="box-3 rule_right">1 To 6</td>
            </tr>
            <tr>
              <td className="box-7 rule_text">Trio (Teen)</td>{" "}
              <td className="box-3 rule_right">1 To 35</td>
            </tr>
            <tr>
              <td className="box-7 rule_text">Straight Flush (Pakki Rown)</td>{" "}
              <td className="box-3 rule_right">1 To 45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default T20Rule;
