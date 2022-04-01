import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.enum';

class UpdateTasksStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export { UpdateTasksStatusDto };
