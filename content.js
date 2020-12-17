// ^https:\/\/gitlab.com(?:\/(?:(?:[a-zA-z0-9]+))){3}(\/-\/tree\/([a-zA-z0-9]+)){0}$
// https:\/\/gitlab.com(?:\/(?:(?:[a-zA-z0-9]+))){3}(?:\/-\/tree\/([a-zA-z0-9]+))

// Comment to enable console log debugging
// console.log = function () { }

console.log("litlab is running");
chrome.storage.sync.get({
    'is_enabled': true,
    'default_branch': 'master',
    'ignore_list': '',
    'project_min_depth': 3,
    'homepage': 'https://gitlab.com/'
}, function (items) {
    console.log(items);
    let branch = items.default_branch;
    let is_enabled = items.is_enabled;
    let ignore_list = items.ignore_list;
    let project_min_depth = items.project_min_depth;
    let ignore_array = ignore_list.replace(/\s/g, "").replace(/\/,/g, ",").replace(/\/$/g, "").split(",");
    console.log(ignore_array);
    let is_not_ignored = !(ignore_array.indexOf(window.location.href) > -1);
    console.log(is_not_ignored);
    console.log(items.default_branch);
    console.log(items.is_enabled);
    if (is_enabled && is_not_ignored) {
        if (branch !== '') {
            redirectToBranch(branch, project_min_depth);
        }
        redirectHomePage(items.homepage);
    } else { console.log("LitLab is not enabled or the url is in the ignore list"); }
});

function redirectToBranch(branch, project_min_depth) {
    console.log(branch);
    console.log(window.location.href);
    // let project_min_depth = 2;
    let project_max_depth = 3;

    let host_name = "https:\\\/\\\/gitlab.com";
    let project_re = "(?:\\\/(?:(?:[a-zA-z0-9\\\-_]+)))";
    let branch_re = "(?:\\\/-\\\/tree\\\/([a-zA-z0-9\\\-_]+))";
    let branch_name_re = new RegExp(`^${host_name}${project_re}{${project_min_depth},${project_max_depth}}${branch_re}$`);
    let no_branch_str = `^${host_name}${project_re}{${project_min_depth},${project_max_depth}}${branch_re}{0}$`;
    console.log(no_branch_str);
    let no_branch_re = new RegExp(no_branch_str);
    let url = window.location.href;
    let no_branch_selected = no_branch_re.test(url);
    let branch_matches = branch_name_re.exec(url);
    console.log(no_branch_selected);
    console.log(branch_matches);
    if (no_branch_selected) {

        let branch_url = `${window.location.href}/-/tree/${branch}`;

        let referrer = document.referrer;
        console.log(branch_url);
        console.log(referrer);
        if (referrer != branch_url) {
            window.location.href = branch_url;
        } else { console.log("referred"); }
    }
};


function redirectHomePage(homepage) {
    console.log("setting homepage redirect");
    console.log(homepage);
    document.getElementById("logo").href = homepage;
    console.log(document.getElementById("logo").href);
};