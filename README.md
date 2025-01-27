# htmlLessons
HTML Lesson Repository
## Docs
### CSS Display Grid
Grid - сетка
Должно быть ограничение по ширине (и по высоте, но не обязательно)
grid-template: настройка сетки

grid-column-start: (1...n столбцов) начальный столбец в котором элемент.
grid-column-end: (нужный столбец + 1) конечный столбец, в котором элемент.
grid-column-end: span n - протяжение столбцов n от grid-column-start.

grid-column: 2 / 4 -- сочетание start (2) и end (4).
#### ВСЁ ЭТО РАБОТАЕТ И С GRID-ROW
### GRID-AREA
grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end -- сокращение всего.

### Order у элементов grid
Все также, как и с flex: 
order: (0 - ничего, -1 - влево, +1 - вправо).

### Repeat
repeat(кол-во, значение).

### fr - FRACTION
1fr, 5fr -- 1/6 от размера, 5/6 от размера, 6 идет от 1 + 5.

### GRID-TEMPLATE
grid-template: grid-template-rows / grid-template-columns -- сокращение.
