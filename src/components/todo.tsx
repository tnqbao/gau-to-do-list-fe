import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {axiosAPIInstance} from "@/utils/axios.config";
import {toast} from "sonner";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export default function TodoComponent() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({title: "", description: ""});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axiosAPIInstance.get("/tasks");
            setTasks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async () => {
        if (!newTask.title.trim() || !newTask.description.trim()) {
            toast.error("Vui lòng nhập đầy đủ tiêu đề và mô tả!");
            return;
        }
        try {
            const response = await axiosAPIInstance.post("/tasks", newTask);
            setTasks((prevTasks) => [
                ...prevTasks,
                {...newTask, id: response.data.taskID, completed: false},
            ]);
            setNewTask({title: "", description: ""});
            toast.success("Thêm công việc thành công!");
        } catch (error) {
            toast.error("Lỗi khi thêm công việc!");
            console.error("Error adding task:", error);
        }
    };


    const toggleTask = async (id: number, completed: boolean) => {
        try {
            await axiosAPIInstance.put(`/tasks/${id}`, {completed});
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? {...task, completed} : task))
            );
            toast.success("Cập nhật trạng thái công việc!");
        } catch (error) {
            toast.error("Lỗi khi cập nhật công việc!");
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await axiosAPIInstance.delete(`tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            toast.success("Xóa công việc thành công!");
        } catch (error) {
            toast.error("Lỗi khi xóa công việc!");
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="w-4/5 mx-auto p-6 md:p-12">
            <Card className={"bg-white"}>
                <CardHeader>
                    <h2 className="text-xl font-bold text-center"> 🐼 Gấu To Do List 🐼</h2>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4 flex-wrap justify-evenly ">
                        <Input
                            placeholder="Tiêu đề"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            className={"w-full md:w-2/5"}
                        />
                        <div className={"flex gap-1 justify-between w-full md:w-1/2"}>
                            <Input
                                placeholder="Mô tả cụ thể"
                                value={newTask.description}
                                onChange={(e) =>
                                    setNewTask({...newTask, description: e.target.value})
                                }
                                className={"flex w-4/5"}
                            />
                            <Button
                                onClick={addTask}
                                disabled={!newTask.title.trim() || !newTask.description.trim()}
                                className={`flex w-1/5 text-center ${
                                    !newTask.title.trim() || !newTask.description.trim()
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-black"
                                }`}
                            >
                                Thêm
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Đang tải...</p>
                    ) : Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div key={task.id} className="flex items-center gap-4 border p-3 rounded-lg mb-2">
                                <Checkbox
                                    checked={task.completed}
                                    onCheckedChange={() => toggleTask(task.id, !task.completed)}
                                />
                                <div className="flex-1">
                                    <h3 className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{task.description}</p>
                                </div>
                                <Button className="bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => deleteTask(task.id)}>
                                    Xóa
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Chưa có công việc</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
