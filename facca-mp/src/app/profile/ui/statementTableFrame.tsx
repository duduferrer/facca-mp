"use client";
import StatementTable from "./statementTable";

const StatementTableFrame = ({ userID }: { userID: string | undefined }) => {
  return (
    <>
      <StatementTable userID={userID} />
    </>
  );
};

export default StatementTableFrame;
