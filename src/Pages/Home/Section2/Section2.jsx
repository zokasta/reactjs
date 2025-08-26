import React from "react";
import Carousel from "../../../Components/ui/Carousel";
import CardSection2 from "./CardSection2";
import { cards } from "./tempData";
import AddReviewCard from "./AddReviewCard";
const options = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
};

export default function Section2() {
  return (
    <div className="bg-[#081c4e] py-10 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2">
          <div className="md:hidden sm:hidden"></div>
          <div className="text-center text-6xl text-white font-extrabold ml-5 md:text-left sm:text-left ">
            Reviews
          </div>
          <div className="float-right">
            <button className="mt-5 mr-5 float-right px-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition select-none ">
              Add Review
            </button>
          </div>
        </div>
        <Carousel options={options}>
          <AddReviewCard card={cards} />
          {cards.map((card) => (
            <CardSection2 card={card} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
