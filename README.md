## Торговый терминал (клиент) для симулятора биржи

Биржа это такой "сервис" куда можно отправить заявку (ордер) на покупку или продажу какого либо актива. Получив заявку биржа, применяя некую торговую логику, ищет встречную заявку для заключения сделки. 
Заявка в итоге может быть:
 * в работе (Active),
 * исполнена (Filled), 
 * отклонена (Rejected),
 * отменена создателем (Cancelled).

При выставлении заявки можно ориентироваться на текущие цены данного актива (котировки), для более вероятного исполнения заявки.

Торговый терминал (клиент) состоит из тикера и списка заявок.

Тикер - это такой виджет, на котором:
  * есть возможность выбрать торговый инструмент (актив)
  * есть возможность выбрать объем заявки
  * отображаются текущие цены на покупку и продажу выбранного инструмента в заданном объеме
  * есть возможность отправить заявку на покупку или продажу

Список заявок - это таблица в которой содержится информация по всем заявкам, а именно:
  * идентификатор
	* время создания
	* время последнего изменения статуса
	* статус - Active Filled Rejected Cancelled
	* сторона - Buy Sell
	* цена
	* объем
	* торговый инструмент

Клиентская часть приложения написана на языке TypeScript с использованием библиотеки React.

Развитие проекта:
  * разработать webSocet для взаимодействия с сервером
  * реализовать сортировку таблицы заявок
  * реализовать получение нотификаций об изменениях статуса заявок

## Запуск проекта

[http://omaykova.github.io/webdevelopertestwork](http://omaykova.github.io/webdevelopertestwork)

ИЛИ

'npm i' - для установки NPM

'npm start' - запустите приложение в "режиме разработки". Открыть http://localhost:3000 для просмотра в браузере
