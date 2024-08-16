import Loading from "../../Assets/SVG/Loading";

export default function Button({
  onClick = () => {},
  value = "Button",
  loading = false,
  className='',
}) {
  return (
    <>
      {!loading ? (
        <button
          className={`py-2 mt-4 rounded-md text-white text-xl font-bold px-10 bg-orange-500 shadow-md hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-offset-2 ring-orange-500 outline-none focus-visible:bg-orange-500 ${className}`}
          onClick={onClick}
        >
          {value}
        </button>
      ) : (
        <button
          className={`py-2 mt-4 rounded-md text-white text-xl font-bold px-12 bg-orange-500 shadow-md hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-offset-2 ring-orange-500 outline-none focus-visible:bg-orange-500 ${className}`}
          disabled
        >
          <Loading />
        </button>
      )}
    </>
  );
}
