const RulesBoard = () => {
  return (
    <div className="border rounded-md md:py-4 py-2 px-8 ">
      <h1 className="text-xl font-semibold text-center mb-4">Rules</h1>
      <div className="flex justify-between gap-6">
        <div className="flex flex-wrap items-center  gap-4 ">
          <div className="saved circle-btn ">N</div>
          <p>Solved</p>
        </div>
        <div className="flex flex-wrap items-center  gap-4">
          <div className="not-saved circle-btn ">N</div>
          <p>Not-Solved</p>
        </div>
      </div>
    </div>
  );
};

export default RulesBoard;
