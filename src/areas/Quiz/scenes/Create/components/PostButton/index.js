import React from "react";
import { useSelector } from "react-redux";
import { sGetPostQuizRequestStatus } from "../../services/createSlice/selectors.js";
import CreateButton from "./components/CreateButton";
import LoadingButton from "./components/LoadingButton";
import RetryButton from "./components/RetryButton";

export default function () {
  const postQuizRequestStatus = useSelector(sGetPostQuizRequestStatus);

  return (
    <React.Fragment>
      {postQuizRequestStatus == "idle" ? (
        <CreateButton />
      ) : postQuizRequestStatus == "pending" ? (
        <LoadingButton />
      ) : postQuizRequestStatus == "fulfilled" ? (
        "Done"
      ) : postQuizRequestStatus == "rejected" ? (
        <RetryButton />
      ) : (
        "Default"
      )}
    </React.Fragment>
  );
}
