const About = () => {
  const goMainBtn = () => {
    window.history.back();
  };

  return (
    <div>
      <h1>About</h1>
      <button onClick={goMainBtn}>Go Main</button>
    </div>
  );
};

export default About;
