<template>
	<div v-if="showNotice" class="eol-notice">
		Discord.js'nin 11. sürümü için artık destek sağlamıyoruz, hata düzeltmeleri yapmıyoruz veya yeni özellikler sunmuyoruz. Lütfen
		<router-link to="/additional-info/changes-in-v12.html">
			botunuzu sürüm 12'ye güncelleyin
		</router-link>
		uygun olan en erken zamanda.
		<br />
		Değişikliklerin ortaya çıkmasına neden olan uyuşmazlıklar nedeniyle 11 sürümünün 2021 başlarında tamamen sona ermesini bekliyoruz.  <a href="#" @click.prevent="dismiss">[1 haftalığına işten çıkar]</a>
	</div>
</template>

<script>
import semver from 'semver';
import eventBus from '../eventBus.js';
import branches from '../mixins/branches.js';

export default {
	mixins: [branches],
	data() {
		return {
			hideUntil: null,
		};
	},
	computed: {
		showNotice() {
			return semver.satisfies(semver.coerce('11.x'), this.selectedBranch) && (!this.hideUntil || Date.now() > parseInt(this.hideUntil));
		},
	},
	mounted() {
		eventBus.$on('branch-update', this.updateBranch);
		this.hideUntil = localStorage.getItem('eol-notice-expiration');
	},
	destroyed() {
		eventBus.$off('branch-update', this.updateBranch);
	},
	methods: {
		dismiss() {
			const expirationTimestamp = Date.now() + (7 * 60 * 60 * 24 * 1000);
			this.hideUntil = expirationTimestamp;
			localStorage.setItem('eol-notice-expiration', expirationTimestamp);
		},
	},
};
</script>

<style lang="stylus">
.eol-notice {
	background-color: #fff;
	position: fixed;
	right: 1rem;
	bottom: 1rem;
	left: 21rem;
	padding: 1em;
	border: 1px solid #3eaf7c;
	border-radius: 4px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
	text-align: center;
	z-index: 100;

	@media (max-width: 959px) {
		left: 17.4rem;
	}

	@media (max-width: 719px) {
		left: 1rem;
	}
}

.yuu-theme-dark .eol-notice {
	background-color: #1a1a1a;
}

.yuu-theme-blue .eol-notice {
	border-color: #2196f3;
}

.yuu-theme-red .eol-notice {
	border-color: #de3636;
}

.yuu-theme-purple .eol-notice {
	border-color: #a846eb;
}
</style>
