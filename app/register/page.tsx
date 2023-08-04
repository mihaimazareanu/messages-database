import RegisterComponent from "../components/Register";
import "../../styles/register.scss";
import Navbar from "../components/Navbar";

const Register = () => {
  return (
    <>
      <Navbar />
      <RegisterComponent />;
    </>
  );
};

export default Register;
