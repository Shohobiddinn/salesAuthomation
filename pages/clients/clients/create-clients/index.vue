<template>
  <div class="h-[100vh]">
    <button
      @click="$router.go(-1)"
      class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
      </div>
    </button>

    <form @submit.prevent="save">
      <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
        {{ route.query.id ? "Редактирование" : "Создание" }} клиента
      </div>
      <div class="mt-4 p-4 bg-white rounded-lg">
        <div class="grid grid-cols-3 gap-4">
          <div class="text-[20px] font-[600]">Территория</div>
          <div>
            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-12 fw-4 mt-3">
                  Территория <span class="text-red-3 fs-14">*</span>
                </div>
              </div>
              <menu-btn class="h-11 w-full">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropdown('territory')"
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    {{
                      data.territory_id
                        ? getSelectedName(data.territory_id, "territory")
                        : "Выбрать"
                    }}
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto">
                    <FilterItems
                      :data="territories"
                      :singleSelect="true"
                      :selectedItems="data.territory_id"
                      @onSingleItemSelect="data.territory_id = $event"
                      @onLoadElse="onLoadElseTerritories"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>
            <div class="relative">
              <div class="fs-12 my-2">Ориентир</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите ориентир"
                  class="w-full"
                  :value="data.navigate"
                  @change="(v) => (data.navigate = v)"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div>
            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-12 fw-4 mt-3">
                  Категория <span class="text-red-3 fs-14">*</span>
                </div>
              </div>
              <menu-btn class="h-11 w-full">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropdown('clientCategories')"
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    {{
                      data.client_category_id
                        ? getSelectedName(
                            data.client_category_id,
                            "clientCategories"
                          )
                        : "Выбрать"
                    }}
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto">
                    <FilterItems
                      :data="clientCategory"
                      :singleSelect="true"
                      :selectedItems="data.client_category_id"
                      @onSingleItemSelect="data.client_category_id = $event"
                      @onLoadElse="onLoadElseClientCategories"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>
            <div class="relative">
              <div class="fs-12 my-2">Адрес</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  :value="data.address"
                  @change="(v) => (data.address = v)"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex mt-4">
          <div class="w-[34%]">
            <div class="text-[20px] font-[600]">Показать на карте</div>
          </div>
          <div class="w-[66%] flex justify-center items-center h-[300px]">
            <div class="grid w-full gap-2 h-full">
              <GMapMap
                :center="markerPosition"
                :zoom="7"
                map-type-id="terrain"
                style=""
                @click="onMapClicked"
                :options="{
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  disableDefaultUi: false,
                }"
              >
                <GMapMarker
                  key="mainMarker"
                  :position="markerPosition"
                  :draggable="true"
                  :clickable="true"
                />
              </GMapMap>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-[20px] font-[600]">Даннные</div>
          <div>
            <div class="relative">
              <div class="fs-12 my-2">
                Название <span class="text-red-3 fs-14">*</span>
              </div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите название"
                  class="w-full"
                  :value="data.name"
                  @change="(v) => (data.name = v)"
                  type="text"
                  required
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2">Телефон</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите телефон"
                  class="w-full"
                  :value="data.phone"
                  @change="(v) => (data.phone = v)"
                  type="tel"
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2">ИНН</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите ннн"
                  class="w-full"
                  :value="data.inn"
                  @change="(v) => (data.inn = v)"
                  type="number"
                  :requiredLength="9"
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2">Код</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите код"
                  class="w-full"
                  :value="data.code"
                  @change="(v) => (data.code = v)"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <div class="fs-12 my-2">Название фирмы</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите название"
                  class="w-full"
                  :value="data.company_name"
                  @change="(v) => (data.company_name = v)"
                  type="text"
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2">Контактное лицо</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите название"
                  class="w-full"
                  :value="data.contact"
                  @change="(v) => (data.contact = v)"
                  type="text"
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2 mt-2">ПИНФЛ</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите пнфл"
                  class="w-full"
                  :value="data.jshshir"
                  @change="(v) => (data.jshshir = v)"
                  type="number"
                  :requiredLength="14"
                />
              </div>
            </div>
            <div>
              <div class="fs-12 my-2 mt-2">Номер договора</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите номер договора"
                  class="w-full"
                  :value="data.number_of_contract"
                  @change="(v) => (data.number_of_contract = v)"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 p-4 bg-white rounded-lg">
        <div>
          <div
            v-for="(item, index) in data.deposit_limits"
            :key="item"
            class="grid grid-cols-3 gap-4 items-center"
          >
            <div></div>
            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-12 fw-4 mt-3">
                  Валюта
                  <span v-if="index === 0" class="text-red-3 fs-14">*</span>
                </div>
              </div>
              <menu-btn class="h-11 w-full">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropdown('currencies')"
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    {{
                      item.currency_id
                        ? getSelectedName(item.currency_id, "currencies")
                        : "Выбрать"
                    }}
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto">
                    <FilterItems
                      :data="currencies"
                      :singleSelect="true"
                      :selectedItems="item.currency_id"
                      @onSingleItemSelect="item.currency_id = $event"
                      @onLoadElse="onLoadElseCurrencies"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>

            <div>
              <div class="fs-12 my-2 mt-2">Допустимый долг</div>
              <div class="flex">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  :value="item.allowed_minimum_balance"
                  @change="formatDepositLimit(item, $event)"
                  :type="'number'"
                />
                <button
                  v-if="index !== 0"
                  @click="removeDeposit(index)"
                  class="m-3"
                >
                  <IconTrash :size="'22'" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <div
            @click="addDepositLimit"
            class="fs-14 cursor-pointer border border-[#299B9B] rounded-lg px-6 p-2 hover:bg-gray-100 active:bg-gray-50"
          >
            Добавить еще
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="flex gap-16">
            <div class="text-[20px] font-[600]">О фирме</div>
            <div class="flex ml-3 mt-1">
              <label>
                <input v-model="data.is_active" type="checkbox" />
                <span></span>
              </label>
              <div class="ml-1 fs-16 leading-[22px]">Активный</div>
            </div>
          </div>

          <div>
            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-12 fw-4 mt-3">
                  Продаваемые категории
                </div>
              </div>
              <menu-btn class="h-11 w-full">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropdown('productCategories')"
                    class="border-grey flex items-center w-full justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <fa-icon hash="&#xf078" />
                      <div>
                        {{
                          data.product_categories?.length
                            ? "Выбрано"
                            : "Выбрать"
                        }}
                      </div>
                    </div>
                    <div v-if="productCategory?.total_count" class="ml-1">
                      {{ data.product_categories?.length }} из
                      {{ productCategory?.total_count }}
                    </div>
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto">
                    <FilterItems
                      :data="productCategory"
                      :selectedItems="data.product_categories"
                      @onSelectItems="data.product_categories = $event"
                      @onLoadElse="onLoadElseProductCategories"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>

            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-12 fw-4 mt-3">Канал сбыта</div>
              </div>
              <menu-btn class="h-11 w-full">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropdown('salesChannel')"
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    {{
                      data.sales_channel_id
                        ? getSelectedName(data.sales_channel_id, "salesChannel")
                        : "Выбрать"
                    }}
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto">
                    <FilterItems
                      :data="salesChanel"
                      :singleSelect="true"
                      :selectedItems="data.sales_channel_id"
                      @onSingleItemSelect="data.sales_channel_id = $event"
                      @onLoadElse="onLoadElseSalesChannel"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>
          </div>
          <div>
            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-12 fw-4 mt-3">Тип</div>
              </div>
              <menu-btn class="h-11 w-full">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropdown('clientTypes')"
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    {{
                      data.client_type_id
                        ? getSelectedName(data.client_type_id, "clientTypes")
                        : "Выбрать"
                    }}
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto">
                    <FilterItems
                      :data="clientTypes"
                      :singleSelect="true"
                      :selectedItems="data.client_type_id"
                      @onSingleItemSelect="data.client_type_id = $event"
                      @onLoadElse="onLoadElseClientTypes"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>

            <div
              v-for="employee in employeeExpeditors"
              :key="employee.employee_id"
              class="block"
            >
              <flex-col class="gap-2">
                <div class="flex-row">
                  <div class="text-gray-3 fs-12 fw-4 mt-3">Экспедитор</div>
                </div>
                <menu-btn class="h-11 w-full">
                  <template #btn>
                    <m-btn-outlined
                      @click="onOpenDropdown('expeditors')"
                      class="border-grey flex items-center w-full gap-2"
                    >
                      <fa-icon hash="&#xf078" />
                      {{
                        employee.employee_id
                          ? getSelectedName(employee.employee_id, "expeditors")
                          : "Выбрать"
                      }}
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <div class="overflow-auto">
                      <FilterItems
                        :data="expeditors"
                        :singleSelect="true"
                        :selectedItems="employee.employee_id"
                        @onSingleItemSelect="employee.employee_id = $event"
                        @onLoadElse="onLoadElseExpeditors"
                      />
                    </div>
                  </template>
                </menu-btn>
              </flex-col>
            </div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="flex w-[34%]">
            <div class="text-[20px] font-[600]">Агент</div>
          </div>
          <div class="w-[66%]">
            <div
              v-for="(employee, index) in employeeAgents"
              :key="employee.employee_id"
              class="block"
            >
              <div class="flex gap-4 w-full items-center">
                <flex-col class="gap-4 w-14/15">
                  <div class="flex-row">
                    <div class="text-gray-3 fs-12 fw-4 mt-3">
                      Агент {{ index + 1 }}
                    </div>
                  </div>
                  <menu-btn class="h-11 w-full">
                    <template #btn>
                      <m-btn-outlined
                        @click="onOpenDropdown('agents')"
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />
                        {{
                          employee.employee_id
                            ? getSelectedName(employee.employee_id, "agents")
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto">
                        <FilterItems
                          :data="agents"
                          :singleSelect="true"
                          :selectedItems="employee.employee_id"
                          @onSingleItemSelect="employee.employee_id = $event"
                          @onLoadElse="onLoadElseAgents"
                        />
                      </div>
                    </template>
                  </menu-btn>
                </flex-col>
                <button
                  v-if="index !== 0"
                  @click="removeEmployee(employee.employee_id, 'agents')"
                  class="w-1/15 m-3 pt-8 flex justify-end"
                >
                  <IconTrash :size="'22'" />
                </button>
              </div>
              <div class="flex mt-3">
                <div class="fs-14 mt-[2px]">Дни посещений</div>
                <div v-if="employee.visit_days" class="flex">
                  <div
                    v-for="j in week"
                    :key="j"
                    @click="selectDay(j.key, employee.visit_days)"
                    class="flex ml-3 mt-1 cursor-pointer"
                  >
                    <label>
                      <input
                        :checked="employee.visit_days.includes(j.key)"
                        type="checkbox"
                      />
                      <span></span>
                    </label>
                    <label class="ml-1 fs-14 text-[#013636]">{{
                      j.name
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="w-full border mt-2"></div>
            </div>
            <div class="mt-4 flex justify-end">
              <div
                v-if="employeeAgents.length < 3"
                @click="addMoreEmployee('agents')"
                class="fs-14 cursor-pointer border border-[#299B9B] rounded-lg px-6 p-2 hover:bg-gray-100 active:bg-gray-50"
              >
                Добавить еще
              </div>
            </div>
            <div
              v-for="(employee, index) in employeeAuditors"
              :key="employee.employee_id"
              class="block"
            >
              <div class="flex gap-4 w-full items-center">
                <flex-col class="gap-2 w-14/15">
                  <div class="flex-row">
                    <div class="text-gray-3 fs-12 fw-4 mt-3">
                      Аудитор {{ index + 1 }}
                    </div>
                  </div>

                  <menu-btn class="h-11 w-full">
                    <template #btn>
                      <m-btn-outlined
                        @click="onOpenDropdown('auditors')"
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />
                        {{
                          employee.employee_id
                            ? getSelectedName(employee.employee_id, "auditors")
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto">
                        <FilterItems
                          :data="auditors"
                          :singleSelect="true"
                          :selectedItems="employee.employee_id"
                          @onSingleItemSelect="employee.employee_id = $event"
                          @onLoadElse="onLoadElseAuditors"
                        />
                      </div>
                    </template>
                  </menu-btn>
                </flex-col>

                <button
                  v-if="index !== 0"
                  @click="removeEmployee(employee.employee_id, 'auditors')"
                  class="w-1/15 m-3 pt-10 flex justify-end"
                >
                  <IconTrash :size="'22'" />
                </button>
              </div>
              <div class="flex mt-3">
                <div class="fs-14 mt-[2px]">Дни посещений</div>
                <div v-if="employee.visit_days" class="flex">
                  <div
                    v-for="j in week"
                    :key="j"
                    @click="selectDay(j.key, employee.visit_days)"
                    class="flex ml-3 mt-1 cursor-pointer"
                  >
                    <label>
                      <input
                        :checked="employee.visit_days.includes(j.key)"
                        type="checkbox"
                      />
                      <span></span>
                    </label>
                    <label class="ml-1 fs-14 text-[#013636]">{{
                      j.name
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="w-full border mt-2"></div>
            </div>
            <div class="mt-4 flex justify-end">
              <div
                v-if="employeeAuditors.length < 3"
                @click="addMoreEmployee('auditors')"
                class="fs-14 cursor-pointer border border-[#299B9B] rounded-lg px-6 p-2 hover:bg-gray-100 active:bg-gray-50"
              >
                Добавить еще
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-3">
          <div class="flex">
            <div class="text-[20px] font-[600]">Банковские данные</div>
          </div>
          <div>
            <div class="relative">
              <div class="fs-12 my-2">P/C</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  type="text"
                  :value="data.account"
                  @change="(v) => (data.account = v)"
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2">МФО</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  type="text"
                  :value="data.mfo"
                  @change="(v) => (data.mfo = v)"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <div class="fs-12 my-2">Банк</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  type="text"
                  :value="data.bank"
                  @change="(v) => (data.bank = v)"
                />
              </div>
            </div>
            <div class="relative">
              <div class="fs-12 my-2">ОКЭД</div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  type="text"
                  :value="data.oked"
                  @change="(v) => (data.oked = v)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="w-[34%]"></div>
          <div class="w-[66%]">
            <div class="fs-14">Регистрационный код плательщика НДС</div>
            <div class="flex-row mt-2">
              <d-input
                placeholder="Введите"
                class="w-full"
                type="text"
                :value="data.code_nds"
                @change="(v) => (data.code_nds = v)"
              />
            </div>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="w-[34%] mt-2 text-[24px] font-[600] text-[#424F4F]">
            Комментарии
          </div>
          <div class="w-[66%]">
            <div class="flex-row mt-2">
              <textarea
                class="w-full h-[100px] p-2 border rounded-lg"
                v-model="data.description"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end my-3">
        <button
          type="submit"
          class="text-white bg-[#299B9B] rounded-lg px-10 py-2"
        >
          {{ route.query.id ? "Сохранить" : "Создать" }}
        </button>
      </div>
    </form>
    <div>
      <transition name="modal">
        <div v-if="agentsModal">
          <h-no-modal :dataContainerWidth="'480px'" @closeDialog="closeDialog">
            <ClientsCreateClient
              @closeDialog="closeDialog"
              :isSaved="!!route.query.id"
            />
          </h-no-modal>
        </div>
      </transition>
    </div>
    <loading-modal v-if="isLoading">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { ClientsModel, EmployeesClients } from "~/interfaces/api/clients-model";
import { TerritoryModel } from "~~/interfaces/api/territory-model";
import { AgentModel } from "~~/interfaces/api/agent-model";
import { ClientCategoryModel } from "~~/interfaces/api/client-category-model";
import { ClientTypeModel } from "~~/interfaces/api/client-type-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";
import { SallesChannelsModel } from "~~/interfaces/api/salles-channels-model";
import { ExpeditorModel } from "~~/interfaces/api/expeditor-model";
import { AppResponse } from "~~/interfaces/api/app-response";
import { AuditorModel } from "~~/interfaces/api/auditor-model";
import { CurrencyModel } from "~~/interfaces/api/currency-model";
import { EmployeesModel } from "~~/interfaces/api/tasks-models";

// store
const clientStore = useClientsStore("true");

// states
const route = useRoute();
const router = useRouter();
const markerPosition = ref({ lat: 41.311081, lng: 69.240562 });
const agentsModal = ref(false);
const isLoading = ref(false);

const week = ref([
  {
    key: "Monday",
    name: "Пн",
  },
  {
    key: "Tuesday",
    name: "Вт",
  },
  {
    key: "Wednesday",
    name: "Ср",
  },
  {
    key: "Thursday",
    name: "Чт",
  },
  {
    key: "Friday",
    name: "Пн",
  },
  {
    key: "Saturday",
    name: "Сб",
  },
  {
    key: "Sunday",
    name: "Вс",
  },
]);

const data: Ref<ClientsModel> = ref({
  name: "",
  product_categories: [],
  deposit_limits: [
    {
      currency_id: "",
      allowed_minimum_balance: 0,
    },
  ],
  employee_clients: [],
  lat_lng: {},
});

const employeeAgents: Ref<EmployeesModel> = ref([
  {
    employee_id: "",
    visit_days: [],
  },
]);

const employeeExpeditors: Ref<EmployeesModel> = ref([
  {
    employee_id: "",
    visit_days: [],
  },
]);

const employeeAuditors: Ref<EmployeesModel> = ref([
  {
    employee_id: "",
    visit_days: [],
  },
]);

const territories: Ref<AppResponse<TerritoryModel> | undefined> = ref();

const territoriesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});
const clientCategory: Ref<AppResponse<ClientCategoryModel> | undefined> = ref();

const clientCategoryParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const agents: Ref<AppResponse<AgentModel> | undefined> = ref();

const agentsParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});
const clientTypes: Ref<AppResponse<ClientTypeModel> | undefined> = ref();

const clientTypesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const productCategory: Ref<AppResponse<ProductCategoryModel> | undefined> =
  ref();

const productCategoryParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const salesChanel: Ref<AppResponse<SallesChannelsModel> | undefined> = ref();

const salesChanelParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const currencies: Ref<AppResponse<CurrencyModel> | undefined> = ref();

const currenciesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const expeditors: Ref<AppResponse<ExpeditorModel> | undefined> = ref();

const expeditorsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

const auditors: Ref<AppResponse<AuditorModel> | undefined> = ref();

const auditorsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

// Methods
onMounted(async () => {
  if (!!route.query.id) {
    isLoading.value = true;
    await getTerritories();
    await getClientCategories();
    await getCurrencies();
    await getProductCategories();
    await getClientTypes();
    await getExpeditors();
    await getAgents();
    await getAuditors();
    await getSalesChannel();
    await clientStore.getWithId(route.query.id);

    data.value = clientStore.clients;

    filterEmployeesByRole(clientStore.clients?.employee_clients);

    markerPosition.value.lat = clientStore.clients?.lat_lng?.latitude;
    markerPosition.value.lng = clientStore.clients?.lat_lng?.longitude;
    isLoading.value = false;
  }
});

function addDepositLimit() {
  data.value.deposit_limits.push({
    currency_id: "",
    allowed_minimum_balance: 0,
  });
}

function removeEmployee(id: string, role: string) {
  if (role === "agents") {
    const index = employeeAgents.value.findIndex((i) => i.employee_id === id);
    employeeAgents.value.splice(index, 1);
    return;
  }
  if (role === "auditors") {
    const index = employeeAuditors.value.findIndex((i) => i.employee_id === id);
    employeeAuditors.value.splice(index, 1);
    return;
  }
  if (role === "expeditors") {
    const index = employeeExpeditors.value.findIndex(
      (i) => i.employee_id === id
    );
    employeeExpeditors.value.splice(index, 1);
    return;
  }
}

function removeDeposit(index: any) {
  data.value.deposit_limits.splice(index, 1);
}

const formatDepositLimit = (item: any, value: any) => {
  item.allowed_minimum_balance = value;
  if (item.allowed_minimum_balance > 0) {
    item.allowed_minimum_balance = -item.allowed_minimum_balance;
  }
};

const onOpenDropdown = async (state: string) => {
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "territory" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "clientCategories" && !clientCategory.value) {
    await getClientCategories();
    return;
  }
  if (state === "clientTypes" && !clientTypes.value) {
    await getClientTypes();
    return;
  }
  if (state === "productCategories" && !productCategory.value) {
    await getProductCategories();
    return;
  }
  if (state === "salesChannel" && !salesChanel.value) {
    await getSalesChannel();
    return;
  }
  if (state === "currencies" && !currencies.value) {
    await getCurrencies();
    return;
  }
  if (state === "expeditors" && !expeditors.value) {
    await getExpeditors();
    return;
  }
  if (state === "auditors" && !auditors.value) {
    await getAuditors();
    return;
  }
  return;
};

const getSelectedName = (selectedId: any, state: string) => {
  if (state === "territory" && territories.value) {
    return territories.value.items?.find(
      (territory) => territory.id === selectedId
    )?.name;
  }
  if (state === "expeditors" && expeditors.value) {
    const employee = expeditors.value.items?.find(
      (expeditor) => expeditor.id === selectedId
    );
    return employee?.first_name || employee?.last_name || employee?.middle_name;
  }
  if (state === "agents" && agents.value) {
    const employee = agents.value.items?.find(
      (agent) => agent.id === selectedId
    );
    return employee?.first_name || employee?.last_name || employee?.middle_name;
  }
  if (state === "auditors" && auditors.value) {
    const employee = auditors.value.items?.find(
      (auditor) => auditor.id === selectedId
    );
    return employee?.first_name || employee?.last_name || employee?.middle_name;
  }
  if (state === "clientCategories" && clientCategory.value) {
    return clientCategory.value.items?.find(
      (client) => client.id === selectedId
    )?.name;
  }
  if (state === "clientTypes" && clientTypes.value) {
    return clientTypes.value.items?.find((client) => client.id === selectedId)
      ?.name;
  }
  if (state === "productCategories" && productCategory.value) {
    return productCategory.value.items?.find(
      (product) => product.id === selectedId
    )?.name;
  }
  if (state === "salesChannel" && salesChanel.value) {
    return salesChanel.value.items?.find((sales) => sales.id === selectedId)
      ?.name;
  }
  if (state === "currencies" && currencies.value) {
    return currencies.value.items?.find(
      (currency) => currency.id === selectedId
    )?.name;
  } else return;
};

function selectDay(key: string, days: any) {
  const isExist = days.find((day: string) => day === key);
  if (!!isExist) {
    days = days.filter((day: string) => day !== key);
  } else {
    days.push(key);
  }
}

const addMoreEmployee = (role: string) => {
  if (role === "agents" && employeeAgents.value.length < 3) {
    employeeAgents.value.push({
      employee_id: "",
      visit_days: [],
    });
    return;
  }
  if (role === "auditors" && employeeAuditors.value.length < 3) {
    employeeAuditors.value.push({
      employee_id: "",
      visit_days: [],
    });
    return;
  }
  if (role === "expeditors") {
    employeeExpeditors.value.push({
      employee_id: "",
      visit_days: [],
    });
    return;
  }
};

const filterEmployeesByRole = (clientEmplyees: EmployeesModel[]) => {
  employeeExpeditors.value = clientEmplyees?.filter(
    (employee: EmployeesModel) => employee.role === 6
  );
  employeeAgents.value = clientEmplyees?.filter(
    (employee: EmployeesModel) => employee.role === 1
  );
  employeeAuditors.value = clientEmplyees?.filter(
    (employee: EmployeesModel) => employee.role === 7
  );
};

const getAgents = async () => {
  agents.value = await clientStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  territories.value = await clientStore.getTerritories(territoriesParams.value);
};

const onLoadElseTerritories = async () => {
  territoriesParams.value.page_size += 10;
  await getTerritories();
};

const getClientCategories = async () => {
  clientCategory.value = await clientStore.getClientCategories(
    clientCategoryParams.value
  );
};

const onLoadElseClientCategories = async () => {
  clientCategoryParams.value.page_size += 10;
  await getClientCategories();
};

const getClientTypes = async () => {
  clientTypes.value = await clientStore.getClientTypes(clientTypesParams.value);
};

const onLoadElseClientTypes = async () => {
  clientTypesParams.value.page_size += 10;
  await getClientTypes();
};

const getProductCategories = async () => {
  productCategory.value = await clientStore.getProductCategories(
    productCategoryParams.value
  );
};

const onLoadElseProductCategories = async () => {
  productCategoryParams.value.page_size += 10;
  await getProductCategories();
};

const getSalesChannel = async () => {
  salesChanel.value = await clientStore.getSalesChannels(
    salesChanelParams.value
  );
};

const onLoadElseSalesChannel = async () => {
  salesChanelParams.value.page_size += 10;
  await getProductCategories();
};

const getCurrencies = async () => {
  currencies.value = await clientStore.getCurrencies(currenciesParams.value);
};

const onLoadElseCurrencies = async () => {
  currenciesParams.value.page_size += 10;
  await getCurrencies();
};

const getExpeditors = async () => {
  expeditors.value = await clientStore.getExpeditors(expeditorsParams.value);
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const getAuditors = async () => {
  auditors.value = await clientStore.getAuditors(auditorsParams.value);
};

const onLoadElseAuditors = async () => {
  auditorsParams.value.page_size += 10;
  await getAuditors();
};

const onMapClicked = (event: any) => {
  markerPosition.value = event.latLng.toJSON();
  data.value.lat_lng.latitude = markerPosition.value.lat;
  data.value.lat_lng.longitude = markerPosition.value.lng;
};

function closeDialog() {
  agentsModal.value = false;
  router.push("/clients/clients");
}

const save = async () => {
  if (!data.value.territory_id) {
    notify({ title: "Выберите территорию!", type: "error" });
    return;
  }
  if (!data.value.client_category_id) {
    notify({ title: "Выберите категорию!", type: "error" });
    return;
  }
  if (!data.value.name) {
    notify({ title: "Введите название!", type: "error" });
    return;
  }
  if (!data.value.deposit_limits[0].currency_id) {
    notify({ title: "Выберите валюту и допустимый долг!", type: "error" });
    return;
  }
  try {
    data.value.employee_clients = [
      ...employeeAgents.value,
      ...employeeAuditors.value,
      ...employeeExpeditors.value,
    ];
    data.value.inn = data.value.inn?.toString()
    data.value.jshshir = data.value.jshshir?.toString()
    data.value.employee_clients = data.value.employee_clients.filter(
      (i) => i.employee_id !== ""
    );
    notify({ title: "Пожалуйста подождите!" });
    await clientStore.add(data.value);
    agentsModal.value = false;
    notify({ title: "Сохранено!" });
    agentsModal.value = true;
  } catch (error) {
    console.log(error);
    notify({title: "Ошибка в сохранении", type: "error"})
  }
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
</style>
