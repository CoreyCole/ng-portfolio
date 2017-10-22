import { StorylineParams } from './storyline-params';

export interface Project {
  projectId: string;
  title: string;
  description: string;
  image: string;
  skillTags: string[];
  components?: StorylineParams[];
}
