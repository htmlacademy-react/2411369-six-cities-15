import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, RootState } from '../types/store';
import { store } from '../store';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => typeof store = useStore;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
