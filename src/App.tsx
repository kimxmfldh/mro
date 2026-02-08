import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    title: string;
    categoryId: number;
    assigneeId: number;
    cycle: TaskCycle;
    priority: TaskPriority;
    dueDate: string;
    notes: string;
  }) => {
    const newTask: Task = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      ...taskData,
      isChecked: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsTaskModalOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
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
                onOpenTaskModal={() => setIsTaskModalOpen(true)}
              />
            }
          />
          <Route path="/categories" element={<Categories />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
        />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
