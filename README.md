# "React(TS) - Шахматная доска, с перетаскиваемыми согласно правилам фигурами."

## Функционал:

- перетаскивание фигур мышью
- подсветка допустимых для хода ячеек
- сохранение состояния при обновлении страницы
- сброс позиций фигур до стартового набора

### Скриншот приложения из браузера:

Ходит офицер. Желтым подсвечены клетки доступные для хода.

![Screenshot of board](/../screenshot/screenshot/board.png?raw=true "Доска с фигурами")

### Ссылка на приложение развернутое на хостинге vercel:

https://chess-simulator.vercel.app/

## Технологический стек:

React, TypeScript, Redux Toolkit, React-dnd, SCSS.

## Требования

- Node.js >= 16

## Установка

`npm install`

## Запуск для разработки

В режиме разработки (development) приложение запускается командой:

`npm start`

## Сборка для продакшена

Для публикации проекта на сервере сначала выполняется сборка приложения командой:

`npm run build`

## Комментарии к проекту:

    - localStorage не должен содержать элементы кроме позиций фигур ( При разворачивании проекта локально проверьте что localStorage для https://localhost:3000/ не содержит посторонних элементов)
    - <React.StrictMode> ломает работу react-dnd (повторное событие drag для фигуры которая не была переставлена на другую позицию) в Google Chrome (в Firefox работает корректно)
    - при перетаскивании фигур на мобильных устройствах картинка фигуры отображается только в начальнойи конечной клетке на доске (как оказалось это известная проблема библиотеки react-dnd, решение которой я не нашел)
    - я добавил пару наборов с тестами для того что бы показать что мне знаком синтаксис и инструменты Jest, однако мне не хватает опыта что бы писать тесты которые действительно закроют уязвимые места в пректе.
