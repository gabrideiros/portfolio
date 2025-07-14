import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ProjectCard } from './ProjectCard';
import type { Project } from './ProjectForm';

interface DraggableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  isDragging?: boolean;
}

export function DraggableProjectCard({
  project,
  onEdit,
  onDelete,
  isLoading,
}: DraggableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: project.id,
    disabled: isLoading,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
    zIndex: isSortableDragging ? 1000 : 1,
    scale: isSortableDragging ? 0.95 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing
        ${isSortableDragging ? 'shadow-2xl shadow-primary/20' : ''}
        ${isLoading ? 'pointer-events-none' : ''}
      `}
    >
      <ProjectCard
        project={project}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </div>
  );
}