/*\
|*| Template
\*/
document.addEventListener('DOMContentLoaded',function()
{
    controller.transmitter();
});

const controller =
    {
        transmitter: function () {
            this.template();
        },
        template: function()
        {

            let selector = document.querySelector('.events-description__pentagon');
            // let posScrollTop = selector.style.getPropertyValue('--top-pos');

            const isSnapSupported = getCSSCustomProp('--top-pos', selector, 'text');
            console.log( isSnapSupported);

            window.addEventListener('scroll',function (event) {
                // var stateScroll = this.pageYOffset;
                // console.log(stateScroll, stateScroll/-100);
                // let posEl = posScrollTop + (stateScroll/-25);
                // selector.style.setProperty('--top-pos', `${posEl}px`);

                //
                // $('.t-t-200').css('transform','translateY('+ st/-140 +'% )');
                // $('.t-t-200').css('transition','all 1s ease');
                //
                // $('.t-t-201').css('transform','translateY('+ st/-160 +'% )');
                // $('.t-t-201').css('transition','all .5s cubic-bezier(0, 0.06, 0.67, 1.24)');
            });


            /**
             * Передаем элемент и его пользовательские свойства, значение которого нам необходимо.
             * Мы можем определить, какой тип данных получим в итоге.
             *
             * @param {String} propKey
             * @param {HTMLELement} element=document.documentElement
             * @param {String} castAs='string'
             * @returns {*}
             */


            function getCSSCustomProp (propKey, element = document.documentElement, castAs = 'string')
            {
                let response = getComputedStyle(element).getPropertyValue(propKey);

                // Если нужно, приводим в порядок строку
                if (response.length) {
                    response = response.replace(/"/g, '').trim();
                }

                // Преобразуем возвращаемые данные в любой желаемый тип
                switch (castAs) {
                    case 'number':
                    case 'int':
                        return parseInt(response, 10);
                    case 'float':
                        return parseFloat(response, 10);
                    case 'boolean':
                    case 'bool':
                        return response === 'true' || response === '1';
                }

                // Возвращаем результат
                return response;
            };

        },

    }