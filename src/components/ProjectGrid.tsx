import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableProjectCard } from './DraggableProjectCard';
import { ProjectCard } from './ProjectCard';
import type { Project } from './ProjectForm';

interface ProjectGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onReorder: (projects: Project[]) => void;
  isLoading?: boolean;
}

export function ProjectGrid({
  projects,
  onEdit,
  onDelete,
  onReorder,
  isLoading,
}: ProjectGridProps) {
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const project = projects.find(p => p.id === active.id);
    setActiveProject(project || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveProject(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedProjects = arrayMove(projects, oldIndex, newIndex);
      onReorder(reorderedProjects);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={projects.map(p => p.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <DraggableProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              isLoading={isLoading}
            />
          ))}
        </div>
      </SortableContext>
      
      <DragOverlay>
        {activeProject ? (
          <div className="transform rotate-3 shadow-2xl">
            <ProjectCard
              project={activeProject}
              onEdit={() => {}}
              onDelete={() => {}}
              isLoading={false}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}