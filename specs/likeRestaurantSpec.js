/* eslint-disable no-undef */
import FavoriteRestoDB from '../src/scripts/data/resto-indexed-db';
import { createRestaurantDetail } from '../src/scripts/view/template/template-creator';

/*
Skenario Menyukai Film:
1. Film belum disukai.
2. Widget untuk menyukai film ditampilkan
3. Widget menyukai film ditekan oleh pengguna.
4. Film ditambahkan ke daftar film yang disukai:
   - Ternyata film sudah disukai:
     - Tidak perlu menyimpan kembali.
   - Data film tidak memiliki ID:
     - Sistem tidak memproses penyimpanan.
     - Sistem tidak gagal.
*/
describe('Like A Restaurant', () => {
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

  it('should render the fav-button custom element', () => {
    renderRestoDetail();
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');
    expect(restoDetail).toBeTruthy();
    expect(favButton).toBeTruthy();
  });

  it('should show the like button if the restaurant has not been liked yet', (done) => {
    renderRestoDetail();
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');
    favButton
      .addEventListener('resto:favorite:identified', () => {
        expect(favButton).toHaveClass('like-button');
        done();
      });
  });

  it('should not show the unlike button if the restaurant has not been liked yet', (done) => {
    renderRestoDetail();
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');
    favButton
      .addEventListener('resto:favorite:identified', () => {
        expect(favButton).not.toHaveClass('unlike-button');
        done();
      });
  });

  it('the restaurant data should not been exist if it has not been liked yet', async () => {
    renderRestoDetail();
    expect((await FavoriteRestoDB.getAllRestos()).length).toEqual(0);
  });

  it('should be able to like the restaurant', (done) => {
    renderRestoDetail();
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:updated', async () => {
      expect((await FavoriteRestoDB.getResto(1))).toBeTruthy();
      done();
    });

    favButton.addEventListener('resto:favorite:identified', () => {
      favButton.dispatchEvent(new Event('click'));
    });
  });

  it('should show unlike button after being liked', (done) => {
    renderRestoDetail();
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:identified', () => {
      favButton.dispatchEvent(new Event('click'));
    });

    favButton.addEventListener('resto:favorite:updated', () => {
      expect(favButton).toHaveClass('unlike-button');
      done();
    });
  });

  it('should not add the restaurant again if it has been liked before but rather update it', async () => {
    renderRestoDetail();
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');
    await FavoriteRestoDB.putResto({ id: 1 });

    favButton.dispatchEvent(new Event('click'));
    expect((await FavoriteRestoDB.getAllRestos()).length).toEqual(1);
    expect(await FavoriteRestoDB.getResto(1)).not.toEqual({ id: 1 });
  });

  it('should not be able to like if the restaurant data does not have an id', (done) => {
    document.querySelector('#main').append(createRestaurantDetail({
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
    const restoDetail = document.querySelector('resto-detail');
    const favButton = restoDetail.shadowRoot.querySelector('fav-button');

    favButton.addEventListener('resto:favorite:identified', async () => {
      favButton.dispatchEvent(new Event('click'));
    });

    favButton.addEventListener('resto:favorite:updated', async () => {
      expect((await FavoriteRestoDB.getAllRestos()).length).toEqual(0);
      done();
    });
  });
});
