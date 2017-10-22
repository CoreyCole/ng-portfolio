import { StorylineParams } from './storyline-params';

export interface Project {
  projectId: string;
  rank?: number;
  title: string;
  description: string;
  image: string;
  skillTags: string[];
  components?: StorylineParams[];
}
