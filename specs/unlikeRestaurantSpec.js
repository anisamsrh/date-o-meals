/* eslint-disable no-undef */
import FavoriteRestoDB from '../src/scripts/data/resto-indexed-db';
import { createRestaurantDetail } from '../src/scripts/view/template/template-creator';

/*
# Unlike A Movie
1. Click unlike button
2. Remove movie data from DB
3. Button become like button

Skenario Batal Menyukai Film:
1. Film sudah disukai.
2. Widget untuk batal menyukai film ditampilkan.
3. Widget pembatalan ditekan oleh pengguna.
4. Film dihapus dari daftar film yang disukai:
   - Ternyata film tidak ada dalam daftar film yang disukai.
*/

describe('Unlike A Restaurant', () => {
  const renderTemplate = () => `
  <main id="main"></main>
`;

  const renderRestoDetail = () => {
    document.querySelector('#main').append(createRestaurantDetail({
      id: 1,
      name: 'Resto Satu',
      description: 'a descreption',
      city: 'city',
      address: 'address',
      pictureId: '123ab',
      categories: [],
      menus: { foods: [], drinks: [] },
      rating: 4,
      customerReviews: [],
    }));
  };

  const resetFavoriteResto = async () => {
    (await FavoriteRestoDB.getAllRestos()).forEach(async (resto) => {
      await FavoriteRestoDB.deleteResto(resto.id);
    });
  };

  beforeEach(async () => {
    document.body.innerHTML = renderTemplate();
  });

  afterEach(async () => {
    await resetFavoriteResto();
  });

  it('should show the unlike button if the restaurant has been liked before', (done) => {
    FavoriteRestoDB.putResto({ id: 1 });

    renderRestoDetail();
    const favButton = document.querySelector('resto-detail').shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:identified', () => {
      expect(favButton).toHaveClass('unlike-button');
      done();
    });
  });

  it('should not show the like button id the restaurant has been liked before', (done) => {
    FavoriteRestoDB.putResto({ id: 1 });

    renderRestoDetail();
    const favButton = document.querySelector('resto-detail').shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:identified', () => {
      expect(favButton).not.toHaveClass('like-button');
      done();
    });
  });

  it('should be able to unlike a restaurant', (done) => {
    FavoriteRestoDB.putResto({ id: 1 });
    renderRestoDetail();
    const favButton = document.querySelector('resto-detail').shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:identified', () => {
      favButton.click();
    });

    favButton.addEventListener('resto:favorite:updated', async () => {
      expect(await FavoriteRestoDB.getResto(1)).toBeUndefined();
      done();
    });
  });

  it('should not throw error if the restaurant data does not exist', (done) => {
    FavoriteRestoDB.putResto({ id: 1 });
    renderRestoDetail();
    const favButton = document.querySelector('resto-detail').shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:identified', async () => {
      await FavoriteRestoDB.deleteResto(1);
      expect(await FavoriteRestoDB.getResto(1)).toBeUndefined();
      favButton.click();
      done();
    });

    favButton.addEventListener('resto:favorite:updated', async () => {
      expect(await FavoriteRestoDB.getResto(1)).toBeUndefined();
      done();
    });
  });
});
