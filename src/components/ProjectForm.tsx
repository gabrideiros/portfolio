import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/TagInput";
import MediaPreview from "@/components/MediaPreview";
import { Save, X } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  media_type: "image" | "video";
  order_index?: number;
}

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Omit<Project, "id">) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProjectForm({
  project,
  onSave,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    tags: project?.tags || [],
    image: project?.image || "",
    link: project?.link || "",
    media_type: project?.media_type || ("image" as "image" | "video"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.image) {
      onSave(formData);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Project Title *
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter project title"
          className="h-10"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-foreground"
        >
          Description *
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe your project"
          rows={4}
          className="resize-none"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Tags</label>
        <TagInput
          tags={formData.tags}
          onTagsChange={handleTagsChange}
          placeholder="Add tags (press Enter or comma to add)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="media_type"
            className="text-sm font-medium text-foreground"
          >
            Media Type
          </label>
          <Select
            value={formData.media_type}
            onValueChange={(value: "image" | "video") =>
              setFormData((prev) => ({ ...prev, media_type: value }))
            }
          >
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-foreground"
          >
            Media URL *
          </label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
            placeholder={
              formData.media_type === "video" ? "YouTube URL" : "Image URL"
            }
            className="h-10"
            required
          />
        </div>
      </div>

      {formData.image && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Media Preview
          </label>
          <MediaPreview
            url={formData.image}
            type={formData.media_type}
            className="w-full max-w-lg mx-auto"
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="link" className="text-sm font-medium text-foreground">
          External Link (optional)
        </label>
        <Input
          id="link"
          value={formData.link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, link: e.target.value }))
          }
          placeholder="https://example.com"
          className="h-10"
        />
      </div>
      <div className="flex gap-3 pt-6 border-t">
        <Button
          type="submit"
          className="flex-1 h-10 shadow-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2"></div>
              {project ? "Updating..." : "Creating..."}
            </div>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {project ? "Update Project" : "Add Project"}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-10"
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}
