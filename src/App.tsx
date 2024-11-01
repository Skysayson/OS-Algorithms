import GanttChart from "./components/GanttChart";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
        <h1 className="text-black mb-6"> FCFS ALGORITHM </h1>
      <div className="flex flex-col items-center justify-center border border-black h-[65%] p-5">
        <GanttChart />
      </div>
      
    </div>
  );
}

export default App;
