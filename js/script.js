document.addEventListener('DOMContentLoaded', () => {
    const MAX_PALETTE_CARDS = 16;
    const COLOR_PALETTE = document.querySelector('.color-palette');
    const INFO_MESSAGE = COLOR_PALETTE.querySelector('.color-palette__info-message');
    const PALETTE_LIST = COLOR_PALETTE.querySelector('.color-palette__list');
    const REFRESH_BUTTON = COLOR_PALETTE.querySelector('.color-palette__button');
    const generatePalette = () => {
        PALETTE_LIST.innerHTML = '';
        for (let i = 0; i < MAX_PALETTE_CARDS; i++) {
            let randomColorCode = Math.floor(Math.random() * 0xffffff).toString(16);
            randomColorCode = `#${randomColorCode.padStart(6, '0')}`;
            const PALETTE_ITEM = document.createElement('li');
            PALETTE_ITEM.classList.add('color-palette__item');
            PALETTE_ITEM.innerHTML = `
                <div class="color-palette__preview" style="background-color: ${randomColorCode}"></div>
                <span class="color-palette__color-code">${randomColorCode}</span>
            `;
            PALETTE_ITEM.addEventListener('click', () => copyColor(randomColorCode));
            PALETTE_LIST.appendChild(PALETTE_ITEM);
        }
    };
    const showInfo = () => {
        INFO_MESSAGE.classList.add('color-palette__info-message--active');
        setTimeout(() => INFO_MESSAGE.classList.remove('color-palette__info-message--active'), 1500);
    };
    const copyColor = (colorCode) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(colorCode).then(() => {
                showInfo();
            }).catch(() => console.log('Failed to copy the color code!'));
        }
        else {
            const TEXTAREA = document.createElement("textarea");
            TEXTAREA.value = colorCode;
            TEXTAREA.style.top = '-999999px';
            TEXTAREA.style.left = '-999999px';
            TEXTAREA.style.position = 'fixed';
            document.body.appendChild(TEXTAREA);
            TEXTAREA.focus();
            TEXTAREA.select();
            TEXTAREA.setSelectionRange(0, 99999);
            try {
                document.execCommand('copy');
                showInfo();
            } catch (err) {
                console.error('Failed to copy the color code!', err);
            }
            document.body.removeChild(TEXTAREA);
        }
      
    };
    generatePalette();
    REFRESH_BUTTON.addEventListener('click', () => generatePalette());
});