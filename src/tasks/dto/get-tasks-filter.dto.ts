import { TaskStatus } from '../task.enum';

class GetTasksFIlterDto {
  status?: TaskStatus;
  search?: string;
}

export { GetTasksFIlterDto };
