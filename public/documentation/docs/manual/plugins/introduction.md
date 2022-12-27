# Плагины

**ВНИМАНИЕ:** Данный функционал находится на этапе beta-тестирования. С высокой веротяностью он будет модифицироваться.
Мы будем стараться сохранять совместимость при его развитии, но следует учитывать эту информацию 
при принятии решения об его использовании. 

## Введение

Плагины - специально оформленные программные модули на JavaScript, с использованием фреймворка [VUEJS 2](https://ru.vuejs.org/v2/guide/index.html),
расширяющие функциональные возможности DocHub.

С их помощью можно создать:

1. Новый [тип документа](/docs/dochub.docs) - реализовано (beta);
2. [Источник данных](/docs/dochub.datasets) - запланировано.

## Создание простого плагина

В этом примере показано, как создать плагин, который расширит набор встроенных типов документов новым - "html".

Создайте каталог, в котором вы будете разрабатывать свой код в специальной области проекта DocHub - ./plugins.
Например, каталог с именем "html". В этом каталоге создайте следующие файлы:

* **components/HTMLDocument.vue** - VUE компонент, который будет визуализировать документ
* **package.json** - Файл-манифест плагина.
* **index.js** - Точка входа плагина.

### package.json

Это стандартный файл, используемый модулями Node.js для описания их содержимого.

Чтобы сгенерировать стандартный файл package.json, вы можете использовать команду:

```
npm init
```

При запуске этой команды вам будет задан ряд вопросов, чтобы помочь создать начальный контент для проекта. 
Многие вопросы имеют ответы по умолчанию. Используйте их там, где это возможно. 

При появлении запроса дать имя проекту, введите - "dochub-plugin-html".

Пример сформированного файла:
```
{
  "name": "dochub-plugin-html",
  "version": "1.0.0",
  "description": "HTML document",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "R.Piontik",
  "license": "MIT"
}
```