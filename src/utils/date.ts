import { format, differenceInDays, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd');
  } catch {
    return dateString;
  }
};

export const formatDateKorean = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy년 M월 d일');
  } catch {
    return dateString;
  }
};

export const getDDay = (dueDate: string): number => {
  const today = new Date();
  const due = parseISO(dueDate);
  return differenceInDays(due, today);
};

export const isOverdue = (dueDate: string, isChecked: boolean): boolean => {
  if (isChecked) return false;
  return getDDay(dueDate) < 0;
};

export const getOverdueDays = (dueDate: string): number => {
  const dDay = getDDay(dueDate);
  return dDay < 0 ? Math.abs(dDay) : 0;
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd HH:mm');
  } catch {
    return dateString;
  }
};
