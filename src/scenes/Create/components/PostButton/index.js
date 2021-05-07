import React from "react";
import { useSelector } from "react-redux";
import { getQuizCreateForm } from "../../services/quizCreateFormSlice/selectors.js";
import CreateButton from "./components/CreateButton";
import LoadingButton from "./components/LoadingButton";
import RetryButton from "./components/RetryButton";

export default function () {
  const quizForm = useSelector(getQuizCreateForm);
  const { postStatus } = quizForm;

  return (
    <React.Fragment>
      {postStatus == "idle" ? (
        <CreateButton />
      ) : postStatus == "pending" ? (
        <LoadingButton />
      ) : postStatus == "fulfilled" ? (
        "Done"
      ) : postStatus == "rejected" ? (
        <RetryButton />
      ) : (
        "Default"
      )}
    </React.Fragment>
  );
}
