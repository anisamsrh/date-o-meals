const favoriteRestoContract = () => {
  const favoriteResto = [];

  it('Should be able to put new restaurant data', () => {
    expect(favoriteResto.putResto({ id: 1 })).not.toThrowError();
  });
};
