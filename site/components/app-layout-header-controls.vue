<script setup>
const userStore = useUserStore();
const { full_name, user_group } = storeToRefs(userStore);
const usermenu = ref();
const query = ref('');

function isAdmin() {
	return /^admin$/i.test(user_group.value);
}

function logout() {
	userStore.logout();
	navigateTo('/login');
}

const toggle = (event) => {
	usermenu.value.toggle(event);
};
</script>
<template>
	<div class="btn-list">
		<AppSearch v-model="query" />

		<a href="#" class="nav-link d-flex lh-1 text-reset p-0" aria-label="Open user menu" @click="toggle">
			<span class="avatar">
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
					<path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
					<path d="M15 19l2 2l4 -4" />
				</svg>
			</span>
			<div class="d-none d-xl-block ps-2">
				<div>{{ full_name }}</div>
				<div class="mt-1 small text-secondary">{{ user_group }}</div>
			</div>
		</a>
		<Popover ref="usermenu" class="app-header-popover">
			<div class="app-popover-items">
				<nuxt-link v-if="isAdmin()" to="/contacts" class="app-popover-item">
					<i class="ti ti-user" />
					<span>Manage Contacts</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/pipelines" class="app-popover-item">
					<i class="ti ti-baseline-density-small" />
					<span>Manage Pipelines</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/emailtemplates" class="app-popover-item">
					<i class="ti ti-mail" />
					<span>Manage Email Templates</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/smstemplates" class="app-popover-item">
					<i class="ti ti-message-dots" />
					<span>Manage SMS Templates</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/notestemplates" class="app-popover-item">
					<i class="ti ti-notes" />
					<span>Manage Notes Templates</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/leadvendor" class="app-popover-item">
					<i class="ti ti-users-group" />
					<span>Manage Lead Vendors</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/npi" class="app-popover-item">
					<i class="ti ti-checklist" />
					<span>Npi Blacklist</span>
				</nuxt-link>
				<nuxt-link to="/recordings" class="app-popover-item">
					<i class="ti ti-device-audio-tape" />
					<span>Recordings Lookup</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/users" class="app-popover-item">
					<i class="ti ti-user-star" />
					<span>User Manager</span>
				</nuxt-link>
				<nuxt-link v-if="isAdmin()" to="/settings" class="app-popover-item">
					<i class="ti ti-settings" />
					<span>Settings</span>
				</nuxt-link>
				<nuxt-link class="app-popover-item" to="/invoices">
					<i class="ti ti-file-dollar" />
					<span>Invoices</span>
				</nuxt-link>
				<div class="app-popover-item-divider" />
				<a href="#" class="app-popover-item" @click="logout">
					<i class="ti ti-logout-2" />
					<span>Logout</span>
				</a>
			</div>
		</Popover>
	</div>
</template>

<style lang="less">
.app-profile-dropdown-menu {
    position: fixed;
}

.app-popover-items {
    display: flex;
    flex-flow: column;
}

.app-popover-item {
    padding: 10px;
    color: var(--tblr-dark);
    border-radius: 4px;

    &:hover {
        background: #eee;
        text-decoration: none;
    }

    .ti {
        margin-right: 5px;
    }
}
.app-header-control {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #fff;

        svg {
            color: #000;
        }
    }
}
.app-header-popover {
    &:before {
        left: unset !important;
        right: 10px !important;
    }
    &:after {
        left: unset !important;
        right: 12px !important;
    }
}
.app-popover-item-divider {
    width: 100%;
    height: 1px;
    background: #eee;
}
</style>
