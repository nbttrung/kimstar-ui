
export const currencyFormat = (price, lang) => {
    return new Intl.NumberFormat( lang === 'vi' ? 'vi-VN' : 'en-US').format(price);
}