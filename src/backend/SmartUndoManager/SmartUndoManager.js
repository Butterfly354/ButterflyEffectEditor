export let groupDictionary = {
  // hard-coded to test accordion
  Default: [{ name: 'edit1', groupName: 'Default', timeCreated: new Date() }, { name: 'edit2', groupName: 'Default', timeCreated: new Date() }],
  group1: [{ name: 'edit1', groupName: 'group1', timeCreated: new Date() }],
  group2: []
};

if (localStorage.getItem('groupDict')) {
  groupDictionary = JSON.parse(localStorage.getItem('groupDict'));
}
