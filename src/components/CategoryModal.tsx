import React, { useState, useEffect } from 'react';
import Modal from './common/Modal';
import Input from './common/Input';
import Button from './common/Button';
import { Category } from '../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: {
    name: string;
    description: string;
    color: string;
    isActive: boolean;
  }) => void;
  editCategory?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, editCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3F3F46');
  const [isActive, setIsActive] = useState(true);

  // 편집 모드일 때 데이터 로드
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
      setDescription(editCategory.description);
      setColor(editCategory.color);
      setIsActive(editCategory.isActive);
    }
  }, [editCategory]);

  const predefinedColors = [
    '#18181B', '#27272A', '#3F3F46', '#52525B', '#71717A',
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#84CC16', '#06B6D4',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('관리항목명을 입력해주세요.');
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      color,
      isActive,
    });

    // Reset form
    setName('');
    setDescription('');
    setColor('#3F3F46');
    setIsActive(true);
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setColor('#3F3F46');
    setIsActive(true);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={editCategory ? '관리항목 수정' : '새 관리항목 등록'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 항목명 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            항목명 <span className="text-danger">*</span>
          </label>
          <Input
            type="text"
            value={name}
            onChange={setName}
            placeholder="관리항목명을 입력하세요"
            className="w-full"
            required
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="관리항목 설명을 입력하세요"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm"
          />
        </div>

        {/* 색상 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">색상</label>
          <div className="flex flex-wrap gap-2">
            {predefinedColors.map((presetColor) => (
              <button
                key={presetColor}
                type="button"
                onClick={() => setColor(presetColor)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  color === presetColor ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: presetColor }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 rounded cursor-pointer"
            />
            <Input
              type="text"
              value={color}
              onChange={setColor}
              className="flex-1"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* 활성화 여부 */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
            />
            <span className="text-sm font-medium text-text-primary">활성화</span>
          </label>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
            취소
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            저장
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModal;
