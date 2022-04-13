import { Repository } from 'typeorm';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { GetTasksFIlterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../entity/task.entity';
import { TaskStatus } from '../task.enum';
import { User } from '../../auth/entity/user.entity';

class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }

  async getTasks(filterDto: GetTasksFIlterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
}

export { TasksRepository };
