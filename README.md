# Running the app

Spin up local database

```terminal
docker run -d --name postgres_local_fitgpt -e POSTGRES_USER=fitgpt -e POSTGRES_PASSWORD=fitgpt -e POSTGRES_DB=fitgpt -v C:\Users\wenli\OneDrive\Apps\fitgpt\db:/var/lib/postgresql/data -p 5432:5432 postgres:latest
```
Replace C:\Users... with your own local file path

Download and install Ollama. Assumes you have Ollama already installed
```terminal

```

Download DBeaver and confirm connection to local database 

Server
```terminal
cd server && npm install
npm run prisma:push
npx run prisma:seed
npm start
```

Client
```terminal
cd client && npm install
npm start
```

# Agent workflows

```mermaid
graph TD
    A[Start a Workout Session]
    A --> B{Next WorkoutSetInstance Exists?}
    B -- Yes --> C[Confirm Next Workout Session]
    B -- No --> D[Create WorkoutSetInstance from WorkoutSchedule]
    C --> E[Begin WorkoutSetInstance]
    D --> E[Begin WorkoutSetInstance]
    E --> F[Execute First WorkoutSetItemInstance]
    F --> G[Agent Provide User with Last Workout Parameters]
    G --> H[Start Rep]    
    H --> I[Remind User Last Rep Info]
    I --> J[User Provides Rep Metadata]
    J --> K[Finish Rep]
    K --> L[Start Next Rep Timer]
    L --> M[Rep Timer Complete]
    L --> N[User Initiates next rep]
    M --> O{End of Reps?}
    N --> O
    O -- No --> H           
    O -- Yes --> P[Finish Workout]
    
```


## User Input: Start a Workout Session
Start a workout session. The agent should tell you which is the next workout session on the schedule, and ask the user to confirm.

If the next workoutSetInstance does not exist, it should create one from the WorkoutSchedule model. To check if the workoutSetInstance exists, we can query WorkoutSetSchedule, and see if a workoutSetInstanceId exists.

Once the workout begins, we should be on a WorkoutSetInstance, and the agent will ask you to execute the first workoutSetItemInstance (workout), starting with the first rep. The agent will tell you the parameters of the last time you did this workout, including how many days ago, the weight, reps, and any relevant info, and encourage you to beat your own record and push harder.

## User Input: What can I do?
### If you have not started a workout session
Agent will remind you your next workout session, and prompt to see if you want to start it

### You've already started a workout session.
The agent should remind you what WorkoutSetInstance you're working on (Abs), and what specific workout you're doing (Crunches). 

If you're on your current rep, it'll tell you what rep you're on, and how many reps you did last time.  If you just finished a rep, it'll tell you what rep to start on, and how many you did last time.

If you're in the middle of a rep, the agent will remind you to tell it how many reps you did, how much weight, and any other relevant metadata.

## User Input: Give the current rep info
"Hey I did 10 reps this time, and I pushed to exhaustion"

Agent will record 10 reps on this current work out, and "add exhaustion" to the notes
and confirm this back to the user.

The agent will ask if you want to finish this rep and move to the next one. If you say yes, it'll remind you that you should rest for 30 seconds and begin a countdown timer for when to start the next rep. The user can change this preference on the fly by asking the agent to update the rep interval to 90 seconds.

## User Input: Starting my next rep
"Start the next rep". User can use this command to start the next rep.

If the user asked the agent to the finish the rep, it will automatically start the next rep after the rep timer expires. It'll tell the user "Please start your next rep", and tell you about the rep metadata.

## User Input: Finish workout
"I'm done working out"

Agent will close out the workoutSetInstance, and confirm.

# Data Model
## Planning
Planning solves the follow type of thought flow, with related data models:
* I want to workout 3 days a week (workoutPlan).
* For Day 1 (WorkoutPlanSchedule), I want to do "abs and shoulder" (WorkoutSet)
* For "Abs and Shoulder" (WorkoutSet), I want to do Crunches, Leg Lifts, Planks, Lat Pulls, Seated Rows (WorkoutSetItems)

### Workout Plan
A user defines a Workout Plan, which is a collection of Workout Sets. Each Workout Set contains a set of ListWorkouts (e.g. Pushup, Situp).  A workoutSet is a group of individual workouts to be performed in a single session.


```mermaid
graph TD
    A[Workout Plan]
    A --> B[WorkoutSetSchedule 1
    Day 0, Sun, WorkoutSetId=10] 
    A --> C[WorkoutSetSchedule 2
    Day 2, Tues, WorkoutSetId=11]
    A --> D[WorkoutSetSchedule 3
    Day 4, Thurs, WorkoutSetId=12]
    B -->E[ListWorkout1
    Pushups]
    B -->F[ListWorkout2
    Situps]
    B -->G[ListWorkout3
    Crunches]
```

### Workout Set Schedule
The workout set schedule relates a WorkoutSet to a WorkoutPlan, and defines a schedule (e.g WorkoutSet = Legs, Biceps, Abs, do this on Tuesdays)

```mermaid
graph TD
    A[WorkoutSetSchedule]
    A --> B[WorkoutSetId]
    A --> C[Schedule - Day of Week]
```

### ListWorkout
A listWorkout contains a configuration list of individual workouts. It can contain metadata such as hasWeight, hasTime, hasDistance which specify what type of metadata is to be stored on the actual execution of the Reps (See Execution -> Reps)


