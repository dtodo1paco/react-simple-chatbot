export function is_link(text) {
    if (!/^(f|ht)tps?:\/\//i.test(text)) {
        return false;
    }
    return true;
}
export function add_http(url) {
    if (!is_link()) {
        url = "http://" + url;
    }
    return url;
}