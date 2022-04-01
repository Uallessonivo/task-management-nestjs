import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.enum';

class GetTasksFIlterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}

export { GetTasksFIlterDto };
