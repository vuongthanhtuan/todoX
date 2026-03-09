import AddTask from "@/components/AddTask.jsx";
import DateTimeFilter from "@/components/DateTimeFileter.jsx";
import StatsAndFilters from "@/components/StatsAndFilter.jsx";
import TaskList from "@/components/TaskList.jsx";
import TaskListPangination from "@/components/TaskListPangination.jsx";
import { Header } from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import React, { useEffect, useState } from "react";
import { toast } from 'sonner';
import api from "@/lib/axios.js";
import { visibleTaskLimit } from "@/lib/data.js";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setcompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState('all');
    const [dateQuery, setDateQuery] = useState('all');
    const [page, setPage] = useState(1);

    useEffect(() => {
    fetchTasks();
    }, [dateQuery]);

    // logic
    const fetchTasks = async () => {
        try {
        const res = await api.get(`/tasks?filter=${dateQuery}`);
        setTaskBuffer(res.data.tasks);
        setActiveTaskCount(res.data.activeTaskCount);
        setcompleteTaskCount(res.data.completeTaskCount);
        } catch (error) {
        console.error("Lỗi xảy ra khi truy xuất tasks:", error);
        toast.error("Lỗi xảy ra khi truy xuất tasks.");
        }
    };

    const handleTaskChanged = () => {
        fetchTasks();
    };

    const handleNext = () => {
        if (page < totalPages) {
        setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
        setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // bien
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter){
            case 'active':
                return task.status === 'active';
            case 'completed':
                return task.staus === 'complete';
            default:
                return true;
        }
    });

    const visibleTasks = filteredTasks.slice(
        (page-1)*visibleTaskLimit,
        page*visibleTaskLimit
    );
    if (visibleTasks.length === 0) {
        handlePrev();
    }; 
    const totalPages = Math.ceil(filteredTasks.length/visibleTaskLimit);

    return (
        <div className="min-h-screen w-full bg-[#fefcff] relative">
            {/* Dreamy Sky Pink Glow */}
        <div
            className="absolute inset-0 z-0"
            style={{
            backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
            }}
        />
                <div className="container pt-8 mx-auto relattive z-10">  
                    <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                        {/*Dau trang */}
                        <Header />

                        {/*Tao Nhiem vu */}
                        <AddTask handleNewTaskAdded={handleTaskChanged}/>

                        {/*Thong ke va bo loc */}
                        <StatsAndFilters

                            activeTasksCount={activeTaskCount}
                            completedTasksCount={completeTaskCount}
                        />

                        {/*Danh sach nhiem vu */}
                        <TaskList 
                            filteredTasks={visibleTasks} 
                            filter={filter}
                            handleTaskChanged={handleTaskChanged}
                        />

                        {/*Phan trang va loc theo Date */}
                        <div className="flex flex-col item-center justify-between gap-6 sm:flex-row">
                            <TaskListPangination
                                handleNext={handleNext}
                                handlePrev={handlePrev}
                                handlePageChange={handlePageChange}
                                page={page}
                                totalPages={totalPages}
                            />
                            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                        </div>

                        {/*Chan Trang */}
                        <Footer
                            activeTasksCount={activeTaskCount}
                            completedTasksCount={completeTaskCount}
                        />
                        
                    </div>
                </div>
        </div>
    );
};

export default HomePage;