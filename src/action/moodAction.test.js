import {
  DRINK_COFFEE,
  drinkCoffee,
  EAT_SNACK,
  eatSnack,
  TAKE_NAP,
  takeNap,
  STUDY,
  study
} from './moodActions';

describe(' drink coffee action creators', () => {
  it('creates an drink coffee action', () => {
    const action = drinkCoffee();

    expect(action).toEqual({ type: DRINK_COFFEE });
  });

  describe(' eat snack as an action creators', () => {
    it('creates an eat snack action', () => {
      const action = eatSnack();

      expect(action).toEqual({ type: EAT_SNACK });
    });

    describe(' take nap as an action creators', () => {
      it('creates an take nap action', () => {
        const action = takeNap();

        expect(action).toEqual({ type: TAKE_NAP });
      });
      describe(' study as an action creators', () => {
        it('creates an study action', () => {
          const action = study();

          expect(action).toEqual({ type: STUDY });
        });
      });
    });
  });
});
