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

function nocopy() {

    //<![CDATA[
    var image_save_msg = 'You cant save images!';
    var no_menu_msg = 'Context menu disabled!';
    var smessage = "<b>Cảnh Báo:</b> Nội Dung Được Bảo Vệ !!";

    function disable_hot_keys(e) {
        var key2;

        if (window.event)
            key2 = window.event.keyCode; //IE
        else
            key2 = e.which; //firefox (97)
        if (key2 == 123) //F12 chrome developer key disable
        {
            show_wccp_pro_message('Bạn không được phép in ra hoặc lưu trang này !!');
            return false;
        }

        var elemtype = e.target.tagName;

        elemtype = elemtype.toUpperCase();

        if (elemtype == "TEXT" || elemtype == "TEXTAREA" || elemtype == "INPUT" || elemtype == "PASSWORD" || elemtype == "SELECT") {
            elemtype = 'TEXT';
        }

        if (e.ctrlKey) {
            var key;

            if (window.event)
                key = window.event.keyCode; //IE
            else
                key = e.which; //firefox (97)

            //if (key != 17) alert(key);
            if (elemtype != 'TEXT' && (key == 97 || key == 65 || key == 67 || key == 99 || key == 88 || key == 120 || key == 26 || key == 85 || key == 86 || key == 43)) {
                show_wccp_pro_message('<b>Cảnh Báo:</b> Bạn không được phép copy hoặc xem mã nguồn !!!');
                return false;
            }


            var ctrl_s_option = 'checked';

            if (key == 83 && ctrl_s_option == 'checked') //Ctrl+s 83
            {
                show_wccp_pro_message('Bạn không được phép in ra hoặc lưu trang này !!');
                return false;
            }
            var ctrl_p_option = 'checked';

            if (key == 80 && ctrl_p_option == 'checked') //Ctrl+p 80
            {
                show_wccp_pro_message('Bạn không được phép in ra hoặc lưu trang này !!');
                return false;
            } else
                return true;
        }
    }

    function disable_copy(e) {
        //disable context menu when shift + right click is pressed
        var shiftPressed = 0;
        var evt = e ? e : window.event;
        if (parseInt(navigator.appVersion) > 3) {
            if (document.layers && navigator.appName == "Netscape")
                shiftPressed = (evt.modifiers - 0 > 3);
            else
                shiftPressed = evt.shiftKey;
            if (shiftPressed) {
                if (smessage !== "") show_wccp_pro_message(smessage);
                var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
                if (isFirefox) {
                    alert(smessage);
                }
                return false;
            }
        }

        if (e.which === 2) {
            var clickedTag_a = (e == null) ? event.srcElement.tagName : e.target.tagName;
            show_wccp_pro_message(smessage);
            return false;
        }
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        var elemtype = e.target.nodeName;
        elemtype = elemtype.toUpperCase();
        var checker_IMG = '';
        if (elemtype == "IMG" && checker_IMG == 'checked' && e.detail == 2) {
            show_wccp_pro_message(alertMsg_IMG);
            return false;
        }
        if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "EMBED") {
            if (smessage !== "" && e.detail == 2)
                show_wccp_pro_message(smessage);

            if (isSafari)
                return true;
            else
                return false;
        }
    }

    function disable_copy_ie() {
        var elemtype = window.event.srcElement.nodeName;
        elemtype = elemtype.toUpperCase();
        if (elemtype == "IMG") {
            show_wccp_pro_message(alertMsg_IMG);
            return false;
        }
        if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "OPTION" && elemtype != "EMBED") {
            //if (smessage !== "") show_wccp_pro_message(smessage);
            return false;
        }
    }

    function reEnable() {
        return true;
    }
    document.onkeydown = disable_hot_keys;
    document.onselectstart = disable_copy_ie;
    if (navigator.userAgent.indexOf('MSIE') == -1) {
        document.onmousedown = disable_copy;
        document.onclick = reEnable;
    }

    function disableSelection(target) {
        //For IE This code will work
        if (typeof target.onselectstart != "undefined")
            target.onselectstart = disable_copy_ie;

        //For Firefox This code will work
        else if (typeof target.style.MozUserSelect != "undefined") {
            target.style.MozUserSelect = "none";
        }

        //All other  (ie: Opera) This code will work
        else
            target.onmousedown = function () {
                return false
            }
        target.style.cursor = "default";
    }
    //Calling the JS function directly just after body load
    window.onload = function () {
        disableSelection(document.body);
    };
    //]]>

}

function _log(val) {
    console.log(val);
}