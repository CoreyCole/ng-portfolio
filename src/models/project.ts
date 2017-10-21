import { StorylineParams } from './storyline-params';

export interface Project {
  title: string;
  description: string;
  image: string;
  skillTags: string[];
  components: StorylineParams[];
}
