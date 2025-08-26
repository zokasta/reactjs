import HandshakeIcon from "@mui/icons-material/Handshake";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";

export default function Section1() {
  const list = [
    {
      key: 1,
      title: "Unparalleled Expertise",
      icon: <HandshakeIcon className="w-12 h-12" />,
      description:
        "With 12+ years of industry leadership, 500+ professionals, and 70k+ successful government tender submissions.",
    },
    {
      key: 2,
      title: "Certified Authority & Trust",
      icon: <VerifiedUserIcon className="w-12 h-12" />,
      description:
        "We are an ISO 9001:2015 certified firm, trusted by 176,000+ satisfied clients and holding an exceptional 4.9/5 Google Rating.",
    },
    {
      key: 3,
      title: "Complete Tender Support",
      icon: <DataThresholdingIcon className="w-12 h-12" />,
      description:
        "From registration to bid submission, our expert consultants provide full support and strategic guidance — every step of the way.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl font-extrabold text-secondary mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray text-lg">
          With over a decade of trusted expertise, we empower businesses to win
          more with confidence and clarity.
        </p>
      </div>

      {/* Cards */}
      <div
        className="
          max-w-6xl mx-auto px-6 
          grid gap-8 
          sm:grid-cols-1        /* ≤567px → 1 col */
          md:grid-cols-2        /* 568–823px → 2 cols */
          lg:grid-cols-3        /* 824–1079px → 3 cols */
          xl:grid-cols-3        /* ≥1280px → 3 cols */
        "
      >
        {list.map((item) => (
          <div
            key={item.key}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center hover:-translate-y-2"
          >
            {/* Icon */}
            <div className="mb-6">
              <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white">
                  <div className="scale-150">
                  {item.icon}
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-secondary mb-3">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-gray-dark leading-relaxed text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
