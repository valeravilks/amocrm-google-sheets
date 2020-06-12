console.log('123');
// define(['jquery'], function ($) {
    var amokit = function () {
        var self = this;
        this.callbacks = {
            render: function () {
                console.log('render');
                $('body').after('<p>ddddd</p>>');
                return true;
            },
            init: function() {
                return true;
            },
            bind_actions: function () {
                console.log('bind_actions');
                return true;
            },
            settings: function (el) {

                async function getDataBySheet(){
                    let data = {}

                    try {
                        data.deals = await getDeals()
                    } catch (e) {
                        data.deals = false
                    }

                    return data
                }

                getDataBySheet().then(rez => {
                    console.log('Делаем запрос на гугл таблицы')
                    fetch('https://script.google.com/macros/s/AKfycbxKqNRJpo-RFuaeFTWh01RHTS1PaRFz9_4mwtxrO3j2v8xtWlsd/exec', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: JSON.stringify(rez)
                    }).then(ok => console.log('Успешный запрос на гугл таблицы')).catch(e => console.log('Ошибка запроса на гугл таблицу'))
                })

                getDeals().then(rez => {
                    console.log(rez)
                })




                async function getDeals(){
                    try {
                        let deals = [];
                        let i = 1;

                        labelWhile:
                        while(true) {
                            debugger
                            let dealJson = await fetch("https://valeravilks.amocrm.com/api/v4/leads?limit=4&page=" + i)
                            if(dealJson.status != 200) break labelWhile
                            let deal = await dealJson.json();
                            deals = deals.concat(deal._embedded.leads)
                            timeout(1000)
                            i++
                        }

                        return deals
                    } catch (e) {
                        console.log(e);
                        throw new Error('Не удалось получить данные о сделке с сервера');

                    }
                }

                function timeout(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                return true;
            },
            onSave: function () {
                alert('click');
                return true;
            },
            destroy: function () {

            },
            contacts: {
                //select contacts in list and clicked on widget name
                selected: function () {
                    console.log('contacts');
                }
            },
            leads: {
                //select leads in list and clicked on widget name
                selected: function () {
                    console.log('leads');
                }
            },
            tasks: {
                //select taks in list and clicked on widget name
                selected: function () {
                    console.log('tasks');
                }
            }
        };
        return this;
    };

    // return amokit;
// });

function accessGoogleScript(){
    
}