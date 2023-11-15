export default function Filter() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-center  bg-blue-500 text-white rounded-full w-24 h-10 p-2">
        <span>Day</span>
      </div>
      <div className="border-l-2 border-grey h-6 mx-2"></div>
      <div className="text-center w-1/3">
        <span>Week</span>
      </div>
      <div className="border-l-2 border-grey h-6 mx-2"></div>
      <div className="text-center w-1/3">
        <span>Month</span>
      </div>
    </div>
  );
}
