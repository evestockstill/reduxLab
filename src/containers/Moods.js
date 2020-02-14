import React from 'react';
import Controls from '../components/controls/Controls';
import Face from '../components/face/Face';
import { getFace } from '../selector/moodSelector';
import { useDispatch, useSelector } from 'react-redux';
import { drinkCoffee, eatSnack, takeNap, study } from '../action/moodAction';

const Moods = () => {
  const face = useSelector(getFace);
  const dispatch = useDispatch();

  return (
    <>
      <Controls>
        <button onClick={() => dispatch(drinkCoffee())}>coffee
        </button>
        <button onClick={() => dispatch(eatSnack())}>snacks
        </button>
        <button
          onClick={() => dispatch(takeNap())}>Nap
        </button>
        <button
          onClick={() => dispatch(study())}>study
        </button>
      </Controls>
      <Face emoji={face} />
    </>
  );
};

export default Moods;
