import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-50 bg-backgroundSecondary text-primary p-4">
      <Link href="/">
        <SlArrowLeft />
      </Link>
      <div className="flex gap-4">
        <Link href="/">Profile</Link>
        <Link href="/">Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;
