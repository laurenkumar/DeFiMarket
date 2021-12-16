import HeaderBackButton from "./HeaderBackButton";
import HeaderSearch from "./HeaderSearch";
import Wallet from "components/wallet/Wallet"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="relative p-6 sm:p-12 sm:pb-0 flex items-center justify-end">
      <HeaderBackButton />
      <HeaderSearch />
      <Wallet />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        className="h-8 ml-4 hidden sm:inline"
        src={"/icons/logo.svg"}
        alt="logo"
      />
    </div>
  );
};

export default Header;
