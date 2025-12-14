import {useDispatch} from "react-redux";
import {
  type Category, setCategoryItemDone,
  toggleCategoryVisibility,
  forceResetDailyAll,
} from "../../states/Daily/DailySlice";

export const useDailyActions = () => {
  const dispatch = useDispatch();

  const setDailyDone = (category: Category, id: string) => {
    dispatch(setCategoryItemDone({category: category, taskId: id}));
  };

  const handleToggleVisible = (categoryKey: Category) => {
    dispatch(toggleCategoryVisibility(categoryKey));
  };

  const testResetDay = () => {
    dispatch(forceResetDailyAll());
  };

  return {
    setDailyDone,
    handleToggleVisible,
    testResetDay
  };
};