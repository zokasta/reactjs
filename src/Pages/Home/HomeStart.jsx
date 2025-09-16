import Navbar from "./Navbar";
import DisplayImage from './displayImage.png'
import Section1 from './Section1'
import Section2 from "./Section2/Section2";
export default function HomeStart() {
    return (
        <div className="min-h-dvh relative">
            <div className="min-h-dvh relative">
                <Navbar />
                <div className="blur-[170px] top-0 left-0 h-72 w-72 rounded-full bg-[#54bd95] absolute -z-[1]" />
                <div className="blur-[170px] right-0 bottom-0 h-72 w-72 rounded-full bg-[#54bd95] absolute -z-[1]" />

                <div className="mx-auto max-w-6xl grid grid-cols-[1.5fr_1fr] mt-16 md:grid-cols-1 sm:grid-cols-1 sm:grid-rows-2 md:grid-rows-2">
                    <div className="">
                        <h1 className="sm:text-6xl text-7xl font-bold md:text-center sm:text-center md:mx-10 ">We're hear to <label className="text-[#3da97d]">Increase</label> your Productivity</h1>
                        <p className="mb-10 mt-5">"A wise man say that you can not build future<br/> without your team let make use your team" <br /> - <label className="font-extrabold text-[#54bd95]"> wise man</label></p>

                        <button className="px-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition select-none">
                            Contact us
                        </button>
                        <button className="px-4 select-none py-2 rounded-lg border-2 hover:border-solid delay-75 hover:border-[#54bd95] border-hidden text-[#54bd95] font-medium hover:bg-[#eafaf3] transition">
                            Sign In
                        </button>

                    </div>
                    <div className="border-10 border-[#54bd95] rounded-3xl cursor-pointer select-none">
                        <img draggable='false' src={DisplayImage} alt="not found" className="h-full object-cover rounded-2xl" />
                    </div>
                </div>
            </div>
            <Section1/>
            <Section2/>

        </div>
    )
}