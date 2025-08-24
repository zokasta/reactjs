import HandshakeIcon from "@mui/icons-material/Handshake";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
export default function Section1() {
  const list = [
    {
      key: 1,
      title: "Unparalleled Expertise",
      icon: <HandshakeIcon classname="w-14 h-14 fill-white" />,
      description:
        "With 12+ years of industry leadership, 500+ professionals, and 70k+ successful government tender submissions.",
    },
    {
      key: 1,
      title: "Certified Authority & Trust",
      icon: <VerifiedUserIcon classname="w-14 h-14 fill-white" />,
      description:
        "We are an ISO 9001:2015 certified firm, trusted by 176,000+ satisfied clients and holding an exceptional 4.9/5 Google Rating.",
    },
    {
      key: 1,
      title: "Unparalleled Expertise",
      icon: <DataThresholdingIcon classname="w-14 h-14 fill-white" />,
      description:
        "From registration to bid submission, our expert consultants provide full support and strategic guidance — every step of the way.",
    },
  ];
  return (
    <div className="">
      <h2 className="text-center font-black text-[2.75rem] ">Why Choose Us?</h2>
      <p className="text-center text-[#8a8ea2]">
        This is some random things like it like mangos but it could anything
      </p>
      <div className="grid md:grid-cols-1 sm:grid-cols-1 grid-cols-3 gap-10 p-10">
        {list.map((list) => (
          <div className="group min-h-96 hover:shadow-xl delay-100 shadow rounded-xl p-8">
            <div className="flex items-center justify-center mb-10">
              <div className="w-32 min-h-32 rounded-full bg-[#081c4e] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#54bd95] flex items-center justify-center">
                  <div className="text-white scale-[250%]">{list.icon}</div>
                </div>
              </div>
            </div>
            <h4 className="text-center text-lg font-bold">{list.title}</h4>
            <p className="text-center text-lg">{list.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
