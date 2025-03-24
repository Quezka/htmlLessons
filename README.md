# htmlLessons

HTML Lesson Repository

# Docs

## CSS Display Grid

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

## CSS Position Attribute

![CSS Position](/rep-imgs/position-attribute.png)

Все элементы по умолчанию имеют `position: static`

### Static

Как страница навёрстана, так и идут элементы.
Не работает `top, bottom, right, left`

### Relative

Элемент позиционируется не относительно элементов, а относительно `body`.
Данный элемент никаким образом не сдвигает вёрстку.
Доступны `top, bottom, right, left` **ТОЛЬКО ОДИН ИЗ НИХ**, обычно относительно ближайшего края.

### Absolute

![CSS Position Absolute](/rep-imgs/position-absolute.png)

Можно двигать как угодно, смещает остальные элементы.
Смотрит, относительно какого элемента он должен позиционироваться, обычно доходит до `body`, если не найдет элементов с `position: relative` раньше. Если надо позиционировать элемент относительно родителя, то родитель должен имет `position: relative`, если выше родителя, то элемент-ориентир должен иметь `position: relative`.

### Fixed

![CSS Modal Window](/rep-imgs/modal-window.png)

`position: fixed` не требует `position: relative, position: absolute`, работает относительно страницы, т.е., `body`. Часто используется для модальных окон. Позиционируется поверх всего, но при этом работает `scroll`. Обычно с контентом сзади делают что-то, чтобы сделать окно более видимым. Позиция фиксирована относительно страницы. Обычно `scroll` запрещают.

### Sticky

Элемент, который следует за `scroll` во время него. Примеры: навигационные панели, кнопки связи с поддержкой, и т.д., и т.п. Грубо говоря, прилепляет элемент к определённой позиции, относительно `viewport`. `position: sticky` **всегда должен быть ограничен по высоте** `height`, иначе он растянется на всю страницу (_или же на весь контейнер_).  
**НЕОБХОДИМО ОБЯЗАТЕЛЬНО ПРОПИСАТЬ ПОЗИЦИЮ** (`top, bottom, left, right`).

## JAVASCRIPT

### Conditions

#### Операции Сравнения

`let x = 5`
`let y = '5'`
`console.log(x == y)`
`>> True`
Приводит левый операнд к правому. Преобразует `string` в `number`.
`console.log(x === y)`
`>> False`
Смотрит типы. `string != number`.
С отрицанием то же самое.
`!=`, `!==`.
`<`, `>`, `<=`, `>=`, etc.

### Что даёт True, а что False?

`!!` -> привод к логическому значению

```javascript
let x = 5;
console.log(!!x) >> True;
x = 0;
console.log(!!x) >> False;
```

Всё, отличное от нуля == `False`
Полностью пустая строка == `False`
Любой знак в строке, даже пробел == `True`
`NaN` (Not a Number) == `False`
`None` == `False`
`Undefined` == `False`
`Object` (даже пустой) == `True`

Краткие условия:
`a < b ? obj.do() : obj.do2()`
Это конструкцию можно присвоить переменной:
`let x = a < b ? True : False`

### ??

?? - Определяет значение `Null` или `Undefined`
Если вдруг они выходят, при каком то условии, можно дать определенное значение.

`Null ?? True`
Если получилось присвоить первое, даётся оно, если нет - `True`
Если и первое и второе = `Null` или `Undefined`, задастся второе.

### Преобразование Типов

Так, как JS - интерпретированный язык, можно динамически преобразовывать классы.
Из за этого, переменная может получить `NaN`, против этого есть проверка - метод
`isNaN(var)` --> `True` || `False`

**НАЧАТЬ С МАССИВОВ**
