import Image from "next/image";

interface FooterBottomProps {}

const FooterBottom: React.FC<FooterBottomProps> = () => {
  return (
    <div
      className="py-8 px-12 flex-col items-center
    border-t border-[rgba(26, 26, 44, 0.05)] md:flex"
    >
      <Image
        height={24}
        width={80}
        objectFit="contain"
        src="/icons/logo.svg"
        alt="logo"
      />
      <span className="text-sm whitespace-nowrap opacity-75 ml-4">
        &copy; 2020 | Developed by{" "}
        <a
          href="https://github.com/laurenkumar/"
          className="text-white transition-all duration-200 
          border-b border-dotted border-white
          hover:text-[#59629e] hover:border-[#59629e]"
        >
          LaurenKumar
        </a>
      </span>
    </div>
  );
};

export default FooterBottom;
