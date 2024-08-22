<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { computed, onMounted, onUnmounted, ref } from "vue";

  const drinks = ref([]);
  const isEdit = ref(false);
  const isNew = ref(false);
  const tmp = ref({});

  const handleQty = (id, qty) => {
    const result = drinks.value.findIndex(drink => {
      if (drink.id === id) {
        drink.qty = qty;
      }
    })
    return result;
  }

  const editDrink = (drink) => {

    console.log(drink);
    
    if(drink.id) {
      isEdit.value = true;
      // isNew.value = false;
      tmp.value = {...drink};
    } else {
      isNew.value = true;
      tmp.value = {};
    }
  }

  const confirmEdit = () => {

    const index = drinks.value.findIndex(drink => tmp.value.id === drink.id);

    if(tmp.value.qty > 99) {
      errMsg("不能超過99");
      return;
    }

    if(tmp.value.qty < 0 ) {
      errMsg("不能少於0");
      return;
    }

    if(tmp.value.price < 1) {
      errMsg("價格最少要$1");
      return;
    }

    if(tmp.value.price > 1000) {
      errMsg("提供合理價錢");
      return;
    }

    if (isEdit.value && !isNew.value) {
      drinks.value[index] = tmp.value;
    }

    if (!isEdit.value && isNew.value) {
      drinks.value.push({
        id: new Date().getTime(),
        name: tmp.value.name,
        descrip: tmp.value.descrip,
        price: tmp.value.price,
        qty: tmp.value.qty
      })
    }

    tmp.value = {};
    isEdit.value = false;
    isNew.value = false;
    
  }

  const cancelEdit = () => {
    isEdit.value = false;
    isNew.value = false;
  }

  const delDrink = (id) => {
    const index = drinks.value.findIndex(drink => drink.id === id)
    drinks.value.splice(index, 1);
  }

  const errMsg = (text) => {
    const msg = alert(`${text}`);
    return msg;
  }

  const sum = computed(() => {
    return drinks.value.reduce((pre, item) => Number(pre) + Number(item.price), 0);
  })

  onMounted(() => {
    // AJAX
    setTimeout(() => {
      drinks.value = [
        {
          id: 1,
          name: "珍珠奶茶",
          descrip: "香濃奶茶搭配QQ珍珠",
          price: 50,
          qty: 98
        },
        {
          id: 2,
          name: "冬瓜檸檬",
          descrip: "清新冬瓜配上新鮮檸檬",
          price: 45,
          qty: 18
        },
        {
          id: 3,
          name: "翡翠檸檬",
          descrip: "綠茶與檸檬的完美結合",
          price: 55,
          qty: 34
        },
        {
          id: 4,
          name: "四季春茶",
          descrip: "香醇四季春茶，回甘無比",
          price: 45,
          qty: 10
        },
        {
          id: 5,
          name: "阿薩姆奶茶",
          descrip: "檸檬與冰茶的清新組合",
          price: 45,
          qty: 20
        },
        {
          id: 6,
          name: "檸檬冰茶",
          descrip: "檸檬與冰茶的清新組合",
          price: 45,
          qty: 5
        },
        {
          id: 7,
          name: "芒果綠茶",
          descrip: "芒果與綠茶的獨特風味",
          price: 55,
          qty: 18
        },
        {
          id: 8,
          name: "抹茶拿鐵",
          descrip: "抹茶與鮮奶的絕配",
          price: 60,
          qty: 20
        }
      ];
    }, 1000);
  });

  // let intervalId;

  // 重覆觸發
  // intervalId = setInterval(() => {
  //   console.log(1);
  // }, 1000);

  onUnmounted(() => {
    // clearInterval(intervalId);
  })

</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-2">
    <h2 class="lh-sm mb-0">List of Drinks</h2>
    <button type="button" class="btn btn-primary d-inline-block" @click="editDrink({})">新增</button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="drinks.length === 0">
        <td colspan="4" class="text-center"><div class="my-5">無貨啦! 快D新增</div></td>
      </tr>
      <tr v-for="drink in drinks" :key="drink.id">
        <td class="">{{ drink?.name }}</td>
        <td>{{ drink?.descrip }}</td>
        <td>{{ drink?.price }}</td>
        <td>
          <div class="btn-group me-2">
            <button type="button" class="btn btn-primary" @click="handleQty(drink.id, drink.qty - 1)" :disabled="drink.qty <= 0">-</button>
            <button type="button" class="border-start-0 border-end-0" disabled><span class="d-block text-dark" style="width: 50px;">{{ drink.qty }}</span></button>
            <button type="button" class="btn btn-primary" @click="handleQty(drink.id, drink.qty + 1)" :disabled="drink.qty >= 99">+</button>
          </div>

          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-warning edit" @click="editDrink(drink)">修改</button>
            <button type="button" class="btn btn-danger del" @click="delDrink(drink.id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4">
          <h5>品項總類: {{ sum }}</h5>
          <button type="button" class="btn btn-primary">Button</button>
        </td>
      </tr>
    </tfoot>
  </table>
  <div class="my-3" v-if="isEdit || isNew">
    <h3 class="text-secondary fw-bold">Edit Area - <span>{{ isEdit? "Edit": "Add" }}</span></h3>
    <form class="p-3 rounded-4 border">
      <div class="mb-3">
        <label class="form-label" for="tmpName">品項</label>
        <input class="form-control" type="text" v-model="tmp.name">
      </div>
      <div class="mb-3">
        <label class="form-label" for="tmpName">描述</label>
        <input class="form-control" type="text" v-model="tmp.descrip">
      </div>
      <div class="mb-3">
        <label class="form-label" for="tmpName">價格</label>
        <input class="form-control" type="text" v-model="tmp.price">
      </div>
      <div class="mb-3">
        <label class="form-label" for="tmpName">庫存</label>
        <input class="form-control" type="text" v-model="tmp.qty">
      </div>
      <button class="btn btn-primary me-2" type="button" @click="confirmEdit">確認</button>
      <button class="btn btn-danger" type="button" @click="cancelEdit">取消</button>
    </form>
  </div>
  </div>
</template>

<style scoped></style>
