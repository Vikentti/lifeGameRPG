import {useDispatch} from "react-redux";
import useOnKill from "../useOnKIll/useOnKill";
import {useEffect} from "react";
import {completeCategoryReward} from "../../states/Daily/DailySlice";

export const useCategoryCompletion = (activeCategory: any) => {
  const dispatch = useDispatch()
  const killWithPopUo = useOnKill()

  useEffect(() => {
    if (activeCategory &&
      activeCategory.tasks.every(item => item.isDone) &&
      !activeCategory.rewardGiven) {

      const uniqueStats = [...new Set(
        activeCategory.tasks
          .filter(item => item.stat)
          .map(item => item.stat)
      )];

      if (uniqueStats.length > 0) {

        killWithPopUo({
          stat: uniqueStats.toString(),
          xp: 60,
          howMuch: 5,
          type: 'Daily Completed'
        }, () => {
          dispatch(completeCategoryReward(activeCategory.categoryKey))
        })
      }
    }
  }, [activeCategory, dispatch]);
}