## Execution 
### WorkoutSetInstance

Excusion phase of workouts. The Workout plan gets converted into a set of actual workoutSets, called WorkoutSetInstances with target dates.

Each WorkoutSetInstance contains a collection of WorkoutSetItemInstances

```mermaid
graph TD
    A[WorkoutSetInstance1
    Wed Jan 1, 2025]
    A --> B[WorkoutSetItemInstance 1
    Pushups] 
    A --> C[WorkoutSetItemInstance 2
    Situps]
    A --> D[WorkoutSetItemInstance 1
    Crunches]
    B --> E[Rep 1]
    B --> F[Rep 2]
    B --> G[Rep 3]
```

### Rep 
Contains the data from each executed rep of a listWorkoutItem, along with metadata such as:

| Metadata      | Description                                      |
|---------------|--------------------------------------------------|
| repNumber     | The number of the rep in the sequence            |
| count         | The number of repetitions                        |
| weight        | The weight used during the rep                   |
| weightUnit    | The unit of the weight (e.g., kg, lbs)           |
| distance      | The distance covered during the rep              |
| distanceUnit  | The unit of the distance (e.g., meters, miles)   |
| time          | The time taken to complete the rep               |
| timeUnit      | The unit of the time (e.g., seconds, minutes)    |


# Service Design based on Workflows
## Intent: Start a workout session

```mermaid
graph TD
    subgraph LEGEND
        LEG1([Intent])
        LEG2[[Service]]
        LEG3{{System Response}}
        LEG4>USER INPUT]
    end 
```
```mermaid
graph TD
    subgraph FLOW
        A([Start Workout Session
        'Let's start a workout'])
        B[[Get Next Unscheduled WorkoutSetInstance]]
        B1{{Looks like your next workout is 'workoutSessionName', would you like to begin?}}
        B2{{Based on your previous workout schedule, you should do 'WorkoutSessionName' next. You want to do it}}

        B2 --YES--> D
        B2 --NO-->B21[[Get all workout sets]]-->B22{{Here's a list of your workout sets: 'list'. Is there one you want to do?}}

        B22 -->B23>User Specifies option for workoutSet] --> B24{Valid?} --NO-->B23

        B24 --YES--> C1

        C[[Update WorkoutSession, Status = IN_PROGRESS]]
        
        C1([Start WorkoutSetItemInstance
        Let's start the first workout: Pushups])
        
        C2[[Start WorkoutSetItem]]
        
        D[[Create Next WorkoutSetInstance]]


        A --> B
        B -- Has One --> B1 --YES--> C
        B1 --NO--> B11(((STOP)))
        C --> C1 --> C2
        B -- Has None --> B2
        D --> C1

    end
```

# Service Route Definitions

## Get Next Unscheduled WorkoutSetInstance
GET /workout-set-instance/:userId/next

### Logic
* Query WorkoutSetInstance by userId, look for status = "IN_PROGRESS", order by actualDate ascending, and get the first record.
  * If a "IN_PROGRESS" record is found, return: "I found a workout that's in progress on {Day_Of_Week}, {Month}, {Day_Of_Month}. Please complete this one first.
  * If no records found, proceed to next query.
* Query the WorkoutSetInstance by userId, Look for status = "UNSCHEDULED", and the scheduleDate is the next earliest date.
* If a record is found, set the workoutSetInstance.status = IN_PROGRESS

## Update WorkoutSetInstance
PATCH /workout-set-instance/:userId/:workoutInstanceId
BODY
    {
        userId: INT,
        workoutInstanceId: INT,
        status: "IN_PROGRESS"
    }

## Start WorkoutSetItemInstance
PATCH /workout-set-item-instance/:userId/:id
BODY
{
    userId: INT,
    workoutSetInstanceId: INT
    status: IN_PROGRESS
}

# State Machine
* WSI = WorkoutSetInstance
* WSII = WorkoutSetItemInstance
  
| From State       | To State         | Condition                          |
|------------------|------------------|------------------------------------|
| WSI_IDLE         | WSI_STARTED      | WSI created or started                                   |
| WSI_STARTED      | REP_STARTED      | User adds a workout set item.      |
| REP_STARTED   | REP_COMPLETED
| REP_COMPLETED | REP_STARTED
|
| ITEM_ADDED       | ITEM_COMPLETED   | User completes the item.          |
| ITEM_COMPLETED   | ITEM_ADDED       | User adds another item.           |
| ITEM_COMPLETED   | COMPLETED        | User finishes the workout set.    |


```mermaid
stateDiagram-v2
    [*] --> INITIATED: User initiates a workoutSet

    INITIATED --> STARTED: System finds or creates a workoutSet record
    STARTED --> ITEM_ADDED: User adds a workoutSetItem to workoutSet
    ITEM_ADDED --> ITEM_COMPLETED: User completes workoutSetItem
    ITEM_COMPLETED --> ITEM_ADDED: User adds another workoutSetItem
    ITEM_COMPLETED --> COMPLETED: User completes workoutSet

    COMPLETED --> [*]: Workflow ends

    %% Additional Notes
    note right of INITIATED
      Initial state where the workoutSet
      is created or identified.
    end note

    note right of COMPLETED
      Final state indicating all
      items are completed.
    end note
```