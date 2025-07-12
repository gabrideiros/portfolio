import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TagInput } from '@/components/TagInput';
import { MediaPreview } from '@/components/MediaPreview';
import { Save, X } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  mediaType: 'image' | 'video';
}

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    tags: project?.tags || [],
    image: project?.image || '',
    link: project?.link || '',
    mediaType: project?.mediaType || 'image' as 'image' | 'video'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.image) {
      onSave(formData);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Project Title *
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter project title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description *
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your project"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <TagInput
          tags={formData.tags}
          onTagsChange={handleTagsChange}
          placeholder="Add tags (press Enter or comma to add)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="mediaType" className="text-sm font-medium">
            Media Type
          </label>
          <Select
            value={formData.mediaType}
            onValueChange={(value: 'image' | 'video') => 
              setFormData(prev => ({ ...prev, mediaType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">
            Media URL *
          </label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder={formData.mediaType === 'video' ? 'YouTube URL' : 'Image URL'}
            required
          />
        </div>
      </div>

      {formData.image && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Media Preview</label>
          <MediaPreview 
            url={formData.image} 
            type={formData.mediaType}
            className="max-w-md"
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="link" className="text-sm font-medium">
          External Link (optional)
        </label>
        <Input
          id="link"
          value={formData.link}
          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          placeholder="https://example.com"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {project ? 'Update Project' : 'Add Project'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}