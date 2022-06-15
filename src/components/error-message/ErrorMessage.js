import "./ErrorMessage.css";

const ErrorMessage = () => {
  return (
    <div className="errorMessage" data-testid="errorMessage">
      An error occured. Please try again a bit later.
      <br />
      If the error persists, contact the tech support.
    </div>
  );
};
export default ErrorMessage;
