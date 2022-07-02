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
            this.turnEffect();
        },

        animation: function(selector,nameCssVar,units)
        {
            let posScrollTopCss = getCSSCustomProp(nameCssVar, selector, 'int');

            window.addEventListener('scroll',function (event)
            {
                var stateScroll = this.pageYOffset;
                let posEl = posScrollTopCss + (stateScroll/25);
                selector.style.setProperty( nameCssVar, `${posEl}${units}` );
            });

            function getCSSCustomProp (propKey, element = document.documentElement, castAs = 'string')
            {
                let response = getComputedStyle(element).getPropertyValue(propKey);

                if (response.length) {
                    response = response.replace(/"/g, '').trim();
                }
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
                return response;
            }
        },
        turnEffect: function ()
        {
            let selectorPentagon = document.querySelector('.events-description__pentagon');
            this.animation(selectorPentagon, '--top-pos','px');

            let selectorTriangle = document.querySelectorAll('.events__triangle');
            this.animation( selectorTriangle[0], '--rotate-state', 'deg' );
            this.animation( selectorTriangle[1], '--rotate-state', 'deg' );
            this.animation( selectorTriangle[1], '--pos-left', 'px' );

        },
    }