import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checklist from './pages/Checklist';
import Calendar from './pages/Calendar';
import Categories from './pages/Categories';
import Settlement from './pages/Settlement';
import Settings from './pages/Settings';
import TaskModal from './components/TaskModal';
import CategoryModal from './components/CategoryModal';
import { tasks as initialTasks, categories as initialCategories, users } from './data/mockData';
import { Task, TaskCycle, TaskPriority, Category } from './types';
import { format } from 'date-fns';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

  const handleSaveCategory = (categoryData: {
    name: string;
    description: string;
    color: string;
    isActive: boolean;
  }) => {
    if (editingCategory) {
      // 수정
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...categoryData }
            : category
        )
      );
    } else {
      // 생성
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        ...categoryData,
        sortOrder: categories.length + 1,
      };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }

    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setEditingCategory(category);
      setIsCategoryModalOpen(true);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    // 해당 카테고리를 사용하는 업무가 있는지 확인
    const tasksUsingCategory = tasks.filter(t => t.categoryId === categoryId);
    if (tasksUsingCategory.length > 0) {
      alert(`이 관리항목을 사용하는 업무가 ${tasksUsingCategory.length}개 있어 삭제할 수 없습니다.`);
      return;
    }
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
  };

  const handleOpenNewCategoryModal = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
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
          <Route
            path="/calendar"
            element={
              <Calendar
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onEditTask={handleEditTask}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <Categories
                tasks={tasks}
                categories={categories}
                onEditCategory={handleEditCategory}
                onDeleteCategory={handleDeleteCategory}
                onOpenCategoryModal={handleOpenNewCategoryModal}
              />
            }
          />
          <Route path="/settlement" element={<Settlement tasks={tasks} />} />
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

        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          editCategory={editingCategory}
        />
      </Layout>
    </HashRouter>
  );
}

export default App;
