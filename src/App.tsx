import GanttChart from "./components/GanttChart";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <div className="flex flex-col items-center justify-center border border-black h-[65%] p-5">
        <h1 className="text-white"> FIRST-COME-FIRST-SERVE </h1>
        <GanttChart />
      </div>
      
    </div>
  );
}

export default App;
