export function convertDateTimeToKoreanDateAndHour(date) {
    var yyyy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours() <= 12 ? `오전 ${date.getHours()}` : `오후 ${date.getHours() - 12}`;
    return `${yyyy}년 ${mm}월 ${dd}일 ${hh}시`;
};