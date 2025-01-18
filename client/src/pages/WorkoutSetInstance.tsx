import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

interface Rep {
  id: string;
  repNumber: number;
  count?: number;
  weight?: number;
  weightUnit?: 'lbs' | 'kg';
  distance?: number;
  distanceUnit?: 'mi' | 'km';
  time?: number;
  timeUnit?: 'min' | 'sec';
  notes?: string;
}

interface WorkoutSetItemInstance {
  id: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'NOT_STARTED';
  order: number;
  workoutListItem: {
    name: string;
    targetArea: 'Chest' | 'Abs' | 'Shoulders' | 'Back' | 'Biceps' | 'Triceps' | 'Cardio' | 'Legs';
  };
  reps: Rep[];
}

interface WorkoutSetInstance {
  id: string;
  scheduledDate: string;
  actualDate?: string;
  description?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'NOT_STARTED';
  workoutSetItemInstances: WorkoutSetItemInstance[];
}

const WorkoutSetInstance = () => {
  const { id } = useParams<{ id: string }>();
  const [workoutSet, setWorkoutSet] = useState<WorkoutSetInstance | null>(null);

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`http://localhost:3001/api/v1/workout-set-instances/${id}`)
      .then((response) => {
        setWorkoutSet(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!workoutSet) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div>Loading...</div>
      </div>
    );
  }

  const { scheduledDate, description, workoutSetItemInstances } = workoutSet;
  const formattedDate = moment(scheduledDate).format('dddd MMM D, YYYY');

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">{formattedDate}</h1>
      <h2 className="text-xl text-gray-700 mb-6">{description}</h2>

      {workoutSetItemInstances.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md mb-6 p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">{item.workoutListItem.name}</h3>
          <p className="text-sm text-gray-500 mb-4">Target Area: {item.workoutListItem.targetArea}</p>

          <div className="space-y-3">
            {item.reps.map((rep) => (
              <div key={rep.id} className="border p-3 rounded-md">
                <p className="font-semibold">Rep {rep.repNumber}</p>
                <p>Count: {rep.count}</p>
                <p>Weight: {rep.weight ? `${rep.weight} ${rep.weightUnit}` : 'N/A'}</p>
                <p>Distance: {rep.distance ? `${rep.distance} ${rep.distanceUnit}` : 'N/A'}</p>
                <p>Time: {rep.time ? `${rep.time} ${rep.timeUnit}` : 'N/A'}</p>
                <p>Notes: {rep.notes}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutSetInstance;
