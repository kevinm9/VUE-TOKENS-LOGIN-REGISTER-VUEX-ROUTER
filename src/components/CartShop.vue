<template>
  <div>
    <v-overlay v-model="loading" class="align-center justify-center">
      <v-progress-circular
        :size="50"
        color="secondary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <v-container>

      <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12" >
          <v-form ref="form" lazy-validation>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="producto in cartitems" :key="producto.id">
                <td>
                  <v-list-item
                  key="1"
                  @click="verproducto(producto.id)"
                >
                  <v-list-item-avatar>
                    <v-img src="https://loving-leavitt-9cb65b.netlify.app/static/img/slider4.0e80ba7.jpg"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ producto.nombre }}</v-list-item-title>
                    <v-list-item-subtitle>{{ producto.Descripcion }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item></td>
                <td>${{ (producto.precio * 1).toFixed(2) }}</td>
                <td>
                  <v-text-field
                    :min="1"
                    :max="producto.stock"
                    class="pt-10"
                    label="Outlined"
                    style="width: 80px;"
                    single-line
                    outlined
                    @input="actualizarcantidad(producto)"
                    v-model.number="producto.cantidad"
                    type="number"
                    :rules="cantidadRules"
                  ></v-text-field>
                </td>
                <td>${{ (calcularSubtotalporProducto(producto)).toFixed(2) }}</td>
                <td><v-btn @click="eliminarproducto(producto)" icon><v-icon>mdi-delete</v-icon></v-btn></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-form>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">Shipping and additional costs are calculated based on values you have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Order Subtotal</td>
                <td class="text-right" style="width: 50px;">
                  ${{ calcularSubtotal().toFixed(2)  }}
                </td>
              </tr>
              <tr>
                <td>Envio</td>
                <td class="text-right" style="width: 50px;">${{envio}}</td>
              </tr>
              <tr>
                <td>IVA 12%</td>
                <td class="text-right" style="width: 50px;">${{ (calcularSubtotal()*impuesto).toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>
                  ${{ calcularTotal().toFixed(2) }}
                </b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" :disabled=" cartItemCount <= 0 " @click="guardar()" outlined>Pagar por todo</v-btn>
          </div>
          <div class="text-center">
            <v-btn  to="/shop" class="success  white--text mt-5" outlined>Seguir comprando</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-card  class="accent" >
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import FacturasDataService from '@/services/FacturasDataService';
export default {
  data() {
    return {
      envio: 10.00,
      impuesto: 0.12,
      formerrors: [],
      loading : false,
      factura: {}
    };
  },
  mounted() {
  },
  computed: {
    userlogin() {
      return this.$store.getters['auth/user'];
    },
    cartitems() {
      return this.$store.getters['cart/cartItems']
    },
    cartItemCount() {
      return this.$store.getters['cart/cartItemCount'];
    },
    cantidadRules() {
      return [
        v => !!v || 'Cantidad requerida',
        v => !isNaN(Number(v)) || 'Debe ser un número',
        v => Number(v) > 0 || 'Debe ser mayor a 0',
        v => /^[1-9]\d*$/.test(v) || 'Debe ser un número entero mayor a 0'
      ];
    }
  },
  methods: {
    eliminarproducto(product) {
      this.$store.commit('cart/removeFromCart', product);
    },
    verproducto(idproducto) {
      this.$router.push({ name: 'product', params: { id: idproducto } });
    },
    actualizarcantidad(producto) {
      this.$store.commit('cart/updateCart', producto);
    },
    calcularSubtotalporProducto(producto) {
      return producto.precio * producto.cantidad;
    },
    calcularSubtotal() {
      return parseFloat(this.cartitems.reduce((total, producto) => total + producto.precio * producto.cantidad, 0));
    },
    calcularTotal() {
      let subtotal = this.calcularSubtotal();
      return subtotal + this.envio + (subtotal * this.impuesto);
    },
    guardar() {
      if (!this.$refs.form.validate()) {
        this.$toast.error("digite bien la cantidad de productos que desea", {timeout: 1000});
        return
      }
      this.formerrors = [];
      this.loading = true;
      this.factura = {
        cliente_id: this.userlogin.id,
        formasdepago_id: 1,
        productos: this.cartitems,
      }
      FacturasDataService.create(this.factura)
        .then((response) => {
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#a5dc86',
            iconColor: 'white',
            color: 'white',
            timerProgressBar: true,
            timer: 3000,
            icon: 'success',
            text: 'Guardado!',
          });
          this.exito();
        },
          error => {
            this.formerrors = (error.response && error.response.data.message) || error.message;
            this.$toast.error(this.formerrors, {timeout: 1000});
            this.loading = false;
          }
        )
        .catch((e) => {
          this.loading = false;
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#f27474',
            iconColor: 'white',
            color: 'white',
            timerProgressBar: true,
            timer: 3000,
            icon: 'error',
            text: 'Error!',
          });
          console.log(e.data);
        });
    },
    exito() {
      this.loading = false;
      this.$store.commit('cart/removeAllItemsFromCart');
    },
  }
}
</script>