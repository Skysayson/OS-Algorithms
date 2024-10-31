import { Button } from "@/components/ui/button";
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
import { useState } from "react";

function CardComp() {
  const [rows, setRows] = useState([
    [
      "Process1",
      "CPU Task 1",
      new Date(2023, 0, 1, 0, 0, 0, 0),
      new Date(2023, 0, 1, 0, 0, 0, 100),
      100,
      100,
      null,
    ],
    [
      "Process2",
      "CPU Task 2",
      new Date(2023, 0, 1, 0, 0, 0, 100),
      new Date(2023, 0, 1, 0, 0, 0, 300),
      200,
      100,
      "Process1",
    ],
  ]);

  // States for new process input fields
  const [processID, setProcessID] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");

  // Function to add new process to rows
  const addProcess = () => {
    const startDate = new Date(2023, 0, 1, 0, 0, 0, parseInt(arrivalTime));
    const endDate = new Date(startDate.getTime() + parseInt(burstTime));

    const newProcess = [
      processID,
      `CPU Task ${rows.length + 1}`, // Task name
      startDate,
      endDate,
      parseInt(burstTime), // Duration
      100, // Percent Complete
      null, // Dependencies
    ];

    // Update rows array with new process
    setRows([...rows, newProcess]);

    // Clear inputs after adding
    setProcessID("");
    setArrivalTime("");
    setBurstTime("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add Process</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Process</DialogTitle>
            <DialogDescription>
              Add a process into the queue via the First Come First Serve
              algorithm!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="processID" className="text-right">
                Process ID
              </Label>
              <Input
                id="processID"
                value={processID}
                onChange={(e) => setProcessID(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="arrivalTime" className="text-right">
                Arrival Time
              </Label>
              <Input
                id="arrivalTime"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="col-span-3"
              />
              <Label htmlFor="burstTime" className="text-right">
                Burst Time
              </Label>
              <Input
                id="burstTime"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant={"outline"} type="button" onClick={addProcess}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CardComp;
