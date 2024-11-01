import { useState } from "react";
import { Chart } from "react-google-charts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

function GanttChart() {
  const [rows, setRows] = useState([]);

  const [processID, setProcessID] = useState("");
  const [burstTime, setBurstTime] = useState("");

  const addProcess = () => {
    const burst = parseInt(burstTime);
    let startDate;

    if (rows.length === 0) {
      startDate = new Date(2023, 0, 1, 0, 0, 0, 0);
    } else {
      const lastProcessEndTime = rows[rows.length - 1][3].getTime();
      startDate = new Date(lastProcessEndTime);
    }

    const endDate = new Date(startDate.getTime() + burst);

    const newProcess = [
      processID,
      `CPU Task ${processID}`,
      startDate,
      endDate,
      burst,
      100,
      null,
    ];

    setRows((prevRows) => [...prevRows, newProcess]);

    // Clear input fields
    setProcessID("");
    setBurstTime("");
  };

  // Gantt Chart data
  const data = [columns, ...rows];

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Dialog for Adding New Process */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add Process</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Process</DialogTitle>
            <DialogDescription>
              Add a process into the queue via the First Come First Serve algorithm!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="processID" className="text-right">Process ID</Label>
              <Input id="processID" value={processID} onChange={(e) => setProcessID(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="burstTime" className="text-right">Burst Time in (ms) </Label>
              <Input id="burstTime" value={burstTime} onChange={(e) => setBurstTime(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant={"outline"} type="button" onClick={addProcess}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Render Gantt Chart */}
      <Chart
        chartType="Gantt"
        data={data}
        width="40rem"
        height="300px"
        loader={<div>Loading Chart...</div>}
        className="border-red-600 mt-4"
      />
    </div>
  );
}

export default GanttChart;
