<template>
  <div class="q-pa-md" style="height: 100%">
    <div class="flex column" style="height: 100%">
      <q-btn v-if="mainStore.apiReadonly" color="red" stack class="q-mb-lg" label="Read only" />
      <q-btn v-else color="green" icon="add" stack class="q-mb-lg" label="New">
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup @click="$refs.createFile.open()">
              <q-item-section>
                <q-item-label>
                  <q-icon name="note_add" size="sm" />
                  新文件
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="$refs.createFolder.open()">
              <q-item-section>
                <q-item-label>
                  <q-icon name="create_new_folder" size="sm" />
                  新文件夹
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="$bus.emit('openFilesUploader')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="upload_file" size="sm" />
                  上传文件
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="$bus.emit('openFoldersUploader')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="folder" size="sm" />
                  上传文件夹
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn class="q-mb-sm" @click="gotoFiles" color="blue" icon="folder_copy" label="文件" stack />
      <q-btn v-if="mainStore.config && mainStore.config.emailRouting !== false" class="q-mb-sm" @click="gotoEmail" color="blue" icon="email" label="邮件" stack />

      <q-btn class="q-mb-sm q-mt-auto q-mb-0" @click="infoPopup=true" color="secondary" icon="question_mark"
             label="信息"
             stack />
    </div>
  </div>

  <q-dialog v-model="infoPopup" persistent no-route-dismiss>
    <q-card>
      <q-card-section>
        <div class="text-h6">🎉 感谢您使用 R2-Explorer! 🚀</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        你正在运行版本 <b>{{ mainStore.version }}</b><br>
        <template v-if="updateAvailable">
          最新版本是 <b>{{latestVersion}}</b>，了解如何<a href="https://r2explorer.com/getting-started/updating-your-project/" target="_blank">升级你的实例</a>。<br>
        </template>
        <br>
        <template v-if="mainStore.auth">
          <b>认证</b><br>
          方法： {{ mainStore.auth.type }}<br>
          用户名： {{ mainStore.auth.username }}
        </template>
        <template v-else>
          未认证
        </template>
        <br><br>
        <b>服务配置</b><br>
        {{ JSON.stringify(mainStore.config, null, 2) }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="好的" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <create-folder ref="createFolder" />
  <create-file ref="createFile" />
</template>

<script>
import CreateFile from "components/files/CreateFile.vue";
import CreateFolder from "components/files/CreateFolder.vue";
import { useMainStore } from "stores/main-store";
import { defineComponent } from "vue";

export default defineComponent({
	name: "LeftSidebar",
	data: () => ({
		infoPopup: false,
		updateAvailable: false,
		latestVersion: "",
	}),
	components: { CreateFolder, CreateFile },
	methods: {
		gotoEmail: function () {
			if (this.selectedApp !== "email") this.changeApp("email");
		},
		gotoFiles: function () {
			if (this.selectedApp !== "files") this.changeApp("files");
		},
		changeApp: function (app) {
			this.$router.push({
				name: `${app}-home`,
				params: { bucket: this.selectedBucket },
			});
		},
		isUpdateAvailable: (currentVersion, latestVersion) => {
			// Split versions into parts and convert to numbers
			const current = currentVersion.split(".").map(Number);
			const latest = latestVersion.split(".").map(Number);

			// Compare major version
			if (latest[0] > current[0]) return true;
			if (latest[0] < current[0]) return false;

			// Compare minor version
			if (latest[1] > current[1]) return true;
			if (latest[1] < current[1]) return false;

			// Compare patch version
			if (latest[2] > current[2]) return true;

			return false;
		},
	},
	computed: {
		selectedBucket: function () {
			return this.$route.params.bucket;
		},
		selectedApp: function () {
			return this.$route.name.split("-")[0];
		},
	},
	async mounted() {
		const resp = await fetch(
			"https://api.github.com/repos/G4brym/R2-Explorer/releases/latest",
		);
		if (!resp.ok) {
			console.log("无法获取r2-explorer 最新更新 ：(");
			console.log(
				"从这里手动获取： https://github.com/G4brym/R2-Explorer/releases",
			);
		} else {
			const parsed = await resp.json();
			const latestVersion = parsed.tag_name.replace("v", "");
			if (this.isUpdateAvailable(this.mainStore.version, latestVersion)) {
				this.latestVersion = latestVersion;
				this.updateAvailable = true;
			}
		}
	},
	setup() {
		const mainStore = useMainStore();

		return {
			mainStore,
		};
	},
});
</script>

<style scoped>
.q-btn {
  max-width: 100%;
  padding: 4px;
}
</style>
