import { Repository } from 'typeorm';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { GetTasksFIlterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../entity/task.entity';
import { TaskStatus } from '../task.enum';

class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  async getTasks(filterDto: GetTasksFIlterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}

export { TasksRepository };
