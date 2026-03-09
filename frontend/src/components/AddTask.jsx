import React, { useState } from "react";
import { Card } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { Plus } from "lucide-react";
import api from "@/lib/axios.js";
const AddTask = () => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if(newTaskTitle.trim()) {
            try {
                await api.post('/tasks', {title: newTaskTitle});
                toast.success(`Nhiem bu ${newTaskTitle} da duoc them vao.`);
                handleNewTaskAdd();
            } catch (error) {
                console.error("Loi xay ra khi them task.", error);
                toast.error('loi xay ra khi them nhiem vu moi.')
            }
            setNewTaskTitle("");
            
        }
        else{
            toast.error("Ban can nhap noi dung cua nhiem vu.")
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Cần phải làm gì?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle}
                    onChange={(even) => setNewTaskTitle(even.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5"/>
                    Thêm
                </Button>
            </div>

        </Card>
    );
};

export default AddTask;