import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checklist from './pages/Checklist';
import Categories from './pages/Categories';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import TaskModal from './components/TaskModal';
import { tasks as initialTasks, users } from './data/mockData';
import { Task, TaskCycle, TaskPriority } from './types';
import { format } from 'date-fns';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const currentUser = users.find((u) => u.email === currentUserEmail);

  const handleLogin = (email: string) => {
    setCurrentUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail('');
  };

  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isChecked: !task.isChecked,
              checkedAt: !task.isChecked ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : undefined,
              checkedBy: !task.isChecked && currentUser ? currentUser.id : undefined,
            }
          : task
      )
    );
  };

  const handleSaveTask = (taskData: {
    companyId: number;
    title: string;
    categoryId: number;
    assigneeId: number;
    cycle: TaskCycle;
    priority: TaskPriority;
    dueDate: string;
    notes: string;
  }) => {
    if (editingTask) {
      // 수정
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      // 생성
      const newTask: Task = {
        id: Math.max(...tasks.map((t) => t.id)) + 1,
        ...taskData,
        isChecked: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleEditTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsTaskModalOpen(true);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleOpenNewTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  if (!isLoggedIn) {
    return (
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <Layout
        currentUser={
          currentUser
            ? {
                name: currentUser.name,
                role: currentUser.role === 'admin' ? '관리자' : '담당자',
              }
            : undefined
        }
        onLogout={handleLogout}
      >
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard allTasks={tasks} onToggleTask={handleToggleTask} />}
          />
          <Route
            path="/checklist"
            element={
              <Checklist
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onOpenTaskModal={handleOpenNewTaskModal}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            }
          />
          <Route path="/categories" element={<Categories tasks={tasks} />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          editTask={editingTask}
        />
      </Layout>
    </HashRouter>
  );
}

export default App;
