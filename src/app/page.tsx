"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Plus, ListTodo, Calendar, Flag } from "lucide-react";
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Task, UserSession } from "@types";
import { signOut, useSession } from "next-auth/react";
import { addTask } from "@/utils/addTask";
import { fetchTasks } from "@/utils/fetchTasks";
import { deleteTask } from "@/utils/deleteTask";
import { TaskSkeleton } from "@/components/TaskSkeleton";
import toast from "react-hot-toast";

export default function Home () {
  const [list, setList] = useState<Task[]>([]);
  const [item, setItem] = useState("");
  const [priority, setPriority] = useState<"low" | "med" | "high">("med");
  const [date, setDate] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true)
        if (isDataLoaded == true) return; 
        const tasks = await fetchTasks(session?.user as string)
        if (!Array.isArray(tasks)) {
          console.error(tasks.error);
          return;
        }
        console.log(tasks)
        setList(tasks)
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("An unexpected error occurred")
        }
      } finally {
        setIsDataLoaded(true)
        setLoading(false)
      }
    } 

    setUserSession({ session: { user: session?.user as string, expires: session?.expires as string }, status: status })
    if (status == "authenticated") {
      loadTasks()
    }
  }, [session, status])

  const handleSubmit = async () => {
    if (!item.trim()) return;
    if (!session) {
      console.error("User is not authenticated");
      return;
    }

    const newTask: Task = {
      item,
      priority,
      date,
      userId: userSession?.session.user as string,
    };

    addTask(newTask)

    setList((prevList) => [...prevList, newTask]);
    setItem("");
    setDate("");
    setPriority("med");
    setIsDialogOpen(false);
  };

  const handleRemoval = async (id: string) => {
    setList(list.filter(task => task.id !== id));
    const res = await deleteTask(id)
    if (res?.error) {
      console.error(res.error)
    }
  };

  const getPriorityColor = (priority: "low" | "med" | "high") => {
    switch (priority) {
      case "high": return "text-red-500";
      case "med": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <ListTodo className="w-6 h-6 text-blue-500" />
                Tasks
              </span>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              <Plus className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              Sign Out
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {loading ? (
            <TaskSkeleton />
          ) : list.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">
                <ListTodo className="w-12 h-12 mx-auto text-gray-300" />
              </div>
              <p className="text-lg font-medium">Your task list is empty</p>
            </div>
          ) : (
            <ul className="space-y-3">
            {list.map((task, idx) => (
              <li
                key={idx}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <button
                  onClick={() => handleRemoval(task.id as string)}
                  className="flex-shrink-0"
                >
                  <CheckCircle2 className="w-6 h-6 text-gray-300 hover:text-blue-500 transition-colors" />
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">{task.item}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                      <Flag className="w-4 h-4" />
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    {task.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(task.date)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task">Task Description</Label>
              <Input
                id="task"
                placeholder="What needs to be done?"
                onChange={(e) => setItem(e.target.value)}
                value={item}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Flag className={`w-4 h-4 ${getPriorityColor(priority)}`} />
                      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setPriority("high")} className="gap-2">
                    <Flag className="w-4 h-4 text-red-500" /> High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriority("med")} className="gap-2">
                    <Flag className="w-4 h-4 text-yellow-500" /> Medium Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriority("low")} className="gap-2">
                    <Flag className="w-4 h-4 text-green-500" /> Low Priority
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Due Date</Label>
              <Input
                type="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!item.trim()}
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}