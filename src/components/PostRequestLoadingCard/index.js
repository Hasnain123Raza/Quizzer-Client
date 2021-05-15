import { Card } from "react-bootstrap";
import PostRequestButton from "../PostRequestButton";

export default function (props) {
  const {
    className,
    initiatePostRequest,
    postRequestStatus,
    pendingHeaderText,
    rejectedHeaderText,
    pendingBodyText,
    rejectedBodyText,
  } = props;

  return (
    <div className={className}>
      <Card>
        <Card.Header>
          <h4>
            {postRequestStatus == "rejected"
              ? rejectedHeaderText
              : pendingHeaderText}
          </h4>
        </Card.Header>
        <Card.Body>
          {postRequestStatus == "rejected" ? rejectedBodyText : pendingBodyText}
        </Card.Body>
        <Card.Footer className="d-flex">
          <PostRequestButton
            className="ml-auto"
            initiatePostRequest={initiatePostRequest}
            postRequestStatus={postRequestStatus}
            idleText="Default"
          />
        </Card.Footer>
      </Card>
    </div>
  );
}
