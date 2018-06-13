$(document).ready(function () {
    var currentID = null;
    $('[tabs-role]').find('[tab-action]').click((e) => {
        e.preventDefault();
        let id = e.currentTarget.hash.split('#')[1];
        var isTarget = $('#' + id);
        var op = 0;
        if (isTarget && id !== currentID) {
            var tabContent = $('[tabs-content] #' + id);
            console.log(tabContent)
            $('[tab-action]').removeClass('active show');
            $('[tabs-content]').find(`.active.show`).removeClass('active show');
            $(tabContent).addClass('active');
            $(isTarget).addClass('active')
            setTimeout(() => {
                $(isTarget).addClass('show')
                var opSet = setInterval(() => {
                    if (op <= 1) {
                        $(tabContent).attr('style', 'opacity:' + op);
                        op = op + 0.3;
                    } else {
                        $(tabContent).removeAttr('style');
                        clearInterval(opSet);
                        $(tabContent).addClass('show');
                    }
                }, 50);
            }, 400)
            currentID = id;
        }
    });
})

function product_filter() {
    let _search = $('[gh-filter]').val().toUpperCase();
    let _iTarget = $('[gh-filter]').attr('gh-filter');
    let items_arr = $(_iTarget).find('[gh-item]')
    for (let i = 0; i < items_arr.length; i++) {
        let _txt = $(items_arr[i]).text().toUpperCase().indexOf(_search);
        if (_txt > -1) {
            $(items_arr[i]).parent().parent().removeClass('d-none').addClass('d-block')
        } else {
            $(items_arr[i]).parent().parent().removeClass('d-block').addClass('d-none')
        }
    }
}

function _log(val) {
    console.log(val);
}