import {
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";

import {
  DailyQuestTasksDay1,
  DailyQuestTasksDay2,
  DailyQuestTasksDay3,
  DailyQuestTasksDay4,
  DailyQuestTasksDay5,
  DailyQuestTasksDay6,
  DailyQuestTasksDay7,
  DailyQuestTasksDay8,
  DailyQuestTasksDay9,
  DailyQuestTasksDay10
} from "./DailyQuestTasks";
import type {Daily} from "../../types/dailyTypes";

interface CategoryProgress {
  currentDay: number;
  daily: Daily[];
  lastUpdate: string;
  visible: boolean,
  rewardGiven: boolean,
  dayReset?: string;
}

interface DailyState {
  strength: CategoryProgress;
  dexterity: CategoryProgress;
  intelligence: CategoryProgress;
  health: CategoryProgress;
  social: CategoryProgress;
}

const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const shouldResetDay = (lastReset: string): boolean => {
  if (!lastReset) {
    return true
  }

  const today = getCurrentDate()
  const lastResetDay = new Date(lastReset)
  const todayDate = new Date(today)

  return lastResetDay.toDateString() !== todayDate.toDateString()
}

// получаем данные для каждого атрибута


const getStrengthTasksByDay = (day: number) => {
  const strengthDays = [
    DailyQuestTasksDay1[0],
    DailyQuestTasksDay2[0],
    DailyQuestTasksDay3[0],
    DailyQuestTasksDay4[0],
    DailyQuestTasksDay5[0],
    DailyQuestTasksDay6[0],
    DailyQuestTasksDay7[0],
    DailyQuestTasksDay8[0],
    DailyQuestTasksDay9[0],
    DailyQuestTasksDay10[0],
  ];
  return strengthDays[Math.min(day - 1, 9)];
};
const getDexterityTasksByDay = (day: number) => {
  const dexterityDays = [
    DailyQuestTasksDay1[1],
    DailyQuestTasksDay2[1],
    DailyQuestTasksDay3[1],
    DailyQuestTasksDay4[1],
    DailyQuestTasksDay5[1],
    DailyQuestTasksDay6[1],
    DailyQuestTasksDay7[1],
    DailyQuestTasksDay8[1],
    DailyQuestTasksDay9[1],
    DailyQuestTasksDay10[1],
  ];
  return dexterityDays[Math.min(day - 1, 9)];
};
const getIntelligenceTasksByDay = (day: number) => {
  const intelligenceDays = [
    DailyQuestTasksDay1[2],
    DailyQuestTasksDay2[2],
    DailyQuestTasksDay3[2],
    DailyQuestTasksDay4[2],
    DailyQuestTasksDay5[2],
    DailyQuestTasksDay6[2],
    DailyQuestTasksDay7[2],
    DailyQuestTasksDay8[2],
    DailyQuestTasksDay9[2],
    DailyQuestTasksDay10[2],
  ];
  return intelligenceDays[Math.min(day - 1, 9)];
};
const getHealthTasksByDay = (day: number) => {
  const healthDays = [
    DailyQuestTasksDay1[3],
    DailyQuestTasksDay2[3],
    DailyQuestTasksDay3[3],
    DailyQuestTasksDay4[3],
    DailyQuestTasksDay5[3],
    DailyQuestTasksDay6[3],
    DailyQuestTasksDay7[3],
    DailyQuestTasksDay8[3],
    DailyQuestTasksDay9[3],
    DailyQuestTasksDay10[3],
  ];
  return healthDays[Math.min(day - 1, 9)];
};
const getSocialTasksByDay = (day: number) => {
  const socialDays = [
    DailyQuestTasksDay1[4],
    DailyQuestTasksDay2[4],
    DailyQuestTasksDay3[4],
    DailyQuestTasksDay4[4],
    DailyQuestTasksDay5[4],
    DailyQuestTasksDay6[4],
    DailyQuestTasksDay7[4],
    DailyQuestTasksDay8[4],
    DailyQuestTasksDay9[4],
    DailyQuestTasksDay10[4],
  ];
  return socialDays[Math.min(day - 1, 9)];
};


const convertQuestToDaily = (quest: any, day: number, category: string): Daily[] => {
  return quest.tasks.map((task: any, index: number) => ({
    id: `${category.toLowerCase()}_day${day}_${index}`,
    title: task.title,
    stat: task.stat,
    isDone: false,
    category: quest.title,
    createdAt: getCurrentDate()
  }));
};


const initializeCategory = (
  category: 'strength' | 'dexterity' | 'intelligence' | 'health' | 'social',
  day: number = 1
): CategoryProgress => {
  let quest;
  switch (category) {
    case 'strength':
      quest = getStrengthTasksByDay(day);
      break;
    case 'dexterity':
      quest = getDexterityTasksByDay(day);
      break;
    case 'intelligence':
      quest = getIntelligenceTasksByDay(day);
      break;
    case 'health':
      quest = getHealthTasksByDay(day);
      break;
    case 'social':
      quest = getSocialTasksByDay(day);
      break;
  }

  return {
    currentDay: day,
    daily: convertQuestToDaily(quest, day, category),
    lastUpdate: getCurrentDate(),
    visible: true,
    rewardGiven: false,
    dayReset: getCurrentDate()
  };
};

const loadInitialState = (): DailyState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('daily');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const categories: Category[] = ['strength', 'dexterity', 'intelligence', 'health', 'social'];

        const today = getCurrentDate()

        categories.forEach(cat => {
          if (parsed[cat]) {
            if (shouldResetDay(parsed[cat].lastUpdate)) {
              if (parsed[cat].daily) {
                parsed[cat].daily.forEach((item) => {
                  item.isDone = false
                })
              }
            }
            parsed[cat].rewardGiven = false;

            parsed[cat].lastUpdate = today;
            parsed[cat].dayReset = today;

            if (typeof parsed[cat].rewardGiven === 'undefined') {
              parsed[cat].rewardGiven = false;
            }

            // Добавляем поле dayReset если его нет
            if (typeof parsed[cat].dayReset === 'undefined') {
              parsed[cat].dayReset = getCurrentDate();
            }
          }
        });

        return parsed
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }
  }

  return {
    strength: initializeCategory('strength'),
    dexterity: initializeCategory('dexterity'),
    intelligence: initializeCategory('intelligence'),
    health: initializeCategory('health'),
    social: initializeCategory('social'),
  };
};


