import LoadingButton from "./components/LoadingButton";
import PostButton from "./components/PostButton";
import RetryButton from "./components/RetryButton";

export default function (props) {
  const { className, initiatePostRequest, postRequestStatus, idleText } = props;

  return (
    <div className={className + " d-inline"}>
      {postRequestStatus == "idle" ? (
        <PostButton
          initiatePostRequest={initiatePostRequest}
          idleText={idleText}
        />
      ) : postRequestStatus == "pending" ? (
        <LoadingButton />
      ) : postRequestStatus == "fulfilled" ? (
        "Done"
      ) : postRequestStatus == "rejected" ? (
        <RetryButton initiatePostRequest={initiatePostRequest} />
      ) : (
        "Default"
      )}
    </div>
  );
}
