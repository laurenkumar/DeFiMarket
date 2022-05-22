interface FooterDisclaimerProps {}

const FooterDisclaimer: React.FC<FooterDisclaimerProps> = () => {
  return (
    <div className="text-base bg-[#1a1a2c] text-white py-4 px-12">
      <strong>Disclaimer:</strong> This project is in building phase and is
      subject to change.
    </div>
  );
};

export default FooterDisclaimer;