const initialState: DailyState = loadInitialState();

export type Category =
  'strength'
  | 'dexterity'
  | 'intelligence'
  | 'health'
  | 'social'

const dailySlice = createSlice({
  name: "daily",
  initialState,
  reducers: {
    nextCategoryDay: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      const categoryState = state[category];
      const nextDay = categoryState.currentDay + 1;

      if (nextDay <= 10) {
        let quest;
        switch (category) {
          case 'strength':
            quest = getStrengthTasksByDay(nextDay);
            break;
          case 'dexterity':
            quest = getDexterityTasksByDay(nextDay);
            break;
          case 'intelligence':
            quest = getIntelligenceTasksByDay(nextDay);
            break;
          case 'health':
            quest = getHealthTasksByDay(nextDay);
            break;
          case 'social':
            quest = getSocialTasksByDay(nextDay);
            break;
        }

        const Tasks = convertQuestToDaily(quest, nextDay, category);

        state[category] = {
          currentDay: nextDay,
          daily: [...Tasks],
          lastUpdate: getCurrentDate(),
          visible: state[category].visible,
          rewardGiven: false
        };
      }
    },
    resetCategoryDay: (state, action: PayloadAction<Category>) => {
      const category = action.payload

      let quest;
      switch (category) {
        case 'strength':
          quest = getStrengthTasksByDay(1);
          break;
        case 'dexterity':
          quest = getDexterityTasksByDay(1);
          break;
        case 'intelligence':
          quest = getIntelligenceTasksByDay(1);
          break;
        case 'health':
          quest = getHealthTasksByDay(1);
          break;
        case 'social':
          quest = getSocialTasksByDay(1);
          break;
      }
      const Tasks = convertQuestToDaily(quest, 1, category)

      state[category] = {
        currentDay: 1,
        daily: [...Tasks],
        lastUpdate: getCurrentDate(),
        visible: state[category].visible,
        rewardGiven: false,
      }
    },
    toggleCategoryVisibility: (state, action: PayloadAction<Category>) => {
      const category = action.payload
      state[category].visible = !state[category].visible
    },
    setCategoryItemDone: (state, action: PayloadAction<{
      category: Category,
      taskId: string
    }>) => {
      const {category, taskId} = action.payload
      const cat = state[category]
      const task = cat.daily.find((item) => item.id === taskId)

      if (task) {
        task.isDone = !task.isDone
      }
    },
    setCategoryRewardGiven: (state, action: PayloadAction<{
      category: Category,
      rewardGiven: boolean
    }>) => {
      const {category, rewardGiven} = action.payload
      state[category].rewardGiven = rewardGiven

    },
    completeCategoryReward: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      state[category].rewardGiven = true;
    },
    forceResetDailyAll: (state) => {
      const today = getCurrentDate()
      const categories: Category[] = ['strength', 'dexterity', 'intelligence', 'health', 'social'];

      categories.forEach((category) => {
        if (state[category].daily) {
          state[category].daily.forEach((task) => {
            task.isDone = false
          })
        }
        state[category].rewardGiven = false

        state[category].lastUpdate = today
        state[category].dayReset = today
      })
    }

  }
})

export const {
  nextCategoryDay,
  setCategoryRewardGiven,
  completeCategoryReward,
  resetCategoryDay,
  toggleCategoryVisibility,
  setCategoryItemDone,
  forceResetDailyAll
} = dailySlice.actions
export default dailySlice.reducer
