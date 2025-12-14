import {useSelector} from "react-redux"
import type { RootState } from "../../states/store";
import type { Category } from "../../states/Daily/DailySlice";

export const useDailyCategories = () => {
  const daily = useSelector((state: RootState) => state.daily);

  const categoriesForUI = [
    {
      title: "Strength",
      tasks: daily.strength?.daily || [],
      visible: daily.strength?.visible || false,
      currentDay: daily.strength?.currentDay || 1,
      categoryKey: 'strength' as Category,
      rewardGiven: daily.strength?.rewardGiven || false
    },
    {
      title: "Dexterity",
      tasks: daily.dexterity?.daily || [],
      visible: daily.dexterity?.visible || false,
      currentDay: daily.dexterity?.currentDay || 1,
      categoryKey: 'dexterity' as Category,
      rewardGiven: daily.dexterity?.rewardGiven || false
    },
    {
      title: "Intelligence",
      tasks: daily.intelligence?.daily || [],
      visible: daily.intelligence?.visible || false,
      currentDay: daily.intelligence?.currentDay || 1,
      categoryKey: 'intelligence' as Category,
      rewardGiven: daily.intelligence?.rewardGiven || false
    },
    {
      title: "Health",
      tasks: daily.health?.daily || [],
      visible: daily.health?.visible || false,
      currentDay: daily.health?.currentDay || 1,
      categoryKey: 'health' as Category,
      rewardGiven: daily.health?.rewardGiven || false
    },
    {
      title: "Social Skills",
      tasks: daily.social?.daily || [],
      visible: daily.social?.visible || false,
      currentDay: daily.social?.currentDay || 1,
      categoryKey: 'social' as Category,
      rewardGiven: daily.social?.rewardGiven || false
    }
  ];

  const filteredTasks = categoriesForUI.filter(cat => cat.visible);

  return { categoriesForUI, filteredTasks };
};