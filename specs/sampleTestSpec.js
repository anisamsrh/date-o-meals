/*
Cases
(jaring pengaman)
# Liking A Movie
1. Click like button
    - chek if button is like cuz movie must'n be liked yet
2. Send movie data to DB
    - check if the data doen't exist, shouldn't exist
3. DB say saved as liked
    - check if the data now exist
4. Button becom unlike button

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
