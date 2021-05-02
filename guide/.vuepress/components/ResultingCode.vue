<template>
	<p>
		Kodunuzu şimdiye kadar oluşturduğumuz kodla karşılaştırmak isterseniz, 
		<a :href="githubLink" target="_blank" rel="noopener noreferrer">
			buradan <outbound-link />
		</a> GitHub deposunda inceleyebilirsiniz..
	</p>
</template>

<script>
export default {
	name: 'ResultingCode',
	props: {
		path: String,
	},
	data() {
		return {
			githubLink: 'https://github.com/discordjs/guide/tree/master/code-samples/',
		};
	},
	mounted() {
		this.githubLink += this.path || this.$page.path.slice(1).replace('.html', '');
	},
};
</script>
