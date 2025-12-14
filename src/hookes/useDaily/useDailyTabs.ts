import {useEffect} from "react";

export const useDailyTabs = (filteredTasks: any[], activeTab: number, setActiveTab: (tab: number) => void) => {
  useEffect(() => {
    if (filteredTasks.length > 0 && activeTab >= filteredTasks.length) {
      setActiveTab(0);
    }
  }, [filteredTasks.length, activeTab, setActiveTab]);

  const activeCategory = filteredTasks.length > 0 ? filteredTasks[activeTab] : null;

  return { activeCategory };
};