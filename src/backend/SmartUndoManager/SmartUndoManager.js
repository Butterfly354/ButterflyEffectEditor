export let groupDictionary = {
  Default: []
};

if (localStorage.getItem('groupDict')) {
  groupDictionary = JSON.parse(localStorage.getItem('groupDict'));
}
