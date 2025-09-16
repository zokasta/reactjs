import Rating from '@mui/material/Rating';
import ReactMoment from 'react-moment'


export default function CardSection2({card}) {
  return (
    <div key={card.id} className="min-w-[33%] md:min-w-[50%] sm:min-w-[100%] max-w-[33%] p-4 select-none">
      <div className="bg-white rounded-md shadow-lg p-6 ">
        <div className="grid grid-cols-[50px_1fr] h-[50px]">
          <img
            src={card.profileImage}
            className="w-[50px] h-[50px] rounded-full border-4 border-[#54bd95]"
            alt=""
          />
          <div className="grid grid-rows-2 pl-2">
            <p className="font-bold text-[#081c4e]">{card.name}</p>
            <p className="text-[#a9a9a9]">{card.location}</p>
          </div>
        </div>
        <p className='mt-3'>{card.review}</p>
        <div className="grid grid-cols-2 mt-2">
          <Rating
            name="half-rating-read"
            defaultValue={card.rating}
            precision={0.5}
            readOnly
          />
          <p className='text-right text-[#a9a9a9]'>
            <ReactMoment to={card.timestamp} format="DD MMMM YYYY" />
          </p>
        </div>
      </div>
    </div>
  );
}
