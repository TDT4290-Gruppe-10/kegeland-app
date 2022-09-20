import Counter, {CounterProps} from '@components/Counter';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {increment, decrement} from '@state/ducks/counter/counter.reducer';
import React, {useCallback} from 'react';

const CounterContainer: React.FC = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  const mapStateToProps: CounterProps = {
    value: count,
    increment: useCallback(() => dispatch(increment()), [dispatch]),
    decrement: useCallback(() => dispatch(decrement()), [dispatch]),
  };

  return <Counter {...mapStateToProps} />;
};

export default CounterContainer;
