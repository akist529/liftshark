<template>
<v-dialog scrollable persistent v-model="dialog" class="WarningModal w-100 h-100" max-width="400px">
	<template v-slot:activator="{ props }">
		<v-btn v-bind="props" append-icon="mdi-logout">
			Log Out
		</v-btn>
	</template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-actions>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text>
			<strong>Are you sure you want to log out?</strong>
		</v-card-text>
		<v-card-actions>
			<StrongButton
				@click="Cookies.remove('token')"
			>YES</StrongButton>
			<GenericButton
				@click="dialog = false"
			>NO</GenericButton>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script scoped lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
import StrongButton from '@/components/buttons/StrongButton.vue';
import GenericButton from '@/components/buttons/GenericButton.vue';
// Third-party libraries
import Cookies from 'js-cookie';

export default defineComponent({
	data () {
		const loginStore = useLoginStore();
		const windowStore = useWindowStore();
		const token = Cookies.get('token');

		return ({
			loginStore,
			windowStore,
			token,
			dialog: false,
			Cookies
		});
	},
	components: {
		CloseButton,
		StrongButton,
		GenericButton
	}
});
</script>
