import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCategoryIfNeeded,
} from '../../states/Daily/DailySlice';
import type {RootState} from '../../states/store';

const DailyReset = () => {
  const dispatch = useDispatch();
  const daily = useSelector((state: RootState) => state.daily);

  useEffect(() => {
    const checkAndResetDaily = () => {
      const categories = ['strength', 'dexterity', 'intelligence', 'health', 'social'] as const;

      categories.forEach(category => {
        dispatch(resetCategoryIfNeeded(category));
      });
    };

    checkAndResetDaily();
  }, [dispatch]);

  return null;
};

export default DailyReset;