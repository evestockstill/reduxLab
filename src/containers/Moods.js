import React, { Component } from 'react';
import Controls from '../components/controls/Controls';
import Face from '../components/face/Face';
import { getFace } from '../selector/moodSelector';
import { useDispatch, useSelector } from 'react-redux';
import { drinkCoffee, eatSnack, takeNap, study } from '../action/moodAction';

const Moods = () => {
  const face = useSelector(getFace);
  const coffees = useSelector(state => state.coffees);
  const snacks = useSelector(state => state.snacks);
  const naps = useSelector(state => state.naps);
  const studies = useSelector(state => state.studies);
  const dispatch = useDispatch();

  return (
    <>
      <Controls>
        <button>
          onClick={() => dispatch(drinkCoffee())}coffee{coffees}
        </button>
        <button>
          {' '}
          onClick={() => dispatch(eatSnack())}snacks{snacks}
        </button>
        <button>
          {' '}
          onClick={() => dispatch(takeNap())}Nap{naps}
        </button>
        <button>
          {' '}
          onClick={() => dispatch(study())}study{studies}
        </button>
      </Controls>
      <Face emoji={face} />
    </>
  );
};

export default Moods;
