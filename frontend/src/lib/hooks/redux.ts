import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../providers/Providers';
import { AnalyticsState } from '../store/slices/analyticsSlice';

// Define the RootState interface
interface RootState {
  analytics: AnalyticsState;
  // Add other state slices as needed
}

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create typed selectors
export const useAnalytics = () => useAppSelector((state) => state.analytics);
