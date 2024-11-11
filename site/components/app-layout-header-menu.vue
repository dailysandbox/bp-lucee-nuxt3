<script setup>
const userStore = useUserStore();
const wips = userStore.options.wip;
const navigation = reactive([]);
const menu = ref();

const pipelineLinks = computed(() => {
	let links = navigation[0].children;

	//lets cleanup the links to remove dup text
	links = links.map((link) => {
		if (!link?.children)
			return link;

		let parentTitle = link.title;

		link.children.forEach((sublink) => {
			sublink.label = sublink.title.replace(parentTitle, '').trim();
			sublink.url = `/leads/${sublink.state}`;

			return sublink;
		});

		link.label = link.title;
		link.items = link.children;

		return link;
	});

	return links;
});

const menuLinks = ref([
	{
		label: 'Dashboard',
		icon: 'ti ti-home',
		url: '/dashboard'
	},
	{
		label: 'Patient Search',
		icon: 'ti ti-user-search',
		url: '/patientsearch'
	},
	{
		label: 'Product Inventory',
		icon: 'ti ti-clipboard-list',
		url: '/products'
	},
	{
		label: 'Emails/SMS',
		icon: 'ti ti-user-email',
		url: '/emails'
	},
	{
		label: 'Pipelines',
		icon: 'ti ti-timeline-event',
		items: pipelineLinks
	}
]);

function renderPipelines() {
	for (let i = 0; i < wips.length; i++) {
		let tag = wips[i].value;
		let tag2 = tag.replace('.', '_').replace('.', '_').replace('.', '_').replace('.', '_');
		let tag3 = wips[i].label.replace('.', ' ').replace('.', ' ').replace('.', ' ').replace('.', ' ');

		let item = {
			title: tag3,
			state: tag2,
			data: wips[i].data,
			weight: wips[i].weight ? wips[i].weight : i
		};

		wips[i].tag2 = tag2;

		saveItem('/leads.' + wips[i].label, item, i);
	}

	console.log(navigation);
}

function saveItem(path, item, weight) {
	let parts = path.split('.'),
		id = parts[parts.length - 1],
		parent = _findOrCreateParent(parts, weight),
		updateItem = false;

	for (let i = 0; i < parent.length; i++) {
		if (parent[i]._id === id) {
			updateItem = parent[i];

			break;
		}
	}

	// Update
	if (updateItem) {
		_.extend(updateItem, item);

		// Add proper ui-sref
		updateItem.uisref = _getUiSref(updateItem);
	}
	// Create
	else {
		// Create an empty children array in the item
		item.children = [];

		// Add the default weight if not provided or if it's not a number
		if (!item?.weight || typeof item?.weight !== 'number')
			item.weight = 1;

		item._id = id;
		item._path = path;

		// Add proper ui-sref
		//item.uisref = _getUiSref(item);

		parent.push(item);
	}
}

function _findOrCreateParent(parts, weight) {
	let parent = navigation;

	// If it's going to be a root item
	// return the navigation itself
	if (parts.length === 1)
		return parent;

	// Remove the last element from the parts as
	// we don't need that to figure out the parent
	parts.pop();

	// Find and return the parent
	for (let i = 0; i < parts.length; i++) {
		let _id = parts[i],
			createParent = true;

		for (let p = 0; p < parent.length; p++) {
			if (parent[p]._id === _id) {
				parent = parent[p].children;
				createParent = false;

				break;
			}
		}

		if (createParent) {
			let item = {
				_id: _id,
				_path: parts.join('.'),
				title: _id,
				weight: weight,
				children: []
			};

			parent.push(item);
			parent = item.children;
		}
	}

	return parent;
}

function _getUiSref(item) {
	let uisref = '';

	if (item?.state)
		uisref = item.state;

	return uisref;
}

const toggle = (event) => {
	menu.value.toggle(event);
};

renderPipelines();
</script>

<template>
	<Menubar :model="menuLinks" />
</template>

<style lang="less" scoped>
.p-menubar {
    border: none;
}
.p-menubar /deep/ .p-menubar-item-link {
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
}
</style>
