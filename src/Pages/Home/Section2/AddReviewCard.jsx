import Rating from "@mui/material/Rating";

export default function AddReviewCard({
  data = {
    profileImage: "https://i.pravatar.cc/150?u=random125",
    name: "Faiz Rajput",
    location: "Ahmedabad, Gujarat",
  },
}) {
  return (
    <div
      key={Math.random()}
      className="min-w-[33%] md:min-w-[50%] sm:min-w-[100%] max-w-[33%] p-4 select-none"
    >
      <div className="bg-white rounded-md shadow-lg p-6">
        {/* Profile */}
        <div className="grid grid-cols-[50px_1fr] h-[50px]">
          <img
            src={data.profileImage}
            className="w-[50px] h-[50px] rounded-full border-4 border-[#54bd95]"
            alt=""
          />
          <div className="grid grid-rows-2 pl-2">
            <p className="font-bold text-[#54bd95]">{data.name}</p>
            <p className="text-[#a9a9a9]">{data.location}</p>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          id="message"
          rows="4"
          className="mt-4 block p-2.5 max-h-[150px] w-full text-sm rounded-lg border border-primary-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="Write your thoughts here..."
        ></textarea>

        {/* Rating */}
        <Rating name="half-rating-read" precision={1} />
        <br />

        {/* Button */}
        <button className="px-4 mt-3 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition select-none">
          Submit
        </button>
      </div>
    </div>
  );
}
