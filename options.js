// Comment to enable console log debugging
console.log = function () { }

// Saves options to chrome.storage
function save_options() {
    // var color = document.getElementById('color').value;
    var is_enabled = document.getElementById('is_enabled').checked;
    var default_branch = document.getElementById('default_branch').value;
    var ignore_list = document.getElementById('ignore_list').value;
    var project_min_depth = document.getElementById('project_min_depth').value;
    var homepage = document.getElementById('homepage').value;
    chrome.storage.sync.set({
        'is_enabled': is_enabled,
        'default_branch': default_branch,
        'ignore_list': ignore_list,
        'project_min_depth': project_min_depth,
        'homepage': homepage
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
            console.log("reset status");
        }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        'is_enabled': true,
        'default_branch': 'master',
        'ignore_list': '',
        'project_min_depth': 3,
        'homepage': 'https://gitlab.com/'
    }, function (items) {
        //   document.getElementById('color').value = items.favoriteColor;
        document.getElementById('is_enabled').checked = items.is_enabled;
        document.getElementById('default_branch').value = items.default_branch;
        document.getElementById('ignore_list').value = items.ignore_list;
        document.getElementById('project_min_depth').value = items.project_min_depth;
        document.getElementById('homepage').value = items.homepage;

        console.log("reloaded");
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('options').onsubmit = function () { return false; };