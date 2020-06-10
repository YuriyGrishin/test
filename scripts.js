var isAndroid = function () {
    return navigator.userAgent.match('Android');
};

function checkParams() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var r = searchUrlParams('r');
    if (r != null) {
        document.getElementById('input_url').value = r;
    }
    var w = searchUrlParams('w');
    if (w != null) {
        document.getElementById('input_browser_url').value = w;
    }
    var p = searchUrlParams('p');
    if (p != null) {
        document.getElementById('input_produt').value = p;
    }

    var isCmsContentPreview = searchUrlParams('isCmsContentPreview');
    if (isCmsContentPreview != null) {
        document.getElementById('input_cms_content_preview').value = isCmsContentPreview;
    }
    var cmsDsParamValue = searchUrlParams('cmsDsParamValue');
    if (cmsDsParamValue != null) {
        document.getElementById('input_cms_ds_param').value = cmsDsParamValue;
    }
    var rearrFactor = searchUrlParams('rearrFactor');
    if (rearrFactor != null) {
        document.getElementById('input_rearr_factors').value = rearrFactor;
    }

    var hasRedirect = getRedirectLink() != null;
    console.log('hasRedirect=' + hasRedirect);
    if (hasRedirect) {
        if (isAndroid()) {
            console.log('isAndroid()=' + isAndroid());
            document.getElementById('dialog_with_reference_open_link').hidden = false;
        } else {
            goToLink();
        }
    }
}

function searchUrlParams(value) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(value);
}

function getRedirectLink() {
    var w = searchUrlParams('w');
    var w_go = 'true' === searchUrlParams('w_go');
    if (w != null && w_go) {
        return 'beru://browser?hybrid-mode=1&url=' + encodeURIComponent(w);
    }
    var p = searchUrlParams('p');
    var p_go = 'true' === searchUrlParams('p_go');
    if (p != null && p_go) {
        return 'beru://product/' + encodeURIComponent(p);
    }
    var isCmsContentPreview = searchUrlParams('isCmsContentPreview');
    var cmsDsParamValue = searchUrlParams('cmsDsParamValue');
    var rearrFactor = searchUrlParams('rearrFactor');
    var d_go = 'true' === searchUrlParams('d_go');
    if (d_go) {
        var result = 'beru://debug?';
        if (isCmsContentPreview != null && isCmsContentPreview === 'true' || isCmsContentPreview === 'false') {
            result += '&isCmsContentPreview=' + isCmsContentPreview;
        }
        if (cmsDsParamValue != null) {
            result += '&cmsDsParamValue=' + cmsDsParamValue;
        }
        if (rearrFactor != null) {
            result += '&rearrFactor=' + rearrFactor;
        }
        return result;
    }
    return null;
}

function goToLink() {
    var link = getRedirectLink();
    if (link != null) {
        parent.location = link;
    }
}

function elementValueAsParam(paramName, elementId) {
    if (paramName === null || paramName === '') {
        return '';
    }
    var element = document.getElementById(elementId);
    if (element === null) {
        return '';
    }
    var elementValue = element.value;
    if (elementValue === null || elementValue === '') {
        return '';
    }
    return '&' + paramName + '=' + encodeURIComponent(elementValue);
}

function getAllPageParamsForDeeplink() {
    return getAllPageParams(true);
}

function getAllPageParamsForHost() {
    return getAllPageParams(false);
}

function getAllPageParams(isDeeplink) {
    var prefix = '';
    if (isDeeplink) {
        prefix = 'beru://debug?';
    } else {
        prefix = window.location.origin + window.location.pathname + '?';
    }
    var result = elementValueAsParam('isCmsContentPreview', 'input_cms_content_preview') +
        elementValueAsParam('cmsDsParamValue', 'input_cms_ds_param&') +
        elementValueAsParam('rearrFactor', 'input_rearr_factors');
    if (result.startsWith('&')) {
        return prefix + result.substring(1);
    } else {
        return prefix + result;
    }
}