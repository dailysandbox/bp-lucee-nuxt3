<script setup>
import { useUserStore } from '@/stores/user';
import { navigateTo } from 'nuxt/app';

const userStore = useUserStore();
const username = ref(null);
const password = ref(null);
const isRememberMe = ref(false);
const isError = ref(false);
const isShowErrorMsg = ref(false);

const login = async () => {
	const usr = username.value;
	const pwd = password.value;

	try {
		await userStore.login(usr, pwd);
		navigateTo(`/dashboard`);
	} catch (error) {
		isError.value = true;
		isShowErrorMsg.value = true;

		setTimeout(() => {
			isError.value = false;
		}, 1000);

		setTimeout(() => {isShowErrorMsg.value = false;}, 5000);
	}
};
</script>

<template>
	<div class="app-login-wrapper">
		<div class="app-login" :class="{ shake: isError }">
			<h4>Genesis - Sales Process & Performance Pipeline</h4>
			<h1 class="lg:text-5xl text-3xl text-center font-extrabold">
				Log in with your current agent account
			</h1>
			<span class="error-msg" :class="{ 'd-none': !isShowErrorMsg }">Your login information appears to be invalid. Please try again.</span>
			<form class="app-login-form" :class="{ 'show-pass': isShowPassword }" @submit.prevent="login">
				<div class="form-row">
					<label for="username">Username</label>
					<InputText id="username" v-model="username" aria-describedby="username-help" />
					<small id="username-help">Username field is required</small>
				</div>
				<div class="form-row">
					<label for="password">Password</label>
					<Password v-model="password" aria-describedby="password-help" toggle-mask :feedback="false" />
					<small id="username-help">Password field is required</small>
				</div>
				<div class="form-row">
					<div>
						<Checkbox v-model="isRememberMe" input-id="isRememberMe" binary />
						<label for="isRememberMe">Remember Me</label>
					</div>
				</div>
				<div class="form-row">
					<Button label="Log In" icon="ti ti-key" @click="login" />
				</div>
			</form>
			<div class="logo" layout="row" flex="100" layout-align="center center">
				<!--				<img src="/images/legacy/bridgewater-sm.png">-->
			</div>
		</div>
	</div>
	<Toast />
</template>

<style lang="less">
.error-msg {
    color: var(--tblr-red);
    background: var(--tblr-red-lt);
    padding: 10px;
    margin: 0 0 10px;
}
.app-login-wrapper {
    position: relative;
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    background: url('/images/login/12.jpg') no-repeat;
    background-size: cover;
}
.app-login {
    position: relative;
    margin: auto auto;
    width: 370px;
    background: var(--tblr-white);
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
}
.app-login-form {
    display: flex;
    flex-flow: column;

    small {
        color: var(--tblr-gray-500);
    }
}

.logo {
    margin-top: 10px;
}

.p-checkbox + label {
    margin-left: 10px;
}

.p-password-toggle-mask-icon {
    cursor: pointer;
}

h1,
h4 {
    text-align: center;
}
</style>
