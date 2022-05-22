import HeaderBackButton from "./HeaderBackButton";
import HeaderSearch from "./HeaderSearch";
import Wallet from "components/wallet/Wallet";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="relative p-6 sm:p-12 sm:pb-0 flex items-center justify-end">
      <HeaderBackButton />
      <HeaderSearch />
      <Wallet />
    </div>
  );
};

export default Header;
