import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'store/types';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
