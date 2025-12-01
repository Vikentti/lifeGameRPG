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
} from "../../sections/DailyQuest/DailyQuestTasks";
import type {Daily} from "../../types/dailyTypes";

interface CategoryProgress {
  currentDay: number;
  daily: Daily[];
  lastUpdate: string;
  visible: boolean,
}

interface DailyState {
  strength: CategoryProgress;
  dexterity: CategoryProgress;
  intelligence: CategoryProgress;
  health: CategoryProgress;
  social: CategoryProgress;
}

const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0]
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
    isUserCreated: false,
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
    lastUpdate: '',
    visible: true
  };
};

const loadInitialState = (): DailyState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('daily');
    if (saved) {
      try {
        return JSON.parse(saved);
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

export type Category = 'strength' | 'dexterity' | 'intelligence' | 'health' | 'social'

const dailySlice = createSlice({
  name: "daily",
  initialState,
  reducers: {
    nextCategoryDay: (state, action : PayloadAction<Category>) => {
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

        // Сохраняем пользовательские задачи
        const userTasks = categoryState.daily.filter(task => task.isUserCreated);
        const systemTasks = convertQuestToDaily(quest, nextDay, category);

        state[category] = {
          currentDay: nextDay,
          daily: [...systemTasks, ...userTasks],
          lastUpdate: getCurrentDate(),
          visible: false
        };
      }
    },
    toggleCategoryVisibility: (state, action: PayloadAction<Category>) => {
      const category = action.payload
      state[category].visible = !state[category].visible
    }
  }
})

export const {nextCategoryDay, toggleCategoryVisibility} = dailySlice.actions
export default dailySlice.reducer
