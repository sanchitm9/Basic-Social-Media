const WelcomeMessage = ({onGetPostsClick}) => {
  return (
    <center className="welcome-message">
      <h1 >There are no posts left.</h1>
      <button type="button" class="btn 
      btn-primary"
      onClick={onGetPostsClick}
      >Get Posts from Server</button>
    </center>
  );
};

export default WelcomeMessage;
