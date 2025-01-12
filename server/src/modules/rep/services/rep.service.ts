import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateRepDto } from '../dtos/create-rep.dto';
import { UpdateRepDto } from '../dtos/update-rep.dto';

@Injectable()
export class RepService {
    constructor(private readonly prisma: PrismaService) { }

    create(createRepDto: CreateRepDto) {
        return this.prisma.rep.create({ data: createRepDto });
    }

    findAll() {
        return this.prisma.rep.findMany();
    }

    findOne(id: number) {
        return this.prisma.rep.findUnique({ where: { id } });
    }

    update(id: number, updateRepDto: UpdateRepDto) {
        return this.prisma.rep.update({ where: { id }, data: updateRepDto });
    }

    remove(id: number) {
        return this.prisma.rep.delete({ where: { id } });
    }


    async copy(workoutSetItemInstanceId: number) {
        const workoutSetInstance = await this.prisma.workoutSetItemInstance.findUnique({
            where: { id: workoutSetItemInstanceId },
            include: { reps: { orderBy: { repNumber: 'asc' } } }
        });

        if (!workoutSetInstance || workoutSetInstance.reps.length === 0) {
            throw new Error('No reps found for the given workoutSetItemInstanceId');
        }

        const lastRep = workoutSetInstance.reps[workoutSetInstance.reps.length - 1];
        const newRepNumber = lastRep.repNumber + 1;

        const newRep = await this.prisma.rep.create({
            data: {
                ...lastRep,
                repNumber: newRepNumber,
                id: undefined // Ensure a new ID is generated
            }
        });

        return newRep;
    }
}
