export default function AboutSection() {
  const aboutList = [
    {
      title: "Quick Links",
      lists: [
        {
          title: "About Us",
          url: "/about-us",
        },
        {
          title: "Blogs",
          url: "/blogs",
        },
        {
          title: "Contact Us",
          url: "/contact-us",
        },
        {
          title: "FAQs",
          url: "/faq",
        },
        {
          title: "Career with Us",
          url: "/career-with-us",
        },
      ],
    },
    {
      title: "Find Tenders",
      lists: [
        {
          title: "By State",
          url: "/tender-search/by-state",
        },
        {
          title: "By City",
          url: "/tender-search/by-city",
        },
        {
          title: "By Keyword",
          url: "/tender-search/by-keyword",
        },
        {
          title: "By Industry",
          url: "/tender-search/by-industry",
        },
      ],
    },
    {
        title: "Site Information",
        lists: [
          {
            title: "Terms and Conditions",
            url: "/terms-and-conditions",
          },
          {
            title: "Privacy and Policy",
            url: "/privacy-and-policy",
          },
          {
            title: "Cookies Policy",
            url: "/cookies-policy",
          },
        ],
      },
  ];
  return (
    <div className="bg-secondary text-white">
      <div className="grid grid-cols-4 p-20 min-h-72 sm:grid-cols-2 gap-5 md:p-10  sm:p-10">
        {aboutList.map((data) => (
          <div className="">
            <h4 className="uppercase font-extrabold text-base">{data.title}</h4>
            <ul className="space-y-2 mt-4 text-[#ccc]">
              {data.lists.map((list) => (
                <li className="hover:pl-3 cursor-pointer delay-100 transition-all hover:text-white hover:font-semibold">
                  {list.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
            
        </div>
      </div>
    </div>
  );
}
