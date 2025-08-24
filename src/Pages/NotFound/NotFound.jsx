import {useNavigate} from 'react-router-dom'

export default function NotFound() {
    const history = useNavigate();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#e4e3e3]">
      <div>
        <h1 className="text-center text-[200px] font-black text-[#54bd95] text-bold font-sans sm:text-[100px]">
          Oops
        </h1>
        <h1 className="text-center text-[#8ab4a4] text-4xl uppercase font-bold md:text-base">
          Sorry, not found this page
        </h1>
        <p className="text-center mt-6 font-medium max-w-[600px] text-[#676e73]">
          Sorry, this page is not exist so you can return to home page or you
          can back to home or you can go to login page with this login button{" "}
        </p>
        <div className="grid grid-cols-2 gap-6 mt-5">
          <div>
            <button className="w-52 float-right h-14 rounded-full bg-[#54bd95] text-white text-2xl sm:w-40 focus-visible:ring-2 ring-offset-2 ring-[#54bd95] outline-none" onClick={()=>history('/')}>
            Go to Home
            </button>
          </div>
          <button className="w-52 h-14 rounded-full border-2 border-[#54bd95] text-[#54bd95] sm:w-40 text-2xl font-medium outline-none focus-visible:ring-2 ring-offset-2 ring-[#54bd95]" onClick={()=>history(-1)}>
            
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
