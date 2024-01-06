<template>
  <div class="h-[500px] w-[490px] overflow-auto">
    <div
      class="absolute grid grid-cols-2 gap-4 w-[540px] bg-white bottom-[-10px] h-[40px] shadow ml-[-32px] z-50 pt-[10px]"
    >
      <button
        @click="cancelAllConfigs"
        class="bg-[#D10505] py-2 rounded-lg ml-[30px] text-white"
      >
        Сбросить настройки
      </button>
      <button
        @click="onSave"
        class="bg-[#299B9B] py-2 rounded-lg mr-[30px] text-white"
      >
        Сохранить
      </button>
    </div>

    <div v-for="config in configs" :key="config.Group" class="mb-10">
      <div class="text-[18px] font-[600]">{{ config.Group }}</div>
      <div v-for="item in config.Config" :key="item.Key">
        <div class="flex mt-2" v-if="item.Value === 'checkbox'">
          <div>
            <label>
              <input
                type="checkbox"
                :id="item.Name"
                v-model="inputValues[item.Key].Value"
              />
              <span></span>
            </label>
          </div>
          <label :for="item.Name" class="text-[#013636] fs-14 ml-2">{{
            item.Name
          }}</label>
        </div>

        <div
          v-if="item.Value === 'text' || item.Value === 'integer'"
          class="mt-2 flex flex-col gap-1"
        >
          <div class="flex-row">
            <label :for="item.Name" class="fs-14 fw-4 text-gray-3">
              {{ item.Name }}
            </label>
          </div>
          <div class="flex-row mt-2">
            <d-input
              placeholder="Введите"
              class="w-[400px]"
              type="text"
              :id="item.Name"
              :value="inputValues[item.Key].Value"
              v-model="inputValues[item.Key].Value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

const props = defineProps({
  auditorId: String,
});

// store
const auditorsStore = useAuditorsStore(props.isActive);

// emits
const emit = defineEmits(["closeDialog"]);

// states
const { notify } = useNotification();

const configs = ref();
const auditorConfigById = ref();

// methods
onMounted(async () => {
  if (props.auditorId) {
    auditorConfigById.value = await auditorsStore.getConfigById(
      props.auditorId
    );
  }
  configs.value = await auditorsStore.getAuditorsConfigsAll();
});

const inputValues = computed(() => {
  const values = ref([]);
  configs.value.forEach((config) => {
    config.Config.forEach((item) => {
      if (item.Value === "text" || item.Value === "integer") {
        values.value[item.Key] = {
          Value:
            auditorConfigById.value?.length > 0
              ? getAuditorValueById(item.Key)
              : "",
          Key: item.Key,
          Name: item.Name,
        };
      } else if (item.Value === "checkbox") {
        values.value[item.Key] = {
          Value:
            auditorConfigById.value?.length > 0
              ? getAuditorValueById(item.Key) === "true"
              : false,
          Key: item.Key,
          Name: item.Name,
        };
      }
    });
  });
  return values.value;
});

const onSave = async () => {
  const data = inputValues.value.filter((item) => {
    if (typeof item.Value === "boolean") {
      item.Value = item.Value.toString();
    }
    return item;
  });
  if (props.auditorId) {
    await postConfigToExactAuditor(data);
    emit("closeDialog");
  } else {
    await postConfigToAllAuditors(data);
    emit("closeDialog");
  }
};

const postConfigToAllAuditors = async (postData) => {
  await auditorsStore.postAuditorsConfigsAll(postData);
};

const postConfigToExactAuditor = async (postData) => {
  await auditorsStore.postConfigById(props.auditorId, postData);
  notify({ title: "Конфиги успешно обновлены", type: "success" });
};

const getAuditorValueById = (itemKey) => {
  const [value] = auditorConfigById.value.filter(
    (item) => item.Key === itemKey
  );
  return value.Value;
};

const cancelAllConfigs = () => {
  configs.value.forEach((config) => {
    config.Config.forEach((item) => {
      if (item.Value === "text" || item.Value === "integer") {
        inputValues.value[item.Key].Value = "";
      } else if (item.Value === "checkbox") {
        inputValues.value[item.Key].Value = false;
      } else if (item.Value === "multiselect") {
        onSelectMultiselectItems(item.Key, []);
      }
    });
  });
};
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.shadow {
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.08);
}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
