import { PrismaClient, TargetArea } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  const listWorkouts = [
    { id: 1, name: "Push Ups", targetArea: TargetArea.Chest },
    { id: 2, name: "Chest Press", targetArea: TargetArea.Chest },
    { id: 3, name: "Tricep Extensions", targetArea: TargetArea.Triceps },
    { id: 4, name: "Tricep Pulldowns", targetArea: TargetArea.Triceps },
    { id: 5, name: "Treadmill", targetArea: TargetArea.Cardio },
    { id: 6, name: "Sauna", targetArea: TargetArea.Cardio },
    { id: 7, name: "Lat Pulldowns", targetArea: TargetArea.Back },
    { id: 8, name: "Seated Rows", targetArea: TargetArea.Back },
    { id: 9, name: "Bicept Curls", targetArea: TargetArea.Biceps },
    { id: 10, name: "Hammer Curls", targetArea: TargetArea.Biceps },
    { id: 11, name: "Crunches", targetArea: TargetArea.Abs },
    { id: 12, name: "Leg Raises", targetArea: TargetArea.Legs },
    { id: 13, name: "Plank", targetArea: TargetArea.Abs },
    { id: 14, name: "Shoulder Press", targetArea: TargetArea.Shoulders },
    { id: 15, name: "Lateral Raises", targetArea: TargetArea.Shoulders },
    { id: 16, name: "Leg Extensions", targetArea: TargetArea.Legs },
    { id: 17, name: "Lying Leg Curls", targetArea: TargetArea.Legs },
    { id: 18, name: "Calf Raises", targetArea: TargetArea.Legs },
  ];

  for (const workout of listWorkouts) {
    await prisma.listWorkouts.upsert({
      where: { id: workout.id },
      update: workout, // Update fields if record exists
      create: workout, // Create record if it doesn't exist
    });
  }

  console.log("listWorkouts Database seeded successfully!");
}