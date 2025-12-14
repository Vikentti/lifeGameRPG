import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../../states/store";

export const useDailyData = () => {
  const [activeCategoryPopUp, setCategoryActivePopUp] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const daily = useSelector((state: RootState) => state.daily);

  const visibleCategories = ['strength', 'dexterity', 'intelligence', 'health', 'social']
    .filter(key => daily[key as keyof typeof daily]?.visible);

  useEffect(() => {
    if (activeTab >= visibleCategories.length) {
      setActiveTab(0);
    }
  }, [visibleCategories.length, activeTab]);

  return {
    activeCategoryPopUp,
    setCategoryActivePopUp,
    activeTab,
    setActiveTab,
    togglePopUp: () => setCategoryActivePopUp(prev => !prev)
  };
};