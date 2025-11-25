import {useSelector} from "react-redux";
import type {RootState} from "../states/store";

export const useEnemies = () => {
  const bosses = useSelector((state: RootState) => state.bosses)
  const miniBosses = useSelector((state: RootState) => state.miniBosses)
  const mobs = useSelector((state: RootState) => state.mobs)

  return {bosses, miniBosses, mobs}
}

export const useBosses = () => {
  return useSelector((state: RootState) => state.bosses)
}

export const useMiniBosses = () => {
  return useSelector((state: RootState) => state.miniBosses)
}

export const useMobs = () => {
  return useSelector((state: RootState) => state.mobs)
}