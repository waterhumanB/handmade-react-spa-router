import { useRouter } from "../hooks/useRotuer";

const About = () => {
  const { push } = useRouter();

  return (
    <div>
      <h1>About</h1>
      <button onClick={() => push("/")}>Go Main</button>
    </div>
  );
};

export default About;
