<script setup>
import TomSelect from 'tom-select';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const query = defineModel();
const visible = ref(false);
const userStore = useUserStore();
const auth_token = userStore.auth;
let items = [];

async function search(q, limit = 200) {
	const { $axios } = useNuxtApp();

	const results = await $axios.get(
		'/api/v2/search/patient',
		{
			params: {
				q,
				env: 'bridgewater'
			}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'auth-token': auth_token
			}
		}
	);

	items = results.data.rows;

	return items;
}

function renderItem(item) {
	const $item = `
		<div class="app-page-search-item">
            <span class="app-page-search-text" title="ORDER TYPE">${item.order_type}</span>
            <span class="app-page-search-text" title="NAME">${item.title}</span>
            <span class="app-page-search-text" title="DOB"><i class="ti ti-candle"></i> ${item.dob}</span>
            <span class="app-page-search-text" title="PHONE"><i class="ti ti-phone"></i> ${item.phone}</span>
            <span class="app-page-search-text" title="WIP"><i class="ti ti-receipt"></i> ${item.status}</span>
		</div>
	`;

	return $item;
}

function getItemById(order_id) {
	return items.find(item => item.order_id === ~~order_id);
}

function initSearch() {
	const $input = document.getElementById('query'),
		tomselect_options = {
			valueField: 'order_id',
			searchField: [],
			create: false,
			options: [],
			maxItems: 1,
			dropdownParent: '.app-search-results',
			placeholder: 'Search...',
			render: {
				//displayed in the selection window
				item: (item, escape) => {
					const $item = renderItem(item);

					return $item;
				},
				//let's render each option
				option: (item, escape) => {
					return renderItem(item);
				},
				loading: () => {
					return '<div class="spinner-border"></div>';
				}
			},
			load: (q, callback) => {
				if (q.length < 1)
					return callback();

				search(q, 50).then(callback);
			},
			onChange: (order_id) => {
				const item = getItemById(order_id);

				if (item)
					navigateTo(`/patientform/${item.lead_id}/search/${item.order_id}/${item.survey_id}`);
			},
			onInitialize: function () {
				this.focus();
			}
		};

	const __tomselect = new TomSelect($input, tomselect_options);
}
</script>
<template>
	<Head>
		<Link href="https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/css/tom-select.css" rel="stylesheet" />
	</Head>
	<Toast />
	<Button label="Search..." severity="secondary" icon="ti ti-search" class="app-search-control" @click="visible = true" />
	<Dialog v-model:visible="visible" :dismissable-mask="true" :show-header="false" close-icon="false" position="top" :close-on-escape="true" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @show="initSearch">
		<template #container>
			<div class="app-search-wrapper">
				<div class="app-search-input">
					<IconField>
						<InputIcon class="ti ti-search" />
						<InputText id="query" v-model="query" size="large" placeholder="Search..." />
					</IconField>
				</div>
				<div class="app-search-results" />
				<div class="app-search-footer">
					<ul class="app-search-commands">
						<li>
							<kbd><svg width="15" height="15" aria-label="Enter key" role="img">
								<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3" /></g></svg></kbd>
							<span>to select</span>
						</li>
						<li>
							<kbd><svg width="15" height="15" aria-label="Arrow down" role="img">
								<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3" /></g></svg></kbd>
							<kbd><svg width="15" height="15" aria-label="Arrow up" role="img">
								<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3" /></g></svg></kbd>
							<span>to navigate</span>
						</li>
						<li>
							<kbd><svg width="15" height="15" aria-label="Escape key" role="img">
								<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956" /></g></svg></kbd>
							<span>to close</span>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</Dialog>
</template>

<style>
#query {
    position: absolute;
    width: 1px;
    overflow: hidden;
    left: -2000px;
}
.app-search-control {
    background-color: var(--tblr-gray-300) !important;

    &:hover {
        background-color: var(--tblr-gray-50-darken) !important;
    }
}

.p-inputicon {
    font-size: 1.3rem;
}

.app-search-results {
    display: flex;
    flex-flow: column;
    padding: 20px 0;

    &:empty {
        &:before {
            content: 'No recent searches';
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--tblr-gray-400);
        }
    }

    .ts-dropdown {
        position: relative;
        border: none;
        box-shadow: none;

        .no-results {
            color: var(--tblr-gray-400);
        }
    }

    .ts-dropdown-content {
        display: table;
        width: 100%;
    }
}

.app-search-wrapper {
    display: flex;
    flex-flow: column;
    padding: 20px 20px 10px;
    gap: 10px;
}

.app-search-commands {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;

    span {
        font-size: 0.7rem;
    }

    kbd {
        font-size: 0.6rem;
        padding: 1px 4px;
    }

    li + li {
        margin-left: 20px;
    }

    kbd + span {
        margin-left: 5px;
    }
}

.app-page-search-item {
    display: table-row;
    cursor: pointer;
    position: relative;

    &:hover {
        background: var(--tblr-gray-200);
    }

    .selectize-dropdown-content & {
        margin: 0 5px;
    }
}

.app-page-search-text {
    display: table-cell;
    padding: 15px 10px;
}
</style>
