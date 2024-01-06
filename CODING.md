# Coding Structure

Page dagi ```.vue``` fayllar uchun naming uchun lowercase lardan foydalanish kerak va bitta so'zlik bo'lishi kerak 

`pages/settings.vue` < to'g'ri

`pages/settings-page.vue` < noto'g'ri yechim

`pages/settings-second.vue` < noto'g'ri yechim

`pages/settings-second/index.vue` < to'g'ri yechim

Component lar ucun fayllar strukturasi.

Masalan **Settings** page uchun

asosiy root `components/settings/SomeComponent.vue` kabi yozilishi kerak.

Componentlarni **CamelCase** da yozilishi kerak va nomlanishda vazifasiga qarab nomlanishi kerak masalan `ThreeColumnTable.vue` bo'lishi kerak shunda eslab qolish va boshqalar uchun tushunarli bo'ladi! Bu joda `Table3.vue` bo'lishi noqulayliklar tug'dirishi mumkin.

# Icon lar

`./components/icon/` ichidagi SVG ga asoslangan `.vue` fayllarni oxiriga **SVG** qo'shimchasini qo'shish kerak yani `SonmeNameSVG.vue` 

**SVG**  koddagi `fill=""` qismini olib tash lash kerak bu bizga iconlarni har joyda har xil rangda ishlatish imkonini beradi.